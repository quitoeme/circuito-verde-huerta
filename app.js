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
/* imagen generada (Nano Banana) con respaldo al dibujo SVG si falta/falla */
function artHTML(p){
  return `<img class="art-img" src="img/${p.id}.png" alt="${p.nombre}" loading="lazy" draggable="false" onerror="imgFallback(this,'${p.id}')">`;
}
window.imgFallback = function(el, id){
  const p = byId[id]; if(p) el.outerHTML = buildIcon(p.icon, p.color);
};

/* ---------- iconos de función ---------- */
const FX = {comestible:"🥬", repele:"🛡️", poliniza:"🐝", benefico:"🐞", nitrogeno:"⚡", cobertura:"🌾"};
const FX_NAME = {comestible:"Comestible", repele:"Repele plagas", poliniza:"Atrae polinizadores",
  benefico:"Atrae insectos benéficos", nitrogeno:"Fija nitrógeno", cobertura:"Cobertura"};

/* ============================================================
   ESTADO
   ============================================================ */
const byId = {};
PLANTS.forEach(p=>byId[p.id]=p);
const DET = id => (window.DETAILS||{})[id] || {};   // datos detallados (details.js)

const MARGIN = 1.5;                                 // m de margen alrededor del terreno
const clamp = (v,a,b)=>Math.max(a,Math.min(b,v));
const stageW = ()=>state.terreno.w + 2*MARGIN;      // ancho total del lienzo (m)
const stageH = ()=>state.terreno.h + 2*MARGIN;

let state = {v:2, scale:100, terreno:{w:12,h:8}, plants:[], boards:[], nextId:1};
let view = "todas", activeFx = new Set(), activeSeason = new Set(), searchTxt = "";
let selUids = new Set();                            // selección múltiple (uids)

const $ = s => document.querySelector(s);
const stage = $("#stage"), stageWrap = $("#stageWrap"), gridC = $("#grid");

/* ---------- persistencia ---------- */
function save(){ try{ localStorage.setItem("circuitoVerde", JSON.stringify(state)); }catch(e){} }
function load(){
  try{ const s = JSON.parse(localStorage.getItem("circuitoVerde"));
    if(s && s.plants){
      state = Object.assign(state, s);
      if(state.v!==2){   // migrar diseños viejos: el terreno ahora tiene margen
        state.plants.forEach(p=>{p.x+=MARGIN;p.y+=MARGIN;});
        state.boards.forEach(b=>{b.x+=MARGIN;b.y+=MARGIN;});
        state.v=2;
      }
    } }catch(e){}
}

/* ============================================================
   CATÁLOGO (3 vistas)
   ============================================================ */
