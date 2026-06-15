/* ============================================================
   Circuito Verde · lógica de la app
   ============================================================ */
"use strict";

/* ---------- utilidades de color ---------- */
function shade(hex, amt){            // amt<0 oscurece, >0 aclara
  let c = hex.replace("#","");
  if(c.length===3) c = c.split("").map(x=>x+x).join("");
  let r=parseInt(c.slice(0,2),16), g=parseInt(c.slice(2,4),16), b=parseInt(c.slice(4,6),16);
  const f = v => Math.max(0,Math.min(255, Math.round(v + amt*255)));
  return "#"+[f(r),f(g),f(b)].map(v=>v.toString(16).padStart(2,"0")).join("");
}
const LEAF = "#3f8a3f", LEAF_D = "#2c5a2c", STEM = "#5a7d3a";

/* ============================================================
   DIBUJOS — estilo "lápiz de colores", trazo a mano, saturados
   Cada función devuelve el interior de un <svg viewBox 0 0 100 100>
   ============================================================ */
const ICONS = {
  hoja(c){const d=shade(c,-.22);return `
    <path d="M50 92 C50 60 40 42 30 32" fill="none" stroke="${STEM}" stroke-width="4"/>
    <path d="M50 90 C30 78 14 60 20 38 C40 40 56 56 50 90Z" fill="${c}" stroke="${d}" stroke-width="3"/>
    <path d="M50 86 C70 74 88 58 82 36 C60 38 46 56 50 86Z" fill="${shade(c,.07)}" stroke="${d}" stroke-width="3"/>
    <path d="M50 90 C46 64 50 44 56 30 C66 40 66 64 56 84Z" fill="${c}" stroke="${d}" stroke-width="3"/>
    <path d="M50 88 C50 66 51 48 53 34" fill="none" stroke="${d}" stroke-width="1.6"/>`;},
  penca(c){const d=shade(c,-.25);return `
    <path d="M50 94 C50 60 50 36 50 18" stroke="#eef3e6" stroke-width="6" fill="none"/>
    <path d="M50 90 C26 78 16 50 24 24 C40 30 50 50 50 90Z" fill="${c}" stroke="${d}" stroke-width="3"/>
    <path d="M50 90 C74 78 84 50 76 24 C60 30 50 50 50 90Z" fill="${shade(c,.08)}" stroke="${d}" stroke-width="3"/>
    <path d="M50 84 C38 76 30 58 33 38 M50 84 C62 76 70 58 67 38" stroke="${d}" stroke-width="1.4" fill="none"/>`;},
  repollo(c){const d=shade(c,-.28);return `
    <circle cx="50" cy="52" r="40" fill="${shade(c,.1)}" stroke="${d}" stroke-width="3"/>
    <path d="M50 12 C24 24 24 80 50 92 M50 12 C76 24 76 80 50 92" fill="none" stroke="${d}" stroke-width="2.4"/>
    <path d="M16 52 C36 40 64 40 84 52 M18 66 C38 56 62 56 82 66" fill="none" stroke="${d}" stroke-width="2.2"/>
    <circle cx="50" cy="52" r="12" fill="${shade(c,-.05)}" stroke="${d}" stroke-width="2.4"/>`;},
  raiz(c){const d=shade(c,-.25);return `
    <path d="M34 30 C30 18 24 12 18 10 M44 28 C44 14 44 8 44 4 M54 30 C60 16 66 12 72 12" stroke="${LEAF}" stroke-width="4" fill="none"/>
    <path d="M30 30 L70 30 L52 90 C50 95 48 95 46 90Z" fill="${c}" stroke="${d}" stroke-width="3"/>
    <path d="M38 44 H60 M40 56 H56 M44 68 H52" stroke="${d}" stroke-width="1.6"/>`;},
  remolacha(c){const d=shade(c,-.22);return `
    <path d="M40 26 C36 14 30 8 24 6 M50 24 C50 12 50 6 50 2 M60 26 C66 14 72 10 78 10" stroke="${LEAF}" stroke-width="4" fill="none"/>
    <path d="M40 70 H60" stroke="${LEAF_D}" stroke-width="3"/>
    <circle cx="50" cy="56" r="26" fill="${c}" stroke="${d}" stroke-width="3"/>
    <path d="M50 82 C50 90 50 94 50 96" stroke="${d}" stroke-width="3" fill="none"/>
    <path d="M40 50 C46 46 56 46 62 52" stroke="${shade(c,.18)}" stroke-width="2.2" fill="none"/>`;},
  tuberculo(c){const d=shade(c,-.2);return `
    <path d="M22 56 C16 38 34 24 52 26 C76 28 88 44 82 60 C78 76 56 84 40 80 C28 77 26 70 22 56Z"
      fill="${c}" stroke="${d}" stroke-width="3"/>
    <circle cx="42" cy="48" r="2.6" fill="${d}"/><circle cx="60" cy="42" r="2.4" fill="${d}"/>
    <circle cx="64" cy="62" r="2.4" fill="${d}"/><circle cx="46" cy="66" r="2.2" fill="${d}"/>`;},
  bulbo(c){const d=shade(c,-.22);return `
    <path d="M40 36 C40 18 38 8 34 2 M50 34 C50 14 50 6 50 0 M60 36 C60 18 62 10 66 4" stroke="${LEAF}" stroke-width="4" fill="none"/>
    <path d="M30 56 C30 38 42 34 50 34 C58 34 70 38 70 56 C70 78 60 92 50 92 C40 92 30 78 30 56Z"
      fill="${c}" stroke="${d}" stroke-width="3"/>
    <path d="M50 36 C46 56 46 78 50 90 M40 40 C38 58 40 78 46 90 M60 40 C62 58 60 78 54 90"
      stroke="${d}" stroke-width="1.6" fill="none"/>`;},
  ajo(c){const d=shade(c,-.18);return `
    <path d="M50 26 C50 14 50 8 50 4" stroke="${LEAF}" stroke-width="4" fill="none"/>
    <path d="M28 58 C28 36 40 28 50 28 C60 28 72 36 72 58 C72 80 62 90 50 90 C38 90 28 80 28 58Z"
      fill="${c}" stroke="${d}" stroke-width="3"/>
    <path d="M50 30 V88 M39 34 C36 56 38 78 45 88 M61 34 C64 56 62 78 55 88" stroke="${d}" stroke-width="1.8" fill="none"/>
    <path d="M40 90 C38 95 36 96 34 97 M50 90 V97 M60 90 C62 95 64 96 66 97" stroke="${shade(c,-.3)}" stroke-width="1.6" fill="none"/>`;},
  legumbre(c){const d=shade(c,-.25);return `
    <path d="M22 30 C8 50 18 80 44 86 C70 92 86 70 80 50 C76 36 64 36 60 46 C54 60 40 58 38 44 C36 32 30 22 22 30Z"
      fill="${c}" stroke="${d}" stroke-width="3"/>
    <circle cx="40" cy="62" r="6" fill="${shade(c,.15)}" stroke="${d}" stroke-width="2"/>
    <circle cx="54" cy="70" r="6" fill="${shade(c,.15)}" stroke="${d}" stroke-width="2"/>
    <circle cx="66" cy="68" r="6" fill="${shade(c,.15)}" stroke="${d}" stroke-width="2"/>`;},
  tomate(c){const d=shade(c,-.2);return `
    <path d="M50 30 L44 16 M50 30 L58 14 M50 30 L40 22 M50 30 L62 24" stroke="${LEAF}" stroke-width="3.5" fill="none"/>
    <circle cx="50" cy="60" r="32" fill="${c}" stroke="${d}" stroke-width="3"/>
    <path d="M50 28 C50 22 50 18 50 14" stroke="${STEM}" stroke-width="4"/>
    <path d="M36 50 C42 44 50 44 50 50" stroke="${shade(c,.25)}" stroke-width="3" fill="none"/>`;},
  pimiento(c){const d=shade(c,-.2);return `
    <path d="M50 24 C50 16 48 12 44 10 M50 24 C50 16 56 14 60 14" stroke="${STEM}" stroke-width="4" fill="none"/>
    <path d="M30 40 C30 28 44 26 50 26 C56 26 70 28 70 40 C76 56 74 78 60 88 C54 92 46 92 40 88 C26 78 24 56 30 40Z"
      fill="${c}" stroke="${d}" stroke-width="3"/>
    <path d="M44 40 C42 60 42 78 46 86 M58 42 C60 62 60 78 56 86" stroke="${d}" stroke-width="1.8" fill="none"/>`;},
  zapallo(c){const d=shade(c,-.22);return `
    <path d="M50 24 C50 16 54 12 60 12" stroke="${STEM}" stroke-width="4" fill="none"/>
    <ellipse cx="50" cy="58" rx="38" ry="30" fill="${c}" stroke="${d}" stroke-width="3"/>
    <path d="M50 28 C44 44 44 72 50 88 M34 32 C28 48 28 70 36 84 M66 32 C72 48 72 70 64 84"
      stroke="${d}" stroke-width="2" fill="none"/>`;},
  frutilla(c){const d=shade(c,-.2);return `
    <path d="M30 30 L50 26 L70 30 L60 38 L70 40 L50 36 L30 40 L40 38Z" fill="${LEAF}" stroke="${LEAF_D}" stroke-width="2"/>
    <path d="M28 42 C28 36 40 38 50 38 C60 38 72 36 72 42 C72 66 56 88 50 92 C44 88 28 66 28 42Z"
      fill="${c}" stroke="${d}" stroke-width="3"/>
    <g fill="#ffe082"><circle cx="40" cy="52" r="2"/><circle cx="52" cy="50" r="2"/><circle cx="62" cy="54" r="2"/>
    <circle cx="46" cy="62" r="2"/><circle cx="58" cy="64" r="2"/><circle cx="50" cy="74" r="2"/></g>`;},
  aromatica(c){const d=shade(c,-.25);return `
    <path d="M50 94 C50 60 50 34 50 14" stroke="${STEM}" stroke-width="3.5" fill="none"/>
    <g fill="${c}" stroke="${d}" stroke-width="2">
    <path d="M50 24 C40 16 30 18 28 24 C36 30 46 30 50 24Z"/>
    <path d="M50 24 C60 16 70 18 72 24 C64 30 54 30 50 24Z"/>
    <path d="M50 44 C38 36 28 38 26 44 C34 50 46 52 50 44Z"/>
    <path d="M50 44 C62 36 72 38 74 44 C66 50 54 52 50 44Z"/>
    <path d="M50 64 C40 58 30 60 28 66 C36 72 46 72 50 64Z"/>
    <path d="M50 64 C60 58 70 60 72 66 C64 72 54 72 50 64Z"/></g>`;},
  flor(c){const d=shade(c,-.22), p=8;let petals="";
    for(let i=0;i<p;i++){const a=i/p*Math.PI*2;const x=50+24*Math.cos(a),y=50+24*Math.sin(a);
      petals+=`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="11" ry="7" fill="${c}" stroke="${d}" stroke-width="2" transform="rotate(${(a*180/Math.PI).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;}
    return `<path d="M50 92 V60" stroke="${STEM}" stroke-width="3.5"/>${petals}
      <circle cx="50" cy="50" r="13" fill="${shade(c,-.12)}" stroke="${d}" stroke-width="2.4"/>`;},
  margarita(c){const d=shade(c,-.18), p=11;let petals="";
    for(let i=0;i<p;i++){const a=i/p*Math.PI*2;const x=50+26*Math.cos(a),y=46+26*Math.sin(a);
      petals+=`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="8" ry="4" fill="${c}" stroke="${d}" stroke-width="1.8" transform="rotate(${(a*180/Math.PI).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;}
    return `<path d="M50 92 V58" stroke="${STEM}" stroke-width="3.5"/>${petals}
      <circle cx="50" cy="46" r="11" fill="#f9a825" stroke="#b06f00" stroke-width="2.2"/>`;},
  girasol(c){const d=shade(c,-.18), p=14;let petals="";
    for(let i=0;i<p;i++){const a=i/p*Math.PI*2;const x=50+28*Math.cos(a),y=44+28*Math.sin(a);
      petals+=`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="10" ry="5" fill="${c}" stroke="${d}" stroke-width="1.8" transform="rotate(${(a*180/Math.PI).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;}
    return `<path d="M50 94 V60" stroke="${STEM}" stroke-width="4"/>${petals}
      <circle cx="50" cy="44" r="15" fill="#6d4c2b" stroke="#3e2a17" stroke-width="2.4"/>`;},
  lavanda(c){const d=shade(c,-.2);let f="";
    for(let i=0;i<10;i++){const y=20+i*5; const off=(i%2?6:-6);
      f+=`<circle cx="${50+off}" cy="${y}" r="5" fill="${shade(c,i%2?.05:-.05)}" stroke="${d}" stroke-width="1.4"/>`;}
    return `<path d="M50 94 C50 80 50 70 50 60" stroke="${STEM}" stroke-width="3.5"/>
      <path d="M40 66 C44 58 56 58 60 66" stroke="${LEAF}" stroke-width="3" fill="none"/>${f}`;},
};
function buildIcon(type,color){
  const inner = (ICONS[type]||ICONS.hoja)(color);
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#pencil)" stroke-linejoin="round" stroke-linecap="round">${inner}</g></svg>`;
}

/* ---------- iconos de función ---------- */
const FX = {comestible:"🥬", repele:"🛡️", poliniza:"🐝", benefico:"🐞", nitrogeno:"⚡", cobertura:"🌾"};
const FX_NAME = {comestible:"Comestible", repele:"Repele plagas", poliniza:"Atrae polinizadores",
  benefico:"Atrae insectos benéficos", nitrogeno:"Fija nitrógeno", cobertura:"Cobertura"};

/* ============================================================
   ESTADO
   ============================================================ */
const byId = {};
PLANTS.forEach(p=>byId[p.id]=p);
let state = {scale:100, terreno:{w:12,h:8}, plants:[], boards:[], nextId:1};
let view = "todas", activeFx = new Set(), searchTxt = "";
let selected = null;

const $ = s => document.querySelector(s);
const stage = $("#stage"), stageWrap = $("#stageWrap"), gridC = $("#grid");

/* ---------- persistencia ---------- */
function save(){ try{ localStorage.setItem("circuitoVerde", JSON.stringify(state)); }catch(e){} }
function load(){
  try{ const s = JSON.parse(localStorage.getItem("circuitoVerde"));
    if(s && s.plants){ state = Object.assign(state, s); } }catch(e){}
}

/* ============================================================
   CATÁLOGO (3 vistas)
   ============================================================ */
function plantCard(p){
  return `<div class="plant" draggable="false" data-id="${p.id}" title="${p.nombre} — ${p.notas}">
    <div class="art"><div class="ring"></div>${buildIcon(p.icon,p.color)}</div>
    <div class="nm">${p.nombre}</div>
    <div class="sci">${p.cientifico}</div>
    <div class="dist">⟷ ${p.dist} cm</div>
    <div class="fx">${p.funciones.map(f=>FX[f]||"").join("")}${p.inv?"🏠":""}</div>
  </div>`;
}
function passesFilter(p){
  if(searchTxt){
    const hay = (p.nombre+" "+p.cientifico+" "+p.familia+" "+p.grupo+" "+p.categoria+" "+
      p.funciones.map(f=>FX_NAME[f]).join(" ")).toLowerCase();
    if(!hay.includes(searchTxt)) return false;
  }
  if(activeFx.size){
    for(const f of activeFx){
      if(f==="invernadero"){ if(p.inv) return true; }
      else if(p.funciones.includes(f)) return true;
    }
    return false;
  }
  return true;
}
function renderCatalog(){
  const list = PLANTS.filter(passesFilter);
  const cat = $("#catalog");
  if(!list.length){ cat.innerHTML = `<div class="loading">Sin resultados.</div>`; return; }
  let html = "";
  if(view==="todas"){
    html = `<div class="grid">${list.slice().sort((a,b)=>a.nombre.localeCompare(b.nombre)).map(plantCard).join("")}</div>`;
  } else {
    const key = view==="categoria" ? "categoria" : "grupo";
    const groups = {};
    list.forEach(p=>{ (groups[p[key]] ||= []).push(p); });
    html = Object.keys(groups).sort().map(g=>{
      const items = groups[g].sort((a,b)=> view==="grupo"
        ? a.cientifico.localeCompare(b.cientifico) : a.nombre.localeCompare(b.nombre));
      return `<div class="group-label">${g} <span style="color:var(--ink-soft);font-weight:400">· ${items.length}</span></div>
        <div class="grid">${items.map(plantCard).join("")}</div>`;
    }).join("");
  }
  cat.innerHTML = html;
}
function renderFilters(){
  const order = ["comestible","repele","poliniza","benefico","nitrogeno","cobertura","invernadero"];
  $("#fnFilters").innerHTML = order.map(f=>{
    const lbl = f==="invernadero" ? "🏠 Invernadero" : (FX[f]+" "+FX_NAME[f]);
    return `<span class="chip ${activeFx.has(f)?"active":""}" data-fx="${f}">${lbl}</span>`;
  }).join("");
}

/* ============================================================
   LIENZO (grilla, plantas, tablones)
   ============================================================ */
function applyStageSize(){
  const W = state.terreno.w*state.scale, H = state.terreno.h*state.scale;
  stage.style.width = W+"px"; stage.style.height = H+"px";
  gridC.width = W; gridC.height = H;
  drawGrid();
  $("#scaleLbl").textContent = state.scale+" px/m";
}
function drawGrid(){
  const ctx = gridC.getContext("2d"), s = state.scale;
  const W = gridC.width, H = gridC.height;
  ctx.clearRect(0,0,W,H);
  // medios metros
  ctx.strokeStyle = "rgba(63,125,78,.10)"; ctx.lineWidth=1;
  for(let x=0;x<=W;x+=s/2){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
  for(let y=0;y<=H;y+=s/2){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
  // metros
  ctx.strokeStyle = "rgba(63,125,78,.28)"; ctx.lineWidth=1.4;
  ctx.fillStyle="rgba(44,90,57,.5)"; ctx.font="10px Segoe UI";
  for(let x=0,m=0;x<=W;x+=s,m++){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke(); if(m>0)ctx.fillText(m+" m",x+2,11);}
  for(let y=0,m=0;y<=H;y+=s,m++){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke(); if(m>0)ctx.fillText(m+" m",2,y-2);}
}

function renderStage(){
  applyStageSize();
  // limpiar nodos previos (mantener grid + hint)
  [...stage.querySelectorAll(".node")].forEach(n=>n.remove());
  state.boards.forEach(b=>stage.appendChild(boardEl(b)));
  state.plants.forEach(p=>stage.appendChild(plantEl(p)));
  $("#emptyHint").style.display = (state.plants.length||state.boards.length)?"none":"block";
  detectOverlaps();
  renderStats();
}

function plantEl(inst){
  const p = byId[inst.id]; if(!p) return document.createElement("div");
  const s = state.scale;
  const ringPx = (p.dist/100)*s;                 // diámetro real
  const iconPx = Math.max(24, Math.min(ringPx*0.66, 64));
  const el = document.createElement("div");
  el.className = "node plant-node"; el.dataset.uid = inst.uid;
  el.style.left = (inst.x*s)+"px"; el.style.top = (inst.y*s)+"px";
  el.innerHTML = `
    <div class="pring" style="width:${ringPx}px;height:${ringPx}px"></div>
    <div class="psvg" style="width:${iconPx}px;height:${iconPx}px">${buildIcon(p.icon,p.color)}</div>
    <div class="tag">${p.nombre}</div>`;
  makePlantDraggable(el, inst);
  return el;
}
function boardEl(b){
  const s = state.scale;
  const el = document.createElement("div");
  el.className = "node board"; el.dataset.uid = b.uid;
  el.style.left = (b.x*s)+"px"; el.style.top = (b.y*s)+"px";
  el.innerHTML = `<div class="board-rect" style="width:${b.L*s}px;height:${b.W*s}px">
      <span class="dim w">${b.L.toFixed(1)} m</span>
      <span class="dim h">${b.W.toFixed(1)} m</span>
      <button class="del" title="Quitar tablón">✕</button>
      <span class="handle" title="Redimensionar"></span>
    </div>`;
  el.querySelector(".del").addEventListener("pointerdown",e=>{e.stopPropagation();});
  el.querySelector(".del").addEventListener("click",e=>{
    e.stopPropagation(); state.boards = state.boards.filter(x=>x.uid!==b.uid); save(); renderStage();});
  makeBoardDraggable(el, b);
  makeBoardResizable(el.querySelector(".handle"), el.querySelector(".board-rect"), b);
  return el;
}

/* ---------- drag de plantas ya colocadas ---------- */
function makePlantDraggable(el, inst){
  let moved=false;
  el.addEventListener("pointerdown", e=>{
    if(e.button!==0) return;
    e.preventDefault(); moved=false;
    selectNode(el);
    const rect = stage.getBoundingClientRect(), s=state.scale;
    const offX = e.clientX - (rect.left + inst.x*s);
    const offY = e.clientY - (rect.top + inst.y*s);
    el.setPointerCapture(e.pointerId);
    const move = ev=>{
      moved=true;
      let nx = (ev.clientX - rect.left - offX)/s, ny=(ev.clientY - rect.top - offY)/s;
      nx = Math.max(0, Math.min(state.terreno.w, nx)); ny=Math.max(0,Math.min(state.terreno.h,ny));
      inst.x=nx; inst.y=ny; el.style.left=(nx*s)+"px"; el.style.top=(ny*s)+"px";
      detectOverlaps();
    };
    const up = ev=>{ el.releasePointerCapture(e.pointerId);
      el.removeEventListener("pointermove",move); el.removeEventListener("pointerup",up);
      if(moved){save(); renderStats();} };
    el.addEventListener("pointermove",move); el.addEventListener("pointerup",up);
  });
  el.addEventListener("dblclick", ()=>{ state.plants=state.plants.filter(x=>x.uid!==inst.uid); save(); renderStage(); });
}
function makeBoardDraggable(el, b){
  const rectEl = el.querySelector(".board-rect");
  rectEl.addEventListener("pointerdown", e=>{
    if(e.target.classList.contains("handle")||e.target.classList.contains("del")) return;
    if(e.button!==0) return; e.preventDefault(); selectNode(el);
    const rect = stage.getBoundingClientRect(), s=state.scale;
    const offX = e.clientX - (rect.left + b.x*s), offY = e.clientY - (rect.top + b.y*s);
    el.setPointerCapture(e.pointerId);
    const move = ev=>{
      let nx=(ev.clientX-rect.left-offX)/s, ny=(ev.clientY-rect.top-offY)/s;
      nx=Math.max(0,Math.min(state.terreno.w-b.L,nx)); ny=Math.max(0,Math.min(state.terreno.h-b.W,ny));
      b.x=nx; b.y=ny; el.style.left=(nx*s)+"px"; el.style.top=(ny*s)+"px";
    };
    const up = ()=>{ el.releasePointerCapture(e.pointerId);
      el.removeEventListener("pointermove",move); el.removeEventListener("pointerup",up); save(); };
    el.addEventListener("pointermove",move); el.addEventListener("pointerup",up);
  });
}
function makeBoardResizable(handle, rectEl, b){
  handle.addEventListener("pointerdown", e=>{
    e.preventDefault(); e.stopPropagation();
    const s=state.scale; const startX=e.clientX, startY=e.clientY, L0=b.L, W0=b.W;
    handle.setPointerCapture(e.pointerId);
    const move=ev=>{
      b.L = Math.max(0.2, +(L0 + (ev.clientX-startX)/s).toFixed(2));
      b.W = Math.max(0.2, +(W0 + (ev.clientY-startY)/s).toFixed(2));
      rectEl.style.width=(b.L*s)+"px"; rectEl.style.height=(b.W*s)+"px";
      rectEl.querySelector(".dim.w").textContent=b.L.toFixed(1)+" m";
      rectEl.querySelector(".dim.h").textContent=b.W.toFixed(1)+" m";
    };
    const up=()=>{ handle.releasePointerCapture(e.pointerId);
      handle.removeEventListener("pointermove",move); handle.removeEventListener("pointerup",up);
      save(); renderStats(); };
    handle.addEventListener("pointermove",move); handle.addEventListener("pointerup",up);
  });
}
function selectNode(el){
  if(selected) selected.classList.remove("sel");
  selected = el; el.classList.add("sel");
}

/* ---------- solapamiento (plantas muy juntas) ---------- */
function detectOverlaps(){
  const nodes = state.plants.map(inst=>({inst, p:byId[inst.id]}));
  const flags = new Set();
  for(let i=0;i<nodes.length;i++) for(let j=i+1;j<nodes.length;j++){
    const a=nodes[i], b=nodes[j];
    const dx=a.inst.x-b.inst.x, dy=a.inst.y-b.inst.y;
    const dist=Math.hypot(dx,dy);
    const minDist=(a.p.dist/100)/2 + (b.p.dist/100)/2;
    if(dist < minDist){ flags.add(a.inst.uid); flags.add(b.inst.uid); }
  }
  stage.querySelectorAll(".plant-node").forEach(el=>{
    el.classList.toggle("overlap", flags.has(el.dataset.uid));
  });
}

/* ---------- estadísticas ---------- */
function renderStats(){
  $("#stPlants").textContent = state.plants.length;
  const counts={};
  state.plants.forEach(i=>counts[i.id]=(counts[i.id]||0)+1);
  $("#stSpecies").textContent = Object.keys(counts).length;
  $("#stBoards").textContent = state.boards.length;
  const area = state.boards.reduce((s,b)=>s+b.L*b.W,0);
  $("#stArea").textContent = area.toFixed(2)+" m²";
  $("#stMini").innerHTML = Object.keys(counts).sort((a,b)=>counts[b]-counts[a])
    .map(id=>`<div><span>${byId[id]?byId[id].nombre:id}</span><b>${counts[id]}</b></div>`).join("");
}

/* ============================================================
   DRAG desde el catálogo al lienzo
   ============================================================ */
const ghost = $("#ghost");
function startCatalogDrag(plantId, e){
  const p = byId[plantId];
  ghost.innerHTML = buildIcon(p.icon,p.color);
  ghost.style.display="block"; moveGhost(e);
  const move = ev=>moveGhost(ev);
  const up = ev=>{
    document.removeEventListener("pointermove",move);
    document.removeEventListener("pointerup",up);
    ghost.style.display="none";
    const r = stageWrap.getBoundingClientRect();
    if(ev.clientX>=r.left && ev.clientX<=r.right && ev.clientY>=r.top && ev.clientY<=r.bottom){
      const sr = stage.getBoundingClientRect(), s=state.scale;
      let x=(ev.clientX-sr.left)/s, y=(ev.clientY-sr.top)/s;
      x=Math.max(0,Math.min(state.terreno.w,x)); y=Math.max(0,Math.min(state.terreno.h,y));
      state.plants.push({uid:"p"+(state.nextId++), id:plantId, x:+x.toFixed(3), y:+y.toFixed(3)});
      save(); renderStage();
    }
  };
  document.addEventListener("pointermove",move);
  document.addEventListener("pointerup",up);
}
function moveGhost(e){ ghost.style.left=e.clientX+"px"; ghost.style.top=e.clientY+"px"; }

/* ============================================================
   EVENTOS
   ============================================================ */
function bind(){
  // tabs
  document.querySelectorAll(".tabs button").forEach(b=>b.addEventListener("click",()=>{
    document.querySelectorAll(".tabs button").forEach(x=>x.classList.remove("active"));
    b.classList.add("active"); view=b.dataset.view; renderCatalog();
  }));
  // búsqueda
  $("#search").addEventListener("input",e=>{ searchTxt=e.target.value.trim().toLowerCase(); renderCatalog(); });
  // filtros de función
  $("#fnFilters").addEventListener("click",e=>{
    const chip=e.target.closest(".chip"); if(!chip) return;
    const f=chip.dataset.fx; activeFx.has(f)?activeFx.delete(f):activeFx.add(f);
    renderFilters(); renderCatalog();
  });
  // arrastrar del catálogo
  $("#catalog").addEventListener("pointerdown",e=>{
    const card=e.target.closest(".plant"); if(!card) return;
    e.preventDefault(); startCatalogDrag(card.dataset.id, e);
  });
  // zoom
  $("#zoomIn").addEventListener("click",()=>{ state.scale=Math.min(220,state.scale+20); save(); renderStage(); });
  $("#zoomOut").addEventListener("click",()=>{ state.scale=Math.max(40,state.scale-20); save(); renderStage(); });
  // tablón
  $("#addBoard").addEventListener("click",()=>{
    const L=Math.max(0.2,+$("#bL").value||2), W=Math.max(0.2,+$("#bW").value||1);
    state.boards.push({uid:"b"+(state.nextId++), x:0.5, y:0.5, L:+L, W:+W});
    save(); renderStage();
  });
  // terreno
  $("#setTerreno").addEventListener("click",()=>{
    state.terreno.w=Math.max(2,+$("#tW").value||12); state.terreno.h=Math.max(2,+$("#tH").value||8);
    save(); renderStage();
  });
  // vaciar
  $("#clearBtn").addEventListener("click",()=>{
    if(confirm("¿Vaciar todo el diseño? Esto borra plantas y tablones.")){
      state.plants=[]; state.boards=[]; save(); renderStage();
    }
  });
  // exportar
  $("#exportBtn").addEventListener("click",exportDesign);
  // borrar seleccionado con tecla
  document.addEventListener("keydown",e=>{
    if((e.key==="Delete"||e.key==="Backspace") && selected){
      const uid=selected.dataset.uid;
      state.plants=state.plants.filter(x=>x.uid!==uid);
      state.boards=state.boards.filter(x=>x.uid!==uid);
      selected=null; save(); renderStage();
    }
  });
  // click en vacío deselecciona
  stage.addEventListener("pointerdown",e=>{ if(e.target===stage||e.target===gridC){ if(selected){selected.classList.remove("sel");selected=null;} }});
}

function exportDesign(){
  const counts={}; state.plants.forEach(i=>counts[i.id]=(counts[i.id]||0)+1);
  const resumen = {
    proyecto:"Circuito Verde — diseño de huerta/invernadero",
    terreno_m: state.terreno, escala_px_por_m: state.scale,
    total_plantas: state.plants.length,
    especies: Object.keys(counts).length,
    bancales: state.boards.length,
    area_bancales_m2: +state.boards.reduce((s,b)=>s+b.L*b.W,0).toFixed(2),
    detalle_plantas: Object.keys(counts).map(id=>({
      planta: byId[id]?byId[id].nombre:id, cientifico: byId[id]?byId[id].cientifico:"",
      cantidad: counts[id], distancia_cm: byId[id]?byId[id].dist:null })),
    bancales_detalle: state.boards.map(b=>({largo_m:b.L,ancho_m:b.W})),
    layout: state
  };
  const blob = new Blob([JSON.stringify(resumen,null,2)],{type:"application/json"});
  const a=document.createElement("a"); a.href=URL.createObjectURL(blob);
  a.download="circuito-verde-diseno.json"; a.click(); URL.revokeObjectURL(a.href);
}

/* ============================================================
   INICIO
   ============================================================ */
function init(){
  load();
  $("#tW").value=state.terreno.w; $("#tH").value=state.terreno.h;
  renderFilters(); renderCatalog(); bind(); renderStage();
}
document.addEventListener("DOMContentLoaded",init);
