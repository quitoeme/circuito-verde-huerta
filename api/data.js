/* API de sincronización del diseño — Redis (Upstash / Vercel KV), un registro por usuario.
   Exige token de Google válido (login obligatorio) si está GOOGLE_CLIENT_ID.
   Variables de entorno necesarias en Vercel:
     - GOOGLE_CLIENT_ID  (el mismo Client ID web de la app)
     - KV_REST_API_URL / KV_REST_API_TOKEN  ó  UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
       (los inyecta el store de Redis al conectarlo; aceptamos cualquiera de los dos nombres) */
import { Redis } from "@upstash/redis";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";

export const config = { api: { bodyParser: { sizeLimit: "4mb" } } };

function getRedis() {
  if (!REDIS_URL || !REDIS_TOKEN) return null;
  return new Redis({ url: REDIS_URL, token: REDIS_TOKEN });
}

async function verifyGoogle(req) {
  if (!CLIENT_ID) return { ok: false, reason: "server-no-client-id" };
  const authz = req.headers.authorization || "";
  const token = authz.startsWith("Bearer ") ? authz.slice(7) : "";
  if (!token) return { ok: false };
  try {
    const r = await fetch("https://oauth2.googleapis.com/tokeninfo?id_token=" + encodeURIComponent(token));
    if (!r.ok) return { ok: false };
    const info = await r.json();
    if (info.aud !== CLIENT_ID) return { ok: false };
    if (info.exp && Number(info.exp) * 1000 < Date.now()) return { ok: false };
    if (info.email_verified === "false") return { ok: false };
    if (!info.email) return { ok: false };
    return { ok: true, email: info.email };
  } catch {
    return { ok: false };
  }
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  const auth = await verifyGoogle(req);
  if (!auth.ok) {
    const msg = auth.reason === "server-no-client-id"
      ? "El servidor no tiene configurada GOOGLE_CLIENT_ID."
      : "Necesitás iniciar sesión con Google.";
    return res.status(401).json({ error: msg });
  }

  const redis = getRedis();
  if (!redis) {
    return res.status(503).json({ error: "Falta conectar el store de Redis (KV) al proyecto." });
  }

  const key = "cv:design:" + auth.email;
  try {
    if (req.method === "GET") {
      const doc = await redis.get(key);
      return res.status(200).json(doc || null);
    }
    if (req.method === "PUT" || req.method === "POST") {
      const doc = req.body;
      if (!doc || typeof doc !== "object" || !Array.isArray(doc.plants)) {
        return res.status(400).json({ error: "Formato inválido: se espera { plants: [...] }" });
      }
      const savedAt = new Date().toISOString();
      await redis.set(key, { ...doc, savedAt });
      return res.status(200).json({ ok: true, savedAt });
    }
    res.setHeader("Allow", "GET, PUT, POST");
    return res.status(405).json({ error: "Método no permitido" });
  } catch (err) {
    return res.status(500).json({ error: String((err && err.message) || err) });
  }
}
