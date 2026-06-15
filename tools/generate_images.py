#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Genera una ilustracion estilo lapiz de color para cada planta de plants.js
usando la API de imagenes de Gemini ("Nano Banana"), las comprime y las guarda
en img/<id>.png.  Reanudable: omite las que ya existen.

Uso (PowerShell):
  $env:GEMINI_API_KEY="..."; python tools/generate_images.py
"""
import os, re, sys, json, time, base64, urllib.request, urllib.error, io
from PIL import Image

KEY = os.environ.get("GEMINI_API_KEY")
if not KEY:
    print("ERROR: falta GEMINI_API_KEY en el entorno"); sys.exit(1)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_DIR = os.path.join(ROOT, "img")
os.makedirs(IMG_DIR, exist_ok=True)
MODEL = "gemini-2.5-flash-image"
URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={KEY}"
SIZE = 256  # px lado maximo de salida

CAT_HINT = {
    "Hortaliza de hoja": "the full leafy plant / head of edible leaves",
    "Hortaliza de fruto": "the plant showing its edible fruit",
    "Hortaliza de raiz": "showing the colorful edible root below and green leafy tops above",
    "Hortaliza de raíz": "showing the colorful edible root below and green leafy tops above",
    "Hortaliza de bulbo": "the bulb with its green shoots",
    "Legumbre": "the plant with its pods",
    "Aromatica/Medicinal": "a fresh sprig with its leaves (and small flowers if it blooms)",
    "Aromática/Medicinal": "a fresh sprig with its leaves (and small flowers if it blooms)",
    "Flor": "the plant in full bloom with its characteristic flowers",
    "Frutal menor": "the plant with its ripe fruit",
    "Abono verde/Cobertura": "the whole plant",
}

def parse_plants():
    txt = open(os.path.join(ROOT, "plants.js"), encoding="utf-8").read()
    plants = []
    for line in txt.splitlines():
        if 'id:"' not in line:
            continue
        def g(field):
            m = re.search(field + r':"([^"]*)"', line)
            return m.group(1) if m else ""
        pid = g("id")
        if not pid:
            continue
        plants.append({
            "id": pid, "nombre": g("nombre"), "cientifico": g("cientifico"),
            "categoria": g("categoria"), "color": g("color"),
        })
    return plants

def build_prompt(p):
    hint = CAT_HINT.get(p["categoria"], "the whole plant, its most recognizable part")
    nm = re.sub(r"\s*\(.*?\)", "", p["nombre"]).strip()  # quita parentesis
    return (
        f"A botanical illustration of {nm} ({p['cientifico']}), {hint}. "
        "Drawn in a colored-pencil style with bright saturated vivid colors and visible pencil strokes, "
        "clean simple hand-drawn look, single specimen centered, accurate botanical shapes and colors, "
        "isolated on a pure flat white background, no pot, no soil line, no text, no labels, no border, no shadow."
    )

def gen(prompt):
    body = json.dumps({
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"responseModalities": ["IMAGE"]},
    }).encode("utf-8")
    req = urllib.request.Request(URL, data=body, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=120) as r:
        d = json.loads(r.read().decode("utf-8"))
    for part in d["candidates"][0]["content"]["parts"]:
        if "inlineData" in part:
            return base64.b64decode(part["inlineData"]["data"])
    raise RuntimeError("sin imagen en la respuesta")

def compress(raw, path):
    im = Image.open(io.BytesIO(raw)).convert("RGBA")
    bg = Image.new("RGBA", im.size, (255, 255, 255, 255))
    bg.paste(im, (0, 0), im)
    im = bg.convert("RGB")
    im.thumbnail((SIZE, SIZE), Image.LANCZOS)
    im.save(path, "PNG", optimize=True)

def main():
    plants = parse_plants()
    print(f"{len(plants)} plantas en plants.js")
    done = skip = fail = 0
    for i, p in enumerate(plants, 1):
        path = os.path.join(IMG_DIR, p["id"] + ".png")
        if os.path.exists(path) and os.path.getsize(path) > 0:
            skip += 1; print(f"[{i}/{len(plants)}] skip {p['id']}"); continue
        prompt = build_prompt(p)
        for attempt in range(1, 4):
            try:
                raw = gen(prompt)
                compress(raw, path)
                done += 1
                print(f"[{i}/{len(plants)}] OK   {p['id']:14} {os.path.getsize(path)//1024} KB")
                break
            except urllib.error.HTTPError as e:
                msg = e.read().decode("utf-8", "ignore")[:160]
                print(f"[{i}/{len(plants)}] HTTP {e.code} {p['id']} intento {attempt}: {msg}")
                time.sleep(5 * attempt)
            except Exception as e:
                print(f"[{i}/{len(plants)}] ERR {p['id']} intento {attempt}: {str(e)[:120]}")
                time.sleep(4 * attempt)
        else:
            fail += 1
        time.sleep(1.2)  # ritmo amable con la API
    print(f"\nLISTO. generadas={done} omitidas={skip} fallidas={fail}")

if __name__ == "__main__":
    main()