const METODO_ABBR = {
  "Siembra directa":"🌱 Directa", "Trasplante (almácigo)":"🪴 Trasplante",
  "Directa o trasplante":"🌱 Directa/trasp.", "Plantación (bulbo/diente/tubérculo)":"🧅 Plantación",
  "División de matas":"🪓 División", "Esqueje/plantín":"🌿 Esqueje"
};
function plantCard(p){
  const d = DET(p.id);
  const met = d.metodo ? `<div class="met" title="Método de implantación">${METODO_ABBR[d.metodo]||d.metodo}</div>` : "";
  return `<div class="plant" draggable="false" data-id="${p.id}" title="${p.nombre} — ${p.notas}">
    <div class="art"><div class="ring"></div>${artHTML(p)}</div>
    <div class="nm">${p.nombre}</div>
    <div class="sci">${p.cientifico}</div>
    <div class="dist">⟷ ${p.dist} cm</div>
    <div class="fx">${p.funciones.map(f=>FX[f]||"").join("")}${p.inv?"🏠":""}</div>
    ${met}
    <button class="info-btn" data-info="${p.id}">＋ info</button>
  </div>`;
}
function passesFilter(p){
  if(searchTxt){
    const hay = (p.nombre+" "+p.cientifico+" "+p.familia+" "+p.grupo+" "+p.categoria+" "+
      p.funciones.map(f=>FX_NAME[f]).join(" ")).toLowerCase();
    if(!hay.includes(searchTxt)) return false;
  }
  if(activeFx.size){
    let ok=false;
    for(const f of activeFx){
      if(f==="invernadero"){ if(p.inv) ok=true; }
      else if(p.funciones.includes(f)) ok=true;
    }
    if(!ok) return false;
  }
  if(activeSeason.size){
    const temps = DET(p.id).temporadas || [];
    if(![...activeSeason].some(s=>temps.includes(s))) return false;
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
const SEASONS = [["Primavera","🌸"],["Verano","☀️"],["Otoño","🍂"],["Invierno","❄️"]];
function renderSeasonFilter(){
  $("#seasonFilters").innerHTML = SEASONS.map(([s,emo])=>
    `<span class="chip season ${activeSeason.has(s)?"active":""}" data-season="${s}">${emo} ${s}</span>`).join("");
}

/* ============================================================
   LIENZO (grilla, plantas, tablones)
   ============================================================ */
function applyStageSize(){
  const W = stageW()*state.scale, H = stageH()*state.scale;
  stage.style.width = W+"px"; stage.style.height = H+"px";
  gridC.width = W; gridC.height = H;
  drawGrid();
  $("#scaleLbl").textContent = state.scale+" px/m";
}
function drawGrid(){
  const ctx = gridC.getContext("2d"), s = state.scale;
  const W = gridC.width, H = gridC.height;
  const mx = MARGIN*s, my = MARGIN*s;                 // offset del terreno
  const tw = state.terreno.w*s, th = state.terreno.h*s;
  ctx.clearRect(0,0,W,H);
  // fondo del margen (zona de maniobra) y del terreno
  ctx.fillStyle = "#eef0e6"; ctx.fillRect(0,0,W,H);
  ctx.fillStyle = "#fcfdf8"; ctx.fillRect(mx,my,tw,th);
  // grilla de medios metros (solo dentro del terreno)
  ctx.save(); ctx.beginPath(); ctx.rect(mx,my,tw,th); ctx.clip();
  ctx.strokeStyle = "rgba(63,125,78,.10)"; ctx.lineWidth=1;
  for(let x=mx;x<=mx+tw;x+=s/2){ctx.beginPath();ctx.moveTo(x,my);ctx.lineTo(x,my+th);ctx.stroke();}
  for(let y=my;y<=my+th;y+=s/2){ctx.beginPath();ctx.moveTo(mx,y);ctx.lineTo(mx+tw,y);ctx.stroke();}
  // metros
  ctx.strokeStyle = "rgba(63,125,78,.26)"; ctx.lineWidth=1.2;
  ctx.fillStyle="rgba(44,90,57,.55)"; ctx.font="10px Segoe UI";
  for(let m=0;m<=state.terreno.w;m++){const x=mx+m*s;ctx.beginPath();ctx.moveTo(x,my);ctx.lineTo(x,my+th);ctx.stroke(); if(m>0&&m<state.terreno.w)ctx.fillText(m,x+2,my+11);}
  for(let m=0;m<=state.terreno.h;m++){const y=my+m*s;ctx.beginPath();ctx.moveTo(mx,y);ctx.lineTo(mx+tw,y);ctx.stroke(); if(m>0&&m<state.terreno.h)ctx.fillText(m,mx+2,y-2);}
  ctx.restore();
  // borde del terreno
  ctx.strokeStyle = "#2c5a39"; ctx.lineWidth=2.5; ctx.setLineDash([9,5]);
  ctx.strokeRect(mx,my,tw,th); ctx.setLineDash([]);
  // etiqueta del terreno
  ctx.fillStyle="#2c5a39"; ctx.font="bold 12px Segoe UI";
  ctx.fillText(`TERRENO ${state.terreno.w} × ${state.terreno.h} m`, mx+6, my-7>10?my-7:my+16);
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
    <div class="psvg" style="width:${iconPx}px;height:${iconPx}px">${artHTML(p)}</div>
    <div class="tag">${p.nombre}</div>`;
  makePlantDraggable(el, inst);
  return el;
}
/* frame de listones de madera vistos desde arriba (relleno blanco) */
function boardFrameInner(W,H){
  const t = Math.max(7, Math.min(state.scale*0.13, Math.min(W,H)/2 - 3));
  const ix=t, iy=t, iw=Math.max(0,W-2*t), ih=Math.max(0,H-2*t);
  return `
    <path d="M0 0 H${W} V${H} H0 Z M${t} ${t} H${W-t} V${H-t} H${t} Z"
      fill="url(#woodGrain)" fill-rule="evenodd" stroke="#6e4a25" stroke-width="1.4"/>
    <line x1="0" y1="0" x2="${t}" y2="${t}" stroke="#5e3f1f" stroke-width="1"/>
    <line x1="${W}" y1="0" x2="${W-t}" y2="${t}" stroke="#5e3f1f" stroke-width="1"/>
    <line x1="${W}" y1="${H}" x2="${W-t}" y2="${H-t}" stroke="#5e3f1f" stroke-width="1"/>
    <line x1="0" y1="${H}" x2="${t}" y2="${H-t}" stroke="#5e3f1f" stroke-width="1"/>
    <rect x="${ix}" y="${iy}" width="${iw}" height="${ih}" fill="#ffffff" stroke="#7a5226" stroke-width="1.2"/>
    <path d="M${ix} ${iy} H${ix+iw}" stroke="#000" stroke-opacity=".10" stroke-width="2"/>
    <path d="M${ix} ${iy} V${iy+ih}" stroke="#000" stroke-opacity=".10" stroke-width="2"/>
    <path d="M0 0 H${W}" stroke="#dcb589" stroke-width="2" opacity=".9"/>
    <path d="M0 0 V${H}" stroke="#dcb589" stroke-width="2" opacity=".9"/>
    <path d="M0 ${H} H${W}" stroke="#5e3f1f" stroke-width="2" opacity=".7"/>
    <path d="M${W} 0 V${H}" stroke="#5e3f1f" stroke-width="2" opacity=".7"/>`;
}
function boardFrameSVG(W,H){
  return `<svg class="frame" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"
    preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">${boardFrameInner(W,H)}</svg>`;
}
function boardEl(b){
  const s = state.scale;
  const el = document.createElement("div");
  el.className = "node board"; el.dataset.uid = b.uid;
  el.style.left = (b.x*s)+"px"; el.style.top = (b.y*s)+"px";
  el.innerHTML = `<div class="board-rect" style="width:${b.L*s}px;height:${b.W*s}px">
      ${boardFrameSVG(b.L*s,b.W*s)}
      <span class="dim h">${b.L.toFixed(1)} m</span>
      <span class="dim w">${b.W.toFixed(1)} m</span>
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

/* ---------- selección múltiple (shift+click) ---------- */
function refreshSel(){ stage.querySelectorAll(".node").forEach(n=>n.classList.toggle("sel", selUids.has(n.dataset.uid))); }
function setSelection(uids){ selUids = new Set(uids); refreshSel(); }
function toggleSel(uid){ selUids.has(uid)?selUids.delete(uid):selUids.add(uid); refreshSel(); }
function clearSel(){ if(selUids.size){ selUids.clear(); refreshSel(); } }
function findItem(uid){
  let r = state.plants.find(p=>p.uid===uid); if(r) return {type:"plant", ref:r};
  r = state.boards.find(b=>b.uid===uid); if(r) return {type:"board", ref:r};
  return null;
}
/* arrastre grupal de todo lo seleccionado */
function startGroupDrag(e, el){
  const rect = stage.getBoundingClientRect(), s=state.scale;
  const items = [...selUids].map(uid=>{
    const it = findItem(uid); if(!it) return null;
    const node = stage.querySelector(`.node[data-uid="${uid}"]`);
    return {type:it.type, ref:it.ref, el:node, sx:it.ref.x, sy:it.ref.y};
  }).filter(Boolean);
  const startMX=(e.clientX-rect.left)/s, startMY=(e.clientY-rect.top)/s;
  let moved=false;
  el.setPointerCapture(e.pointerId);
  const move=ev=>{
    moved=true;
    const dx=(ev.clientX-rect.left)/s-startMX, dy=(ev.clientY-rect.top)/s-startMY;
    items.forEach(it=>{
      let nx=it.sx+dx, ny=it.sy+dy;
      if(it.type==="plant"){ nx=clamp(nx,0,stageW()); ny=clamp(ny,0,stageH()); }
      else { nx=clamp(nx,0,stageW()-it.ref.L); ny=clamp(ny,0,stageH()-it.ref.W); }
      it.ref.x=nx; it.ref.y=ny; it.el.style.left=(nx*s)+"px"; it.el.style.top=(ny*s)+"px";
    });
    detectOverlaps();
  };
  const up=()=>{ el.releasePointerCapture(e.pointerId);
    el.removeEventListener("pointermove",move); el.removeEventListener("pointerup",up);
    if(moved){save(); renderStats();} };
  el.addEventListener("pointermove",move); el.addEventListener("pointerup",up);
}
/* ---------- drag de plantas ya colocadas ---------- */
function makePlantDraggable(el, inst){
  el.addEventListener("pointerdown", e=>{
    if(e.button!==0) return;
    e.preventDefault();
    if(e.shiftKey){ toggleSel(inst.uid); return; }
    if(!selUids.has(inst.uid)) setSelection([inst.uid]);
    startGroupDrag(e, el);
  });
  el.addEventListener("dblclick", ()=>{ state.plants=state.plants.filter(x=>x.uid!==inst.uid); selUids.delete(inst.uid); save(); renderStage(); });
}
function makeBoardDraggable(el, b){
  const rectEl = el.querySelector(".board-rect");
  rectEl.addEventListener("pointerdown", e=>{
    if(e.target.classList.contains("handle")||e.target.classList.contains("del")) return;
    if(e.button!==0) return; e.preventDefault();
    if(e.shiftKey){ toggleSel(b.uid); return; }
    if(!selUids.has(b.uid)) setSelection([b.uid]);
    startGroupDrag(e, el);
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
      const Wpx=b.L*s, Hpx=b.W*s;
      rectEl.style.width=Wpx+"px"; rectEl.style.height=Hpx+"px";
      const svg=rectEl.querySelector("svg.frame");
      svg.setAttribute("width",Wpx); svg.setAttribute("height",Hpx);
      svg.setAttribute("viewBox",`0 0 ${Wpx} ${Hpx}`); svg.innerHTML=boardFrameInner(Wpx,Hpx);
      rectEl.querySelector(".dim.h").textContent=b.L.toFixed(1)+" m";
      rectEl.querySelector(".dim.w").textContent=b.W.toFixed(1)+" m";
    };
    const up=()=>{ handle.releasePointerCapture(e.pointerId);
      handle.removeEventListener("pointermove",move); handle.removeEventListener("pointerup",up);
      save(); renderStats(); };
    handle.addEventListener("pointermove",move); handle.addEventListener("pointerup",up);
  });
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
  ghost.innerHTML = artHTML(p);
  ghost.style.display="block"; moveGhost(e);
  const move = ev=>moveGhost(ev);
  const up = ev=>{
    document.removeEventListener("pointermove",move);
    document.removeEventListener("pointerup",up);
    ghost.style.display="none";
    const r = stageWrap.getBoundingClientRect();
    if(ev.clientX>=r.left && ev.clientX<=r.right && ev.clientY>=r.top && ev.clientY<=r.bottom){
      const sr = stage.getBoundingClientRect(), s=state.scale;
      let x=clamp((ev.clientX-sr.left)/s,0,stageW()), y=clamp((ev.clientY-sr.top)/s,0,stageH());
      state.plants.push({uid:"p"+(state.nextId++), id:plantId, x:+x.toFixed(3), y:+y.toFixed(3)});
      save(); renderStage();
    }
  };
  document.addEventListener("pointermove",move);
  document.addEventListener("pointerup",up);
}
function moveGhost(e){ ghost.style.left=e.clientX+"px"; ghost.style.top=e.clientY+"px"; }

/* ============================================================
   MODAL DE DETALLES (+ info)
   ============================================================ */
function fnBadges(p){
  return p.funciones.map(f=>`<span>${FX[f]} ${FX_NAME[f]}</span>`).join("") + (p.inv?`<span>🏠 Invernadero</span>`:"");
}
function openInfo(id){
  const p = byId[id]; if(!p) return; const d = DET(id);
  const cell=(t,v)=> v?`<div class="m-cell"><h5>${t}</h5><div class="v">${v}</div></div>`:"";
  const pills=(arr)=> (arr&&arr.length)?arr.map(x=>`<span class="pill">${x}</span>`).join("")
    :`<span class="v" style="color:var(--ink-soft)">Sin restricciones conocidas</span>`;
  $("#modalBody").innerHTML = `
    <div class="m-head">
      <div class="m-art">${artHTML(p)}</div>
      <div>
        <h3>${p.nombre}</h3>
        <div class="m-sci">${p.cientifico} · ${p.familia}</div>
        <div class="m-tags">${fnBadges(p)}</div>
      </div>
    </div>
    <div class="m-grid">
      <div class="m-cell pos full"><h5>🤝 Emparejamiento positivo</h5><div>${pills(d.compaPos)}</div></div>
      <div class="m-cell neg full"><h5>🚫 Emparejamiento negativo</h5><div>${pills(d.compaNeg)}</div></div>
      ${cell("☀️ Luz", d.luz)}
      ${cell("💧 Riego", d.riego ? `<b>${d.riego}</b> — ${d.riegoTipo||""}` : "")}
      ${cell("🗓️ Temporada en cantero", (d.temporadas||[]).join(" · "))}
      ${cell("🌱 Método recomendado", d.metodo)}
      ${cell("📅 Época de siembra", p.siembra)}
      ${cell("📏 Distancia entre plantas", p.dist+" cm")}
      ${cell("💪 Fortalezas", d.fortalezas)}
      ${cell("⚠️ Debilidades", d.debilidades)}
      ${cell("🌡️ ¿Invernadero en Bariloche?", p.inv?"Sí — conviene bajo cubierta":"No es imprescindible")}
      <div class="m-cell full"><h5>📝 Nota</h5><div class="v">${p.notas}</div></div>
    </div>
    <div class="m-foot">Datos orientativos para huerta patagónica (criterio agroecológico tipo INTA/ProHuerta). Verificá contra la cartilla de tu zona.</div>`;
  $("#modal").hidden = false;
}
function closeInfo(){ $("#modal").hidden = true; }

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
  // filtro de temporada
  $("#seasonFilters").addEventListener("click",e=>{
    const chip=e.target.closest(".chip"); if(!chip) return;
    const s=chip.dataset.season; activeSeason.has(s)?activeSeason.delete(s):activeSeason.add(s);
    renderSeasonFilter(); renderCatalog();
  });
  // botón + info
  $("#catalog").addEventListener("click",e=>{
    const ib=e.target.closest(".info-btn"); if(ib){ openInfo(ib.dataset.info); }
  });
  // cerrar modal
  $("#modalClose").addEventListener("click",closeInfo);
  $("#modal").addEventListener("click",e=>{ if(e.target.id==="modal") closeInfo(); });
  // arrastrar del catálogo (el botón +info no arrastra)
  $("#catalog").addEventListener("pointerdown",e=>{
    if(e.target.closest(".info-btn")) return;
    const card=e.target.closest(".plant"); if(!card) return;
    e.preventDefault(); startCatalogDrag(card.dataset.id, e);
  });
  // zoom (botones)
  $("#zoomIn").addEventListener("click",()=>{ state.scale=Math.min(240,state.scale+20); save(); renderStage(); });
  $("#zoomOut").addEventListener("click",()=>{ state.scale=Math.max(40,state.scale-20); save(); renderStage(); });
  // zoom con ctrl + rueda (hacia el cursor)
  stageWrap.addEventListener("wheel",e=>{
    if(!e.ctrlKey) return;
    e.preventDefault();
    const old=state.scale, ns=clamp(old+(e.deltaY<0?15:-15),40,240);
    if(ns===old) return;
    const r=stageWrap.getBoundingClientRect();
    const cx=e.clientX-r.left+stageWrap.scrollLeft, cy=e.clientY-r.top+stageWrap.scrollTop;
    const k=ns/old; state.scale=ns; save(); renderStage();
    stageWrap.scrollLeft=cx*k-(e.clientX-r.left); stageWrap.scrollTop=cy*k-(e.clientY-r.top);
  },{passive:false});
  // tablón
  $("#addBoard").addEventListener("click",()=>{
    const L=Math.max(0.2,+$("#bL").value||2), W=Math.max(0.2,+$("#bW").value||1);
    state.boards.push({uid:"b"+(state.nextId++), x:MARGIN+0.3, y:MARGIN+0.3, L:+L, W:+W});
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
  // logout
  $("#btn-logout").addEventListener("click",doLogout);
  // borrar seleccionado/s con tecla (Supr/Backspace)
  document.addEventListener("keydown",e=>{
    if(e.key==="Escape"){ closeInfo(); return; }
    if((e.key==="Delete"||e.key==="Backspace") && selUids.size){
      const t=document.activeElement; if(t && /INPUT|TEXTAREA/.test(t.tagName)) return;
      state.plants=state.plants.filter(x=>!selUids.has(x.uid));
      state.boards=state.boards.filter(x=>!selUids.has(x.uid));
      selUids.clear(); save(); renderStage();
    }
  });
  // click en vacío deselecciona
  stage.addEventListener("pointerdown",e=>{ if(e.target===stage||e.target===gridC){ clearSel(); }});
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
   LOGIN CON GOOGLE (Google Identity Services)
   Usa el MISMO Client ID web que la app de Inventario.
   ============================================================ */
const GOOGLE_CLIENT_ID = (window.CV_CONFIG && window.CV_CONFIG.googleClientId) || "";
const loginRequired = ()=> !!GOOGLE_CLIENT_ID;
const SESSION_KEY = "circuitoVerde.session";
let session = null;
try{ session = JSON.parse(localStorage.getItem(SESSION_KEY)) || null; }catch(e){}
const sessionValid = ()=> !!session && (!session.exp || session.exp*1000 > Date.now());
function saveSession(s){ session=s; try{ s?localStorage.setItem(SESSION_KEY,JSON.stringify(s)):localStorage.removeItem(SESSION_KEY); }catch(e){} }
function decodeJwt(t){ try{ const p=t.split(".")[1].replace(/-/g,"+").replace(/_/g,"/");
  return JSON.parse(decodeURIComponent(atob(p).split("").map(c=>"%"+("00"+c.charCodeAt(0).toString(16)).slice(-2)).join(""))); }catch(e){ return null; } }
function waitForGoogle(cb,n=0){
  if(window.google && google.accounts && google.accounts.id) return cb();
  if(n>40){ const e=$("#login-error"); e.hidden=false; e.textContent="No se pudo cargar Google. Revisá tu conexión."; return; }
  setTimeout(()=>waitForGoogle(cb,n+1),150);
}
function initGoogle(){
  waitForGoogle(()=>{
    google.accounts.id.initialize({client_id:GOOGLE_CLIENT_ID, callback:onGoogleCredential, auto_select:true});
    google.accounts.id.renderButton($("#g-signin"),{theme:"filled_blue",size:"large",text:"signin_with",shape:"pill",locale:"es"});
    google.accounts.id.prompt();
  });
}
function onGoogleCredential(resp){
  const p=decodeJwt(resp.credential);
  if(!p||!p.email){ const e=$("#login-error"); e.hidden=false; e.textContent="No se pudo validar la cuenta. Probá de nuevo."; return; }
  saveSession({token:resp.credential, email:p.email, name:p.name||p.email, picture:p.picture||"", exp:p.exp});
  onAuthenticated();
}
function requireLogin(){ $("#login-gate").hidden=false; $("#user-menu").hidden=true; initGoogle(); }
function onAuthenticated(){ $("#login-gate").hidden=true; renderUserChip(); }
function renderUserChip(){
  if(!loginRequired()||!session){ $("#user-menu").hidden=true; return; }
  $("#user-avatar").src = session.picture || "img/lechuga.png";
  $("#user-name").textContent = session.name || session.email;
  $("#user-menu").hidden=false;
}
function doLogout(){
  if(window.google && google.accounts && google.accounts.id) google.accounts.id.disableAutoSelect();
  saveSession(null); renderUserChip(); requireLogin();
}

/* ============================================================
   INICIO
   ============================================================ */
function init(){
  load();
  $("#tW").value=state.terreno.w; $("#tH").value=state.terreno.h;
  renderFilters(); renderSeasonFilter(); renderCatalog(); bind(); renderStage();
  if(loginRequired() && !sessionValid()) requireLogin();
  else renderUserChip();
}
document.addEventListener("DOMContentLoaded",init);
