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

/* ---------- mapeo de nombres de compañeras ---------- */
const NAME_MAP = { "poroto":"chaucha", "calabaza":"zapallo", "tagetes":"tagete", "copete":"tagete" };
function plantBaseName(x){ return (typeof x==="string"?x:x.nombre).toLowerCase().split(" (")[0].trim(); }
function findPlantByName(name){
  const n = name.toLowerCase().trim();
  if(NAME_MAP[n]) return byId[NAME_MAP[n]];
  return PLANTS.find(p=>{ const b=plantBaseName(p); return b===n || b.includes(n) || n.includes(b); }) || null;
}
function neighborRelation(idA, idB){   // 'bad' | 'good' | null
  if(idA===idB) return null;
  const A=byId[idA], B=byId[idB]; if(!A||!B) return null;
  const da=DET(idA), db=DET(idB), nA=plantBaseName(A), nB=plantBaseName(B);
  const inList=(list,name)=>(list||[]).some(x=>{const xl=x.toLowerCase().trim(); return xl===name||xl.includes(name)||name.includes(xl);});
  if(inList(da.compaNeg,nB) || inList(db.compaNeg,nA)) return "bad";
  if(inList(da.compaPos,nB) || inList(db.compaPos,nA)) return "good";
  return null;
}

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
function saveLocal(){ try{ localStorage.setItem("circuitoVerde", JSON.stringify(state)); }catch(e){} }
function save(){ saveLocal(); scheduleSync(); }
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

/* ---------- historial (deshacer) ---------- */
let undoStack = [];
function snapshot(){ return JSON.stringify({plants:state.plants, boards:state.boards, terreno:state.terreno, nextId:state.nextId}); }
function pushUndo(snap){ undoStack.push(snap||snapshot()); if(undoStack.length>50) undoStack.shift(); updateUndoBtn(); }
function undo(){
  if(!undoStack.length) return;
  const o = JSON.parse(undoStack.pop());
  state.plants=o.plants; state.boards=o.boards; state.terreno=o.terreno; state.nextId=o.nextId;
  $("#tW").value=state.terreno.w; $("#tH").value=state.terreno.h;
  selUids.clear(); save(); renderStage(); updateUndoBtn();
}
function updateUndoBtn(){ const b=$("#undoBtn"); if(b) b.disabled = undoStack.length===0; }

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
  refreshSel();
}

function plantEl(inst){
  const p = byId[inst.id]; if(!p) return document.createElement("div");
  const s = state.scale;
  const ringPx = (p.dist/100)*s;                 // diámetro real (distancia)
  const iconPx = Math.max(14, Math.min(ringPx, 72));  // el ícono nunca supera el círculo
  const showTag = iconPx >= 30;                  // ocultar nombre cuando es chico
  const el = document.createElement("div");
  el.className = "node plant-node"; el.dataset.uid = inst.uid;
  el.style.left = (inst.x*s)+"px"; el.style.top = (inst.y*s)+"px";
  el.innerHTML = `
    <div class="pring" style="width:${ringPx}px;height:${ringPx}px"></div>
    <div class="psvg" style="width:${iconPx}px;height:${iconPx}px">${artHTML(p)}</div>
    ${showTag?`<div class="tag">${p.nombre}</div>`:""}`;
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
      <button class="rot" title="Rotar 90°">⟳</button>
      <button class="del" title="Quitar bancal">✕</button>
      <button class="ana" title="Analizar bancal y rotación (INTA)">🔬</button>
      <span class="handle" title="Redimensionar"></span>
    </div>`;
  el.querySelector(".del").addEventListener("pointerdown",e=>{e.stopPropagation();});
  el.querySelector(".del").addEventListener("click",e=>{
    e.stopPropagation(); pushUndo(); state.boards = state.boards.filter(x=>x.uid!==b.uid); save(); renderStage();});
  el.querySelector(".rot").addEventListener("pointerdown",e=>{e.stopPropagation();});
  el.querySelector(".rot").addEventListener("click",e=>{ e.stopPropagation(); rotateBoard(b); });
  el.querySelector(".ana").addEventListener("pointerdown",e=>{e.stopPropagation();});
  el.querySelector(".ana").addEventListener("click",e=>{ e.stopPropagation(); openBoardAnalysis(b); });
  makeBoardDraggable(el, b);
  makeBoardResizable(el.querySelector(".handle"), el.querySelector(".board-rect"), b);
  return el;
}

/* ---------- selección múltiple (shift+click) ---------- */
function refreshSel(){
  stage.querySelectorAll(".node").forEach(n=>n.classList.toggle("sel", selUids.has(n.dataset.uid)));
  const d=$("#delSel"); if(d){ d.hidden = selUids.size===0; d.textContent = `🗑 Borrar selección (${selUids.size})`; }
}
function deleteSelection(){
  if(!selUids.size) return;
  pushUndo();
  state.plants=state.plants.filter(x=>!selUids.has(x.uid));
  state.boards=state.boards.filter(x=>!selUids.has(x.uid));
  selUids.clear(); save(); renderStage();
}
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
  let moved=false; const pre=snapshot();
  try{ el.setPointerCapture(e.pointerId); }catch(_){}
  const move=ev=>{
    moved=true;
    const dx=(ev.clientX-rect.left)/s-startMX, dy=(ev.clientY-rect.top)/s-startMY;
    items.forEach(it=>{
      let nx=snapVal(it.sx+dx), ny=snapVal(it.sy+dy);
      if(it.type==="plant"){ nx=clamp(nx,0,stageW()); ny=clamp(ny,0,stageH()); }
      else { nx=clamp(nx,0,stageW()-it.ref.L); ny=clamp(ny,0,stageH()-it.ref.W); }
      it.ref.x=nx; it.ref.y=ny; it.el.style.left=(nx*s)+"px"; it.el.style.top=(ny*s)+"px";
    });
    detectOverlaps();
  };
  const up=()=>{ try{ el.releasePointerCapture(e.pointerId); }catch(_){}
    document.removeEventListener("pointermove",move); document.removeEventListener("pointerup",up);
    if(moved){ pushUndo(pre); save(); renderStats(); } };
  document.addEventListener("pointermove",move); document.addEventListener("pointerup",up);
}
/* ---------- rotar bancal 90° CW (con las plantas de adentro) ---------- */
function rotateBoard(b){
  pushUndo();
  const oldL=b.L, oldW=b.W, cx=b.x+oldL/2, cy=b.y+oldW/2, e=0.001;
  // plantas dentro del bancal (centro contenido)
  const rel = state.plants
    .filter(pl=> pl.x>=b.x-e && pl.x<=b.x+oldL+e && pl.y>=b.y-e && pl.y<=b.y+oldW+e)
    .map(pl=>({pl, rx:pl.x-b.x, ry:pl.y-b.y}));
  // nuevas dimensiones (intercambia) y origen rotando alrededor del centro
  const newL=oldW, newW=oldL;
  const nbx=clamp(cx-newL/2, 0, Math.max(0,stageW()-newL));
  const nby=clamp(cy-newW/2, 0, Math.max(0,stageH()-newW));
  b.L=newL; b.W=newW; b.x=nbx; b.y=nby;
  // 90° horario: (rx,ry) -> (oldW-ry, rx)
  rel.forEach(({pl,rx,ry})=>{
    pl.x=clamp(nbx + (oldW-ry), 0, stageW());
    pl.y=clamp(nby + rx,        0, stageH());
  });
  save(); renderStage();
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
  el.addEventListener("dblclick", ()=>{ pushUndo(); state.plants=state.plants.filter(x=>x.uid!==inst.uid); selUids.delete(inst.uid); save(); renderStage(); });
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
    const s=state.scale; const startX=e.clientX, startY=e.clientY, L0=b.L, W0=b.W; const pre=snapshot();
    try{ handle.setPointerCapture(e.pointerId); }catch(_){}
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
    let didResize=false; const move0=move;
    const up=()=>{ try{ handle.releasePointerCapture(e.pointerId); }catch(_){}
      document.removeEventListener("pointermove",moveWrap); document.removeEventListener("pointerup",up);
      if(didResize) pushUndo(pre); save(); renderStats(); };
    const moveWrap=ev=>{ didResize=true; move0(ev); };
    document.addEventListener("pointermove",moveWrap); document.addEventListener("pointerup",up);
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
  detectNeighbors();
}

/* ---------- vecindad: buenas / malas compañeras cercanas ---------- */
function detectNeighbors(){
  const arr = state.plants.map(i=>({i, p:byId[i.id]})).filter(x=>x.p);
  const conflict = {}, good = {};
  for(let a=0;a<arr.length;a++) for(let b=a+1;b<arr.length;b++){
    const A=arr[a], B=arr[b];
    const d=Math.hypot(A.i.x-B.i.x, A.i.y-B.i.y);
    const rA=A.p.dist/200, rB=B.p.dist/200;        // radios en m
    if(d > rA+rB+0.5) continue;                    // no son vecinas cercanas
    const rel = neighborRelation(A.i.id, B.i.id);
    if(rel==="bad"){
      (conflict[A.i.uid]=conflict[A.i.uid]||[]).push(B.p.nombre);
      (conflict[B.i.uid]=conflict[B.i.uid]||[]).push(A.p.nombre);
    } else if(rel==="good"){ good[A.i.uid]=true; good[B.i.uid]=true; }
  }
  state._conflicts = conflict;
  stage.querySelectorAll(".plant-node").forEach(el=>{
    const c = conflict[el.dataset.uid];
    el.classList.toggle("badneighbor", !!c);
    el.classList.toggle("goodneighbor", !c && !!good[el.dataset.uid]);
    let badge = el.querySelector(".nbadge");
    if(c){
      if(!badge){ badge=document.createElement("div"); badge.className="nbadge"; el.appendChild(badge); }
      badge.textContent="⚠"; badge.title="Mala compañera cerca: "+[...new Set(c)].join(", ");
    } else if(badge){ badge.remove(); }
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
  const nConf = Object.keys(state._conflicts||{}).length;
  const cr=$("#stConflictRow"); if(cr){ cr.hidden = nConf===0; $("#stConflict").textContent = nConf; }
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
      let x=clamp(snapVal((ev.clientX-sr.left)/s),0,stageW()), y=clamp(snapVal((ev.clientY-sr.top)/s),0,stageH());
      pushUndo();
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
  const pills=(arr)=> (arr&&arr.length)?arr.map(x=>{
      const m=findPlantByName(x);
      return m ? `<button class="pill goto" data-goto="${m.id}">${x}</button>` : `<span class="pill">${x}</span>`;
    }).join("")
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
      ${cell("🌾 Forma de siembra (INTA)", d.formaSiembra ? `${d.formaSiembra}${d.entreLineasCm?` · marco ${p.dist}×${d.entreLineasCm} cm`:""}` : "")}
      ${cell("📅 Época de siembra", p.siembra)}
      ${cell("📏 Distancia entre plantas", p.dist+" cm")}
      ${cell("❄️ Tolerancia a heladas", d.heladas)}
      ${cell("⏱️ Días a cosecha", d.diasCosecha?("~"+d.diasCosecha+" días"):"")}
      ${cell("📐 Altura aprox.", d.alturaCm?(d.alturaCm+" cm"):"")}
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
  // modal: mes del calendario, optimizador y compañera/planta clickeable
  $("#modalBody").addEventListener("click",e=>{
    const m=e.target.closest("[data-m]"); if(m){ calMonth=+m.dataset.m; renderCalendar(); return; }
    const fa=e.target.closest("#optFillAsoc"); if(fa && optBoard){ fillAssoc(optBoard, fa.dataset.a, fa.dataset.b); return; }
    const f=e.target.closest("#optFill,#optFillT"); if(f && optBoard){ fillBoard(optBoard, f.dataset.id, f.dataset.mode); return; }
    const g=e.target.closest("[data-goto]"); if(g) openInfo(g.dataset.goto);
  });
  $("#modalBody").addEventListener("change",e=>{
    if(e.target.id==="optPlant" && optBoard){ $("#optResult").innerHTML = renderOptResult(optBoard, e.target.value); }
  });
  // arrastrar del catálogo (mouse) / tocar para colocar (touch)
  $("#catalog").addEventListener("pointerdown",e=>{
    if(e.target.closest(".info-btn")) return;
    const card=e.target.closest(".plant"); if(!card) return;
    if(e.pointerType==="touch"){
      // en touch: tap = colocar (permitimos scroll del listado si arrastra el dedo)
      const sx=e.clientX, sy=e.clientY, id=card.dataset.id;
      const up=ev=>{ document.removeEventListener("pointerup",up);
        if(Math.hypot(ev.clientX-sx, ev.clientY-sy) < 12) placeAtVisibleCenter(id); };
      document.addEventListener("pointerup",up);
      return;
    }
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
    pushUndo();
    state.boards.push({uid:"b"+(state.nextId++), x:MARGIN+0.3, y:MARGIN+0.3, L:+L, W:+W});
    save(); renderStage();
  });
  // terreno
  $("#setTerreno").addEventListener("click",()=>{
    pushUndo();
    state.terreno.w=Math.max(2,+$("#tW").value||12); state.terreno.h=Math.max(2,+$("#tH").value||8);
    save(); renderStage();
  });
  // deshacer y borrar selección
  $("#undoBtn").addEventListener("click",undo);
  $("#delSel").addEventListener("click",deleteSelection);
  // catálogo colapsable
  $("#catToggle").addEventListener("click",toggleCatalog);
  const cb=$("#catBackdrop"); if(cb) cb.addEventListener("click",closeCatalog);
  const cc=$("#catClose"); if(cc) cc.addEventListener("click",closeCatalog);
  // aviso de orientación
  const rd=$("#rotDismiss"); if(rd) rd.addEventListener("click",()=>$("#rotate-hint").classList.add("dismissed"));
  // vaciar
  $("#clearBtn").addEventListener("click",()=>{
    if(confirm("¿Vaciar todo el diseño? Esto borra plantas y tablones.")){
      pushUndo(); state.plants=[]; state.boards=[]; selUids.clear(); save(); renderStage();
    }
  });
  // exportar / análisis / calendario
  $("#exportBtn").addEventListener("click",exportDesign);
  $("#pngBtn").addEventListener("click",downloadPNG);
  $("#printBtn").addEventListener("click",printDesign);
  $("#analysisBtn").addEventListener("click",openAnalysis);
  $("#calBtn").addEventListener("click",openCalendar);
  // snap
  $("#snapChk").addEventListener("change",e=>{ snapOn=e.target.checked; });
  // proyectos
  $("#projSave").addEventListener("click",saveProject);
  $("#projNew").addEventListener("click",newProject);
  $("#projImport").addEventListener("click",()=>$("#projFile").click());
  $("#projFile").addEventListener("change",e=>{ if(e.target.files[0]) importJSON(e.target.files[0]); e.target.value=""; });
  $("#projSelect").addEventListener("change",e=>{ const n=e.target.value; if(n) loadProject(n); else setCurProj(""); });
  // logout
  $("#btn-logout").addEventListener("click",doLogout);
  // plegar resumen
  $("#statsToggle").addEventListener("click",()=>$("#stats").classList.toggle("collapsed"));
  // tutorial
  $("#btnTutorial").addEventListener("click",openTutorial);
  $("#tutClose").addEventListener("click",closeTutorial);
  $("#tutSkip").addEventListener("click",closeTutorial);
  $("#tutNext").addEventListener("click",tutNext);
  $("#tutPrev").addEventListener("click",tutPrev);
  $("#tutorial").addEventListener("click",e=>{ if(e.target.id==="tutorial") closeTutorial(); });
  // ---------- atajos de teclado ----------
  document.addEventListener("keydown",e=>{
    if(e.key==="Escape"){ closeInfo(); if(!$("#tutorial").hidden) closeTutorial(); return; }
    const t=document.activeElement, typing = t && /INPUT|TEXTAREA|SELECT/.test(t.tagName);
    if(typing) return;
    if(!$("#modal").hidden) return;                 // no interferir con un modal abierto
    const cmd = e.ctrlKey || e.metaKey;
    const k = e.key.toLowerCase();
    if((e.key==="Delete"||e.key==="Backspace") && selUids.size){ e.preventDefault(); deleteSelection(); return; }
    if(cmd && k==="z"){ e.preventDefault(); undo(); return; }
    if(cmd && k==="d" && selUids.size){ e.preventDefault(); duplicateSelection(); return; }
    if(cmd && k==="c"){ e.preventDefault(); copySelection(); return; }
    if(cmd && k==="x"){ e.preventDefault(); copySelection(); deleteSelection(); return; }
    if(cmd && k==="v"){ e.preventDefault(); pasteClipboard(); return; }
    if(cmd && k==="a"){ e.preventDefault(); selectAll(); return; }
    if(cmd && k==="s"){ e.preventDefault(); saveProject(); return; }
    if(e.key.startsWith("Arrow") && selUids.size){
      e.preventDefault();
      const step = snapOn ? SNAP : 0.1;
      nudge((e.key==="ArrowLeft"?-step:e.key==="ArrowRight"?step:0),
            (e.key==="ArrowUp"?-step:e.key==="ArrowDown"?step:0));
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
   HERRAMIENTAS: snap, duplicar, proyectos, PNG, imprimir, análisis, calendario
   ============================================================ */
function showModal(html){ $("#modalBody").innerHTML = html; $("#modal").hidden = false; }

/* ---- snap a la grilla ---- */
let snapOn = false;
const SNAP = 0.25; // m
const snapVal = v => snapOn ? Math.round(v/SNAP)*SNAP : v;

/* ---- duplicar selección ---- */
function duplicateSelection(){
  if(!selUids.size) return;
  pushUndo();
  const news=[];
  [...selUids].forEach(uid=>{
    const it=findItem(uid); if(!it) return;
    const c=Object.assign({}, it.ref);
    c.uid=(it.type==="plant"?"p":"b")+(state.nextId++); c.x=clamp(it.ref.x+0.3,0,stageW()); c.y=clamp(it.ref.y+0.3,0,stageH());
    if(it.type==="plant") state.plants.push(c); else state.boards.push(c);
    news.push(c.uid);
  });
  setSelection(news); save(); renderStage();
}

/* ---- copiar / cortar / pegar / seleccionar todo / mover ---- */
let clipboard=[], lastNudge=0;
function copySelection(){
  clipboard = [...selUids].map(uid=>{ const it=findItem(uid); return it?{type:it.type, data:Object.assign({},it.ref)}:null; }).filter(Boolean);
}
function pasteClipboard(){
  if(!clipboard.length) return;
  pushUndo(); const news=[];
  clipboard.forEach(c=>{
    const o=Object.assign({},c.data);
    o.uid=(c.type==="plant"?"p":"b")+(state.nextId++);
    o.x=clamp((o.x||0)+0.4,0,stageW()); o.y=clamp((o.y||0)+0.4,0,stageH());
    if(c.type==="plant") state.plants.push(o); else state.boards.push(o);
    news.push(o.uid);
  });
  setSelection(news); save(); renderStage();
}
function selectAll(){ setSelection([...state.plants.map(p=>p.uid), ...state.boards.map(b=>b.uid)]); }
function nudge(dx,dy){
  if(!selUids.size || (!dx && !dy)) return;
  const now=Date.now(); if(now-lastNudge>500) pushUndo(); lastNudge=now;
  [...selUids].forEach(uid=>{ const it=findItem(uid); if(!it) return;
    const maxX=stageW()-(it.type==="board"?it.ref.L:0), maxY=stageH()-(it.type==="board"?it.ref.W:0);
    it.ref.x=clamp(+(it.ref.x+dx).toFixed(3),0,maxX); it.ref.y=clamp(+(it.ref.y+dy).toFixed(3),0,maxY);
  });
  save(); renderStage();
}
/* colocar en el centro visible (tap-to-place en mobile) */
function placeAtVisibleCenter(id){
  const s=state.scale;
  const cx=(stageWrap.scrollLeft + Math.min(stageWrap.clientWidth, stage.offsetWidth)/2)/s;
  const cy=(stageWrap.scrollTop  + Math.min(stageWrap.clientHeight, stage.offsetHeight)/2)/s;
  pushUndo();
  state.plants.push({uid:"p"+(state.nextId++), id, x:clamp(snapVal(cx),0,stageW()), y:clamp(snapVal(cy),0,stageH())});
  save(); renderStage();
  if(window.innerWidth<880) closeCatalog();
}

/* ---- proyectos guardados ---- */
const PROJ_KEY="circuitoVerde.projects", CUR_KEY="circuitoVerde.current";
function getProjects(){ try{ return JSON.parse(localStorage.getItem(PROJ_KEY))||{}; }catch(e){ return {}; } }
function setProjects(o){ try{ localStorage.setItem(PROJ_KEY, JSON.stringify(o)); }catch(e){} }
function curProj(){ try{ return localStorage.getItem(CUR_KEY)||""; }catch(e){ return ""; } }
function setCurProj(n){ try{ n?localStorage.setItem(CUR_KEY,n):localStorage.removeItem(CUR_KEY); }catch(e){} }
function renderProjSelect(){
  const sel=$("#projSelect"); if(!sel) return;
  const ps=getProjects(), cur=curProj();
  sel.innerHTML = `<option value="">— sin guardar —</option>` +
    Object.keys(ps).sort().map(n=>`<option value="${n}" ${n===cur?"selected":""}>${n}</option>`).join("");
}
function saveProject(){
  const name=(prompt("Nombre del proyecto:", curProj()||"Mi huerta")||"").trim();
  if(!name) return;
  const ps=getProjects(); ps[name]=snapshot(); setProjects(ps); setCurProj(name); renderProjSelect();
  alert(`Proyecto "${name}" guardado.`);
}
function loadProject(name){
  const ps=getProjects(); if(!ps[name]) return;
  pushUndo();
  const o=JSON.parse(ps[name]);
  state.plants=o.plants||[]; state.boards=o.boards||[]; state.terreno=o.terreno||state.terreno; state.nextId=o.nextId||1;
  setCurProj(name); $("#tW").value=state.terreno.w; $("#tH").value=state.terreno.h;
  selUids.clear(); save(); renderStage();
}
function newProject(){
  if(!confirm("¿Empezar un diseño nuevo? (lo no guardado se pierde)")) return;
  pushUndo(); state.plants=[]; state.boards=[]; selUids.clear(); setCurProj(""); renderProjSelect(); save(); renderStage();
}
function importJSON(file){
  const r=new FileReader();
  r.onload=()=>{ try{
    const d=JSON.parse(r.result); const o=d.layout||d;
    if(!o || !Array.isArray(o.plants)) throw 0;
    pushUndo();
    state.plants=o.plants; state.boards=o.boards||[]; state.terreno=o.terreno||state.terreno;
    state.scale=o.scale||state.scale; state.nextId=o.nextId||1000;
    $("#tW").value=state.terreno.w; $("#tH").value=state.terreno.h; selUids.clear(); save(); renderStage();
    alert("Diseño importado.");
  }catch(e){ alert("No pude leer ese archivo. Tiene que ser un JSON exportado por Circuito Verde."); } };
  r.readAsText(file);
}

/* ---- exportar PNG del plano ---- */
function exportPNG(){
  const s=state.scale, W=stageW()*s, H=stageH()*s;
  const c=document.createElement("canvas"); c.width=W; c.height=H;
  const ctx=c.getContext("2d");
  const mx=MARGIN*s, my=MARGIN*s, tw=state.terreno.w*s, th=state.terreno.h*s;
  ctx.fillStyle="#eef0e6"; ctx.fillRect(0,0,W,H);
  ctx.fillStyle="#fcfdf8"; ctx.fillRect(mx,my,tw,th);
  ctx.strokeStyle="rgba(63,125,78,.22)"; ctx.lineWidth=1;
  for(let m=0;m<=state.terreno.w;m++){const x=mx+m*s;ctx.beginPath();ctx.moveTo(x,my);ctx.lineTo(x,my+th);ctx.stroke();}
  for(let m=0;m<=state.terreno.h;m++){const y=my+m*s;ctx.beginPath();ctx.moveTo(mx,y);ctx.lineTo(mx+tw,y);ctx.stroke();}
  ctx.setLineDash([9,5]); ctx.strokeStyle="#2c5a39"; ctx.lineWidth=2.5; ctx.strokeRect(mx,my,tw,th); ctx.setLineDash([]);
  ctx.fillStyle="#2c5a39"; ctx.font="bold 13px Segoe UI";
  ctx.fillText(`Terreno ${state.terreno.w} × ${state.terreno.h} m`, mx+6, my-7>12?my-7:my+16);
  state.boards.forEach(b=>{
    const x=b.x*s,y=b.y*s,bw=b.L*s,bh=b.W*s, t=Math.max(7,Math.min(s*0.13,Math.min(bw,bh)/2-3));
    ctx.fillStyle="#b5824e"; ctx.fillRect(x,y,bw,bh);
    ctx.fillStyle="#ffffff"; ctx.fillRect(x+t,y+t,Math.max(0,bw-2*t),Math.max(0,bh-2*t));
    ctx.strokeStyle="#6e4a25"; ctx.lineWidth=2; ctx.strokeRect(x,y,bw,bh);
    ctx.fillStyle="#fff"; ctx.font="bold 11px Segoe UI"; ctx.textAlign="center";
    ctx.fillText(b.L.toFixed(1)+" m", x+bw/2, y+13); ctx.textAlign="left";
  });
  state.plants.forEach(inst=>{
    const p=byId[inst.id]; if(!p) return;
    const cx=inst.x*s, cy=inst.y*s, r=(p.dist/200)*s;
    ctx.setLineDash([5,4]); ctx.strokeStyle="rgba(63,125,78,.8)"; ctx.lineWidth=1.4;
    ctx.beginPath(); ctx.arc(cx,cy,Math.max(6,r),0,2*Math.PI); ctx.stroke(); ctx.setLineDash([]);
    const node=stage.querySelector(`.node[data-uid="${inst.uid}"]`), img=node&&node.querySelector("img.art-img");
    const isz=Math.max(22,Math.min(r*1.3,58));
    if(img && img.complete && img.naturalWidth){ try{ ctx.drawImage(img,cx-isz/2,cy-isz/2,isz,isz); }catch(e){} }
    else { ctx.fillStyle=p.color; ctx.beginPath(); ctx.arc(cx,cy,isz/2,0,2*Math.PI); ctx.fill(); }
    ctx.fillStyle="#2c5a39"; ctx.font="600 10px Segoe UI"; ctx.textAlign="center";
    ctx.fillText(p.nombre, cx, cy+isz/2+11); ctx.textAlign="left";
  });
  return c;
}
function downloadPNG(){
  try{
    const url=exportPNG().toDataURL("image/png");
    const a=document.createElement("a"); a.href=url; a.download="circuito-verde-plano.png"; a.click();
  }catch(e){ alert("No pude generar el PNG (puede pasar al abrir el archivo localmente). Probá la versión online."); }
}
function printDesign(){
  let url=null; try{ url=exportPNG().toDataURL("image/png"); }catch(e){}
  const w=window.open("","_blank"); if(!w){ alert("Permití las ventanas emergentes para imprimir."); return; }
  const counts={}; state.plants.forEach(i=>counts[i.id]=(counts[i.id]||0)+1);
  const rows=Object.keys(counts).sort().map(id=>`<tr><td>${byId[id]?byId[id].nombre:id}</td><td>${counts[id]}</td><td>${byId[id]?byId[id].dist:""} cm</td><td>${DET(id).metodo||""}</td></tr>`).join("");
  w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Circuito Verde — diseño</title>
    <style>body{font-family:Segoe UI,system-ui,sans-serif;padding:22px;color:#34433a}h1{color:#2c5a39;margin:0 0 4px}
    img{max-width:100%;border:1px solid #d9d2bf;border-radius:10px;margin-top:10px}
    table{border-collapse:collapse;margin-top:16px;width:100%}td,th{border:1px solid #ddd;padding:5px 10px;font-size:13px;text-align:left}
    th{background:#e8efe3;color:#2c5a39}</style></head>
    <body><h1>🌱 Circuito Verde</h1>
    <p>Terreno ${state.terreno.w}×${state.terreno.h} m · ${state.plants.length} plantas · ${Object.keys(counts).length} especies · ${state.boards.length} bancales</p>
    ${url?`<img src="${url}"/>`:"<p>(no se pudo generar la imagen del plano)</p>"}
    <h3>Plantas</h3><table><tr><th>Planta</th><th>Cant.</th><th>Distancia</th><th>Método</th></tr>${rows}</table></body></html>`);
  w.document.close(); setTimeout(()=>{ try{ w.focus(); w.print(); }catch(e){} }, 500);
}

/* ---- análisis agronómico + lista de compra ---- */
function openAnalysis(){
  const counts={}; state.plants.forEach(i=>counts[i.id]=(counts[i.id]||0)+1);
  const total=state.plants.length;
  if(!total){ showModal(`<div style="padding:26px;text-align:center"><div style="font-size:40px">📊</div><h3>Análisis del diseño</h3><p style="color:var(--ink-soft)">Agregá plantas al lienzo para ver el análisis.</p></div>`); return; }
  const fam={}; state.plants.forEach(i=>{const g=byId[i.id].grupo; fam[g]=(fam[g]||0)+1;});
  const fx={comestible:0,repele:0,poliniza:0,benefico:0,nitrogeno:0,cobertura:0};
  state.plants.forEach(i=>byId[i.id].funciones.forEach(f=>{ if(f in fx) fx[f]++; }));
  const famRows=Object.entries(fam).sort((a,b)=>b[1]-a[1]).map(([g,n])=>{
    const pct=Math.round(n/total*100);
    return `<div class="abar"><span>${g}</span><div class="atrack"><div style="width:${pct}%"></div></div><b>${pct}%</b></div>`;}).join("");
  const monoFam=Object.entries(fam).find(([g,n])=>n/total>0.5);
  const conf=Object.keys(state._conflicts||{}).length;
  const shop=Object.keys(counts).sort((a,b)=>counts[b]-counts[a]).map(id=>
    `<tr><td>${byId[id].nombre}</td><td style="text-align:center">${counts[id]}</td><td>${DET(id).metodo||"—"}</td></tr>`).join("");
  showModal(`
    <div class="m-head"><div><h3>📊 Análisis del diseño</h3>
      <div class="m-sci">${total} plantas · ${Object.keys(counts).length} especies · ${state.boards.length} bancales</div></div></div>
    <div style="padding:14px 18px">
      ${monoFam?`<div class="warn-box">⚠️ Predominio de <b>${monoFam[0]}</b> (${Math.round(monoFam[1]/total*100)}%). Diversificá familias para reducir plagas y agotamiento del suelo.</div>`:`<div class="ok-box">✅ Buena diversidad de familias botánicas.</div>`}
      ${conf?`<div class="warn-box">⚠️ ${conf} planta(s) con malas vecinas cerca. Revisá los ⚠ en el lienzo.</div>`:""}
      <h5 class="asec">Distribución por familia</h5>${famRows}
      <h5 class="asec">Funciones ecológicas</h5>
      <div class="afx">
        <span>🥬 ${fx.comestible} comestibles</span><span>🐝 ${fx.poliniza} polinizadoras</span>
        <span>🛡️ ${fx.repele} repelentes</span><span>🐞 ${fx.benefico} benéficas</span>
        <span>⚡ ${fx.nitrogeno} fijan N</span><span>🌾 ${fx.cobertura} cobertura</span>
      </div>
      <h5 class="asec">🛒 Lista de compra (plantines / semillas)</h5>
      <table class="atable"><tr><th>Planta</th><th>Cant.</th><th>Cómo</th></tr>${shop}</table>
    </div>`);
}

/* ---- rotación de cultivos por bancal (criterio INTA) ---- */
const ROT_INTA = {
  // Secuencia por nivel de exigencia (INTA/ProHuerta): exigente → medianamente exigente → poco exigente → reponedora
  seq: ["fruto","hoja","raiz","leguminosa"],
  label: { fruto:"Fruto (las más exigentes — fósforo)", hoja:"Hoja (exigentes en nitrógeno)",
    raiz:"Raíz y bulbo (poco exigentes — potasio)", leguminosa:"Leguminosas (reponedoras — fijan nitrógeno)",
    cobertura:"Abono verde / cobertura", otra:"Aromáticas y flores" },
  next: { fruto:"hoja", hoja:"raiz", raiz:"leguminosa", leguminosa:"fruto" },
  ejemplos: { fruto:"tomate, pimiento, zapallo, pepino, maíz", hoja:"lechuga, acelga, espinaca, repollo, brócoli",
    raiz:"zanahoria, remolacha, cebolla, ajo, papa", leguminosa:"arveja, haba, poroto/chaucha, trébol, vicia" },
  anios: "3 a 4",
  reglas: [
    "Rotar el cultivo de cantero en cantero año tras año, alternando familia botánica y parte cosechada (hoja, fruto, raíz). — INTA",
    "No repetir la misma hortaliza ni familia en el mismo lugar; una rotación de 3 a 4 años es adecuada. — ProHuerta",
    "Alternar exigentes (fruto) → medianamente exigentes (hoja) → poco exigentes (raíz) → reponedoras (leguminosas/abonos verdes). — INTA",
    "Las de hoja consumen sobre todo nitrógeno; las de fruto, fósforo; las de raíz, potasio (y a distintas profundidades). — INTA",
    "Rotar corta los ciclos de plagas y enfermedades del suelo. — INTA, Manual de la huerta agroecológica"
  ],
  fuentes: [
    "https://inta.gob.ar/documentos/rotacion-de-cultivos-en-el-huerto",
    "https://www.argentina.gob.ar/sites/default/files/2023/08/inta_-_manual_de_la_huerta_agroecologica.pdf",
    "https://procadisaplicativos.inta.gob.ar/cursosautoaprendizaje/huertaorganica/l4_p7.html"
  ]
};
function rotGroup(p){
  if(p.grupo==="Leguminosas") return "leguminosa";
  if(p.grupo==="Brássicas") return "hoja";                  // brássicas: exigentes tipo hoja
  const c=p.categoria;
  if(c==="Hortaliza de hoja") return "hoja";
  if(c==="Hortaliza de raíz"||c==="Hortaliza de bulbo") return "raiz";
  if(c==="Hortaliza de fruto"||c==="Frutal menor") return "fruto";
  if(c==="Abono verde/Cobertura") return p.funciones.includes("nitrogeno")?"leguminosa":"cobertura";
  return "otra";                                            // aromáticas, flores
}
function plantsInBoard(b){
  return state.plants.filter(pl=> pl.x>=b.x-0.01 && pl.x<=b.x+b.L+0.01 && pl.y>=b.y-0.01 && pl.y<=b.y+b.W+0.01);
}
function openBoardAnalysis(b){
  const inside=plantsInBoard(b);
  if(!inside.length){
    showModal(`<div style="padding:26px;text-align:center"><div style="font-size:42px">🔬</div>
      <h3>Bancal vacío</h3><p style="color:var(--ink-soft)">Poné plantas dentro de este bancal (${b.L.toFixed(1)}×${b.W.toFixed(1)} m) y volvé a analizarlo.</p></div>`);
    return;
  }
  optBoard=b;
  const famCount={}, grpCount={}, counts={};
  inside.forEach(pl=>{ const p=byId[pl.id]; if(!p) return;
    counts[pl.id]=(counts[pl.id]||0)+1; famCount[p.grupo]=(famCount[p.grupo]||0)+1;
    const g=rotGroup(p); grpCount[g]=(grpCount[g]||0)+1; });
  const hasLeg = (grpCount.leguminosa||0)>0;
  const demandOrder=["hoja","fruto","raiz","leguminosa"];
  let dom=null,domN=0; demandOrder.forEach(g=>{ if((grpCount[g]||0)>domN){ domN=grpCount[g]; dom=g; } });
  const familias=Object.keys(famCount);
  const famRepetidas=Object.entries(famCount).filter(([f,n])=>n>=2).map(([f])=>f);
  const plantList=Object.keys(counts).map(id=>`<span class="pill">${byId[id].nombre} ×${counts[id]}`+`</span>`).join("");
  const famList=Object.entries(famCount).sort((a,b)=>b[1]-a[1]).map(([f,n])=>`<span class="pill">${f} (${n})</span>`).join("");
  let reco="";
  if(dom){
    const ng=ROT_INTA.next[dom];
    reco = `<div class="ok-box"><b>Próxima temporada:</b> este bancal fue de <b>${ROT_INTA.label[dom].toLowerCase()}</b>. Según la rotación INTA, seguí con <b>${ROT_INTA.label[ng].toLowerCase()}</b> — ej.: ${ROT_INTA.ejemplos[ng]}.</div>`;
    reco += hasLeg
      ? `<div class="ok-box">✅ Hay leguminosas que aportan nitrógeno: el suelo queda en buenas condiciones para el próximo ciclo.</div>`
      : `<div class="warn-box">🌱 No hay leguminosas. Antes del próximo cultivo exigente, sembrá una <b>leguminosa o abono verde</b> (arveja, haba, trébol, vicia) para reponer nitrógeno.</div>`;
  }
  if(famRepetidas.length){
    reco += `<div class="warn-box">⚠️ Familia(s) con varias plantas: <b>${famRepetidas.join(", ")}</b>. No vuelvas a plantar esa familia acá por unos ${ROT_INTA.anios} años (evita plagas y enfermedades del suelo).</div>`;
  }
  const ciclo = ROT_INTA.seq.map(g=>`${g===dom?"<b>":""}${ROT_INTA.label[g].split(" (")[0]}${g===dom?" ⬅ ahora</b>":""}`).join(" → ");
  const fuentesHtml = ROT_INTA.fuentes.length
    ? `<div class="m-foot">Rotación según criterio INTA / ProHuerta. Fuentes: ${ROT_INTA.fuentes.map((u,i)=>`<a href="${u}" target="_blank" rel="noopener">[${i+1}]</a>`).join(" ")}</div>`
    : `<div class="m-foot">Rotación según criterio agroecológico de INTA / ProHuerta. Orientativo: verificá la cartilla de tu zona.</div>`;
  showModal(`
    <div class="m-head"><div><h3>🔬 Análisis del bancal · rotación INTA</h3>
      <div class="m-sci">${b.L.toFixed(1)} × ${b.W.toFixed(1)} m · ${inside.length} plantas</div></div></div>
    <div style="padding:12px 18px">
      <h5 class="asec">Plantas en el bancal</h5><div class="cal-list">${plantList}</div>
      <h5 class="asec">Familias presentes</h5><div class="cal-list">${famList}</div>
      <h5 class="asec">Ciclo de rotación (INTA)</h5>
      <div style="font-size:12.5px;color:var(--ink);background:var(--bg);border:1px solid var(--line);border-radius:9px;padding:9px 11px">${ciclo}</div>
      <h5 class="asec">Recomendación</h5>${reco}
      ${optimizerSection(b, Object.keys(counts).sort((a,b)=>counts[b]-counts[a])[0])}
      <details style="margin-top:8px"><summary style="cursor:pointer;font-size:12px;color:var(--green-dark);font-weight:600">¿Por qué rotar? (INTA)</summary>
        <ul style="font-size:12.5px;color:var(--ink);margin:8px 0 0;padding-left:18px;line-height:1.5">${ROT_INTA.reglas.map(r=>`<li>${r}</li>`).join("")}</ul></details>
    </div>
    ${fuentesHtml}`);
}

/* ============================================================
   OPTIMIZADOR DE SIEMBRA (marco real vs tresbolillo) — por bancal
   ============================================================ */
let optBoard=null;
const SQRT3_2 = Math.sqrt(3)/2;
/* posiciones (centros, relativas al bancal) para una disposición dada */
function packPositions(L,W,dPlant,dRow,mode){
  const pos=[]; if(dPlant<=0) return pos;
  const hp=dPlant/2;
  if(mode==="tres"){
    const rs=dPlant*SQRT3_2;                       // separación entre hileras (equilátero)
    if(W<dPlant || L<dPlant){ if(L>=hp&&W>=hp) pos.push({x:L/2,y:W/2}); return pos; }
    const nrows=Math.floor((W-dPlant)/rs)+1;
    for(let r=0;r<nrows;r++){
      const y=hp+r*rs, off=(r%2)?hp:0;
      const ncols=Math.floor((L-dPlant-off)/dPlant)+1;
      for(let c=0;c<ncols;c++){ const x=hp+off+c*dPlant; if(x<=L-hp+1e-6) pos.push({x,y}); }
    }
  } else {                                          // marco real / en línea (rectangular)
    const dr=dRow||dPlant, hr=dr/2;
    if(W<dr || L<dPlant){ if(L>=hp&&W>=hr) pos.push({x:L/2,y:W/2}); return pos; }
    const ncols=Math.floor((L-dPlant)/dPlant)+1, nrows=Math.floor((W-dr)/dr)+1;
    for(let r=0;r<nrows;r++) for(let c=0;c<ncols;c++) pos.push({x:hp+c*dPlant, y:hr+r*dr});
  }
  return pos;
}
function optPlantOptions(selId){
  return PLANTS.slice().sort((a,b)=>a.nombre.localeCompare(b.nombre))
    .map(p=>`<option value="${p.id}" ${p.id===selId?"selected":""}>${p.nombre} (${p.dist} cm)</option>`).join("");
}
function optimizerSection(b, defId){
  return `<h5 class="asec">📐 Optimizar siembra (aprovechar el espacio)</h5>
    <div style="font-size:12.5px;margin-bottom:6px">Planta:
      <select id="optPlant" style="padding:4px 6px;border:1px solid var(--line);border-radius:7px;font-size:12.5px;max-width:200px">${optPlantOptions(defId)}</select></div>
    <div id="optResult">${renderOptResult(b, defId)}</div>`;
}
function renderOptResult(b, id){
  const p=byId[id]; if(!p) return "";
  const det=DET(id), d=p.dist/100;
  const el = det.entreLineasCm ? Math.max(det.entreLineasCm/100, d) : d;   // entre hileras (INTA) ≥ entre plantas
  const lineN=packPositions(b.L,b.W,d,el,"sq").length;
  const tresN=packPositions(b.L,b.W,d,d,"tres").length;
  const elCm=Math.round(el*100);
  const intaInfo = det.formaSiembra
    ? `<div style="font-size:12px;background:var(--green-soft);border:1px solid #cfe0c8;border-radius:9px;padding:7px 10px;margin-bottom:8px">
         <b>INTA</b> · Forma de siembra: <b>${det.formaSiembra}</b> · ${det.implanteInta||""} · marco ${p.dist} × ${elCm} cm (entre plantas × entre hileras)</div>`
    : `<div style="font-size:12px;color:var(--ink-soft);margin-bottom:8px">Distancia entre plantas: ${p.dist} cm (sin marco INTA tabulado para esta especie).</div>`;
  return `
    ${intaInfo}
    ${assocSection(b, id)}
    <div style="font-size:11px;font-weight:700;color:var(--ink-soft);text-transform:uppercase;letter-spacing:.4px;margin:4px 0 6px">O monocultivo (solo ${p.nombre})</div>
    <div class="opt-grid">
      <div class="opt-card on"><div class="opt-n">${lineN}</div><div class="opt-t">En línea (marco INTA) <span>INTA</span></div></div>
      <div class="opt-card"><div class="opt-n">${tresN}</div><div class="opt-t">Tresbolillo (denso) <span class="no">no INTA</span></div></div>
    </div>
    <div style="font-size:11.5px;color:var(--ink-soft);margin:6px 0 8px">El marco <b>en línea</b> respeta la distancia entre hileras de INTA. El <b>tresbolillo</b> (hileras alternadas) es criterio hortícola —no INTA— y densifica ~10-15% si el cultivo lo tolera.</div>
    <button class="btn" id="optFill" data-id="${id}" data-mode="linea">🌱 Ordenar ${lineN} × ${p.nombre} (marco INTA)</button>
    <button class="btn ghost" id="optFillT" data-id="${id}" data-mode="tres" style="margin-top:6px">…o ${tresN} en tresbolillo (denso · no INTA)</button>`;
}
function fillBoard(b, id, mode){
  const p=byId[id]; if(!p) return;
  const det=DET(id), d=p.dist/100;
  const el = det.entreLineasCm ? Math.max(det.entreLineasCm/100, d) : d;
  const pos=packPositions(b.L,b.W,d,(mode==="tres"?d:el),(mode==="tres"?"tres":"sq"));
  if(!pos.length){ alert("No entra ninguna planta de ese tamaño en este bancal."); return; }
  pushUndo();
  // quitar plantas que ya estaban dentro del bancal
  const insideUids=new Set(plantsInBoard(b).map(x=>x.uid));
  state.plants=state.plants.filter(x=>!insideUids.has(x.uid));
  // colocar en la disposición óptima
  pos.forEach(pt=>{ state.plants.push({uid:"p"+(state.nextId++), id, x:+(b.x+pt.x).toFixed(3), y:+(b.y+pt.y).toFixed(3)}); });
  save(); renderStage();
  openBoardAnalysis(b);   // refresca el panel con el nuevo conteo
}

/* ---- asociación de cultivos / policultivo (criterio INTA) ---- */
const FAST_LOW = ["rabanito","rucula","lechuga","espinaca","cilantro"];   // rápidas / bajas
const TALL_SLOW = ["maiz","puerro","tomate","repollo","zanahoria","brocoli","kale","cebolla"]; // altas / lentas
function isFastLow(id){ const d=DET(id); return (d.diasCosecha&&d.diasCosecha<=55)||(d.alturaCm&&d.alturaCm<=25); }
function isTallSlow(id){ const d=DET(id); return (d.alturaCm&&d.alturaCm>=60)||(d.diasCosecha&&d.diasCosecha>=85); }
function compatibleAssoc(aId,bId){
  if(aId===bId) return false;
  const A=byId[aId],B=byId[bId]; if(!A||!B) return false;
  if(A.grupo===B.grupo) return false;                       // distinta familia (INTA)
  const da=DET(aId),db=DET(bId), nA=plantBaseName(A), nB=plantBaseName(B);
  const inList=(l,n)=>(l||[]).some(x=>{const xl=x.toLowerCase().trim();return xl===n||xl.includes(n)||n.includes(xl);});
  return !(inList(da.compaNeg,nB)||inList(db.compaNeg,nA));  // sin antagonismo
}
function pickPartner(principalId, wantFastLow){
  const list = wantFastLow ? FAST_LOW : TALL_SLOW;
  const pos = (DET(principalId).compaPos||[]).map(x=>findPlantByName(x)).filter(Boolean).map(p=>p.id);
  const ordered = [...list.filter(id=>pos.includes(id)), ...list.filter(id=>!pos.includes(id))];
  for(const id of ordered) if(byId[id] && compatibleAssoc(principalId,id) && (wantFastLow?isFastLow(id):isTallSlow(id))) return id;
  for(const id of ordered) if(byId[id] && compatibleAssoc(principalId,id)) return id;
  return null;
}
function chooseAssoc(principalId){    // -> {A:alto/lento, B:bajo/rápido} o null
  let A,B;
  if(isFastLow(principalId) && !isTallSlow(principalId)){ B=principalId; A=pickPartner(principalId,false); }
  else { A=principalId; B=pickPartner(principalId,true); }
  if(!A||!B||A===B) return null;
  return {A,B};
}
function assocLayout(b, aId, bId){
  const A=byId[aId], B=byId[bId];
  const dA=A.dist/100, elA=DET(aId).entreLineasCm? Math.max(DET(aId).entreLineasCm/100,dA):dA;
  const dB=B.dist/100, hpA=dA/2, hpB=dB/2;
  const posA=[], posB=[];
  if(b.L<dA || b.W<elA){ if(b.L>=hpA&&b.W>=hpA) posA.push({x:b.L/2,y:b.W/2}); return {posA,posB}; }
  const ncolsA=Math.floor((b.L-dA)/dA)+1, nrowsA=Math.floor((b.W-elA)/elA)+1, ysA=[];
  for(let r=0;r<nrowsA;r++){ const y=elA/2+r*elA; ysA.push(y); for(let c=0;c<ncolsA;c++) posA.push({x:hpA+c*dA,y}); }
  if(ysA.length>=2 && elA>=dB){                               // B en hileras intermedias
    const ncolsB=Math.floor((b.L-dB)/dB)+1;
    for(let r=0;r<ysA.length-1;r++){ const y=ysA[r]+elA/2; for(let c=0;c<ncolsB;c++) posB.push({x:hpB+c*dB,y}); }
  } else if(dA>=dB*1.4){                                      // bancal angosto: intercalar en la misma hilera
    ysA.forEach(y=>{ for(let c=0;c<ncolsA-1;c++) posB.push({x:hpA+c*dA+dA/2,y}); });
  }
  return {posA,posB};
}
function chooseAssocLayout(b, principalId){
  const c=chooseAssoc(principalId); if(!c) return null;
  const {posA,posB}=assocLayout(b,c.A,c.B);
  return {A:c.A,B:c.B,posA,posB,countA:posA.length,countB:posB.length};
}
function fillAssoc(b, aId, bId){
  const {posA,posB}=assocLayout(b,aId,bId);
  if(!posA.length){ alert("No entra la asociación en este bancal."); return; }
  pushUndo();
  const insideUids=new Set(plantsInBoard(b).map(x=>x.uid));
  state.plants=state.plants.filter(x=>!insideUids.has(x.uid));
  posA.forEach(pt=>state.plants.push({uid:"p"+(state.nextId++), id:aId, x:+(b.x+pt.x).toFixed(3), y:+(b.y+pt.y).toFixed(3)}));
  posB.forEach(pt=>state.plants.push({uid:"p"+(state.nextId++), id:bId, x:+(b.x+pt.x).toFixed(3), y:+(b.y+pt.y).toFixed(3)}));
  save(); renderStage(); openBoardAnalysis(b);
}
function descPorte(id){ const d=DET(id),t=[]; if(d.alturaCm&&d.alturaCm>=60)t.push("alta"); else if(d.alturaCm&&d.alturaCm<=25)t.push("baja");
  if(d.diasCosecha&&d.diasCosecha>=85)t.push("lenta"); else if(d.diasCosecha&&d.diasCosecha<=55)t.push("rápida"); return t.join(" y ")||"de porte medio"; }
function assocSection(b, principalId){
  const plan=chooseAssocLayout(b, principalId);
  if(!plan){ return `<div class="assoc-box"><div class="assoc-h">🤝 Asociación de cultivos <span>INTA</span></div>
    <div class="assoc-txt">No encontré una buena pareja para <b>${byId[principalId].nombre}</b> en el catálogo (misma familia o antagonismo). Probá con otra planta.</div></div>`; }
  const {A,B,countA,countB}=plan;
  const total=countA+countB;
  const note = countB===0
    ? `<div class="warn-box" style="margin:6px 0 0">El bancal es angosto para intercalar la hilera de ${byId[B].nombre}. Ensanchalo (o usalo como monocultivo abajo).</div>` : "";
  return `<div class="assoc-box">
    <div class="assoc-h">🤝 Asociación de cultivos <span>INTA · gran sugerencia</span></div>
    <div class="assoc-txt">Combiná <b>${byId[A].nombre}</b> (${descPorte(A)}) con <b>${byId[B].nombre}</b> (${descPorte(B)}): intercalás la rápida/baja entre las hileras de la alta/lenta — aprovechás el espacio, cosechás la rápida antes y al ser de distinta familia bajás las plagas. <i>(INTA: asociar distinto porte y velocidad)</i></div>
    <div class="opt-grid" style="margin-top:7px">
      <div class="opt-card on"><div class="opt-n">${countA}</div><div class="opt-t">${byId[A].nombre}</div></div>
      <div class="opt-card on"><div class="opt-n">${countB}</div><div class="opt-t">${byId[B].nombre}</div></div>
    </div>${note}
    <button class="btn" id="optFillAsoc" data-a="${A}" data-b="${B}" style="margin-top:7px" ${total?"":"disabled"}>🤝 Ordenar asociación (${countA} + ${countB})</button>
  </div>`;
}

/* ---- calendario de siembra ---- */
const MESES=["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
let calMonth = (new Date()).getMonth()+1;   // mes seleccionado (1-12)
function openCalendar(){ renderCalendar(); $("#modal").hidden=false; }
function renderCalendar(){
  const sembrar = PLANTS.filter(p=>(DET(p.id).siembraMeses||[]).includes(calMonth));
  const cosechar = PLANTS.filter(p=>(DET(p.id).cosechaMeses||[]).includes(calMonth));
  const chip=(p,arr)=>`<button class="cal-chip ${arr==='s'?'s':'c'}" data-goto="${p.id}">${p.nombre}</button>`;
  const monthBtns=MESES.map((m,i)=>`<button class="cal-m ${i+1===calMonth?'on':''}" data-m="${i+1}">${m}</button>`).join("");
  showModal(`
    <div class="m-head"><div><h3>📅 Calendario de siembra · Bariloche</h3>
      <div class="m-sci">Elegí el mes para ver qué conviene sembrar y cosechar.</div></div></div>
    <div style="padding:12px 18px">
      <div class="cal-months">${monthBtns}</div>
      <h5 class="asec">🌱 Sembrar / plantar en ${MESES[calMonth-1]} <span style="color:var(--ink-soft);font-weight:400">(${sembrar.length})</span></h5>
      <div class="cal-list">${sembrar.length?sembrar.map(p=>chip(p,'s')).join(""):'<span class="cal-empty">Nada típico este mes.</span>'}</div>
      <h5 class="asec">🧺 Cosechar en ${MESES[calMonth-1]} <span style="color:var(--ink-soft);font-weight:400">(${cosechar.length})</span></h5>
      <div class="cal-list">${cosechar.length?cosechar.map(p=>chip(p,'c')).join(""):'<span class="cal-empty">Nada típico este mes.</span>'}</div>
      <p style="font-size:11px;color:var(--ink-soft);margin-top:14px">Tocá una planta para ver su ficha. Cultivos de fruto (tomate, pimiento, etc.) asumen invernadero.</p>
    </div>`);
}

/* ============================================================
   TUTORIAL / ONBOARDING
   ============================================================ */
const TUT_KEY = "circuitoVerde.tutDone";
const TUTORIAL = [
  {art:"🌱", title:"¡Bienvenido a Circuito Verde!",
   text:"Planificá tu <b>huerta e invernadero</b> para el clima patagónico. Elegí plantas del catálogo y diseñá tus bancales arrastrándolas a un lienzo a escala real. Te muestro cómo en 1 minuto."},
  {art:"📚", title:"Catálogo y 3 listas",
   text:"A la izquierda tenés <b>61 plantas</b> de huerta patagónica (INTA Bariloche). Cambiá entre las 3 vistas: <b>Todas</b>, <b>por categoría</b> y <b>por nombre científico/grupo</b>. Arriba hay un <b>buscador</b>."},
  {art:"🎛️", title:"Filtros por función y temporada",
   text:"Filtrá por <b>función</b> (🥬 comestible, 🛡️ repele plagas, 🐝 polinizadores, 🐞 benéficos…) y por <b>temporada</b> (🌸☀️🍂❄️). Cada tarjeta muestra además el <b>método</b>: 🌱 siembra directa o 🪴 trasplante."},
  {art:"＋", title:"Botón “+ info”",
   text:"En cada planta tocá <b>＋ info</b> para ver su ficha: <b>emparejamiento positivo y negativo</b> (con qué se lleva bien o mal), riego, luz, fortalezas, debilidades, temporada y época de siembra."},
  {art:"🫳", title:"Arrastrá plantas al lienzo",
   text:"Llevá una planta del catálogo al lienzo. El <b>círculo punteado</b> es la distancia real que necesita entre planta y planta. Si dos quedan <b>demasiado juntas</b>, sus círculos se marcan en <b>rojo</b>."},
  {art:"🟫", title:"Bancales (tablones)",
   text:"Elegí <b>largo y ancho</b> (ej. 2×1 m) y tocá <b>+ Tablón</b>. Es un cuadrilátero con borde de madera y <b>relleno blanco</b> para ver bien las plantas. Movelo y redimensionalo desde la esquina ⬛."},
  {art:"🗺️", title:"Tu terreno con margen",
   text:"El recuadro punteado verde es tu <b>terreno</b> (cambiá las medidas y tocá <b>Aplicar</b>). Alrededor hay un <b>margen</b> para acomodar plantas y jugar con la zona antes de meterlas al cantero."},
  {art:"⌨️", title:"Selección y atajos",
   text:"<kbd>Shift</kbd>+clic selecciona <b>varias</b>; <kbd>Ctrl</kbd>+<kbd>A</kbd> todas. Copiá/pegá con <kbd>Ctrl</kbd>+<kbd>C</kbd>/<kbd>V</kbd>, cortá con <kbd>Ctrl</kbd>+<kbd>X</kbd>, duplicá con <kbd>Ctrl</kbd>+<kbd>D</kbd>, movés con las <b>flechas</b>, deshacés con <kbd>Ctrl</kbd>+<kbd>Z</kbd> y guardás con <kbd>Ctrl</kbd>+<kbd>S</kbd>. <kbd>Ctrl</kbd>+rueda = zoom. En celular: <b>tocá</b> una planta para colocarla."},
  {art:"💾", title:"Se guarda solo · Exportar",
   text:"Tu diseño se <b>guarda automáticamente</b> en este navegador. <b>Exportar</b> baja un JSON con plantas, cantidades y bancales. <b>Vaciar</b> limpia todo. ¡A diseñar tu huerta! 🌻"},
];
let tutStep = 0;
function renderTut(){
  const s = TUTORIAL[tutStep];
  $("#tutArt").textContent = s.art; $("#tutTitle").textContent = s.title; $("#tutText").innerHTML = s.text;
  $("#tutDots").innerHTML = TUTORIAL.map((_,i)=>`<span class="${i===tutStep?"on":""}"></span>`).join("");
  $("#tutPrev").style.visibility = tutStep===0 ? "hidden" : "visible";
  $("#tutNext").textContent = tutStep===TUTORIAL.length-1 ? "¡Listo!" : "Siguiente ›";
}
function openTutorial(){ tutStep=0; renderTut(); $("#tutorial").hidden=false; }
function closeTutorial(){ $("#tutorial").hidden=true; try{ localStorage.setItem(TUT_KEY,"1"); }catch(e){} }
function tutNext(){ if(tutStep>=TUTORIAL.length-1){ closeTutorial(); return; } tutStep++; renderTut(); }
function tutPrev(){ if(tutStep>0){ tutStep--; renderTut(); } }
function maybeAutoTutorial(){ try{ if(!localStorage.getItem(TUT_KEY)) openTutorial(); }catch(e){} }

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
function onAuthenticated(){ $("#login-gate").hidden=true; renderUserChip(); maybeAutoTutorial(); syncNow(); }
function renderUserChip(){
  if(!loginRequired()||!session){ $("#user-menu").hidden=true; return; }
  $("#user-avatar").src = session.picture || "img/lechuga.png";
  $("#user-name").textContent = session.name || session.email;
  $("#user-menu").hidden=false;
}
function doLogout(){
  if(window.google && google.accounts && google.accounts.id) google.accounts.id.disableAutoSelect();
  saveSession(null); renderUserChip(); setSyncUI("hidden"); requireLogin();
}

/* ---------- catálogo (drawer en mobile) ---------- */
function closeCatalog(){ document.body.classList.add("cat-collapsed"); }
function toggleCatalog(){ document.body.classList.toggle("cat-collapsed"); }

/* ============================================================
   SYNC A LA NUBE (Vercel KV vía /api/data) — por usuario
   ============================================================ */
const API_URL = "/api/data";
let syncing=false, cloudTimer=null;
function authHeaders(extra){ extra=extra||{}; return (session&&session.token)?Object.assign({Authorization:"Bearer "+session.token},extra):extra; }
function setSyncUI(st){
  const el=$("#cloud"); if(!el) return;
  if(!loginRequired() || !session || st==="hidden"){ el.hidden=true; return; }
  el.hidden=false; el.className="cloud is-"+st;
  el.textContent = {saving:"☁ Guardando…", synced:"☁ Guardado", pending:"☁ Cambios sin subir…",
    offline:"☁ Sin conexión", error:"☁ Sin sincronizar", auth:"☁ Iniciá sesión"}[st] || "";
}
function scheduleSync(){
  if(!loginRequired() || !sessionValid()) return;
  setSyncUI("pending"); clearTimeout(cloudTimer); cloudTimer=setTimeout(syncNow, 1500);
}
async function syncNow(){
  if(!loginRequired() || !sessionValid()){ return; }
  if(syncing) return;
  if(!navigator.onLine){ setSyncUI("offline"); return; }
  syncing=true; setSyncUI("saving");
  try{
    const g=await fetch(API_URL,{cache:"no-store",headers:authHeaders()});
    if(g.status===401){ setSyncUI("auth"); return; }
    if(g.ok){
      const remote=await g.json();
      if(remote && Array.isArray(remote.plants) && (remote.savedAt||"") > (state.savedAt||"")){
        state.plants=remote.plants; state.boards=remote.boards||[];
        state.terreno=remote.terreno||state.terreno; state.scale=remote.scale||state.scale;
        state.nextId=remote.nextId||state.nextId; state.savedAt=remote.savedAt;
        $("#tW").value=state.terreno.w; $("#tH").value=state.terreno.h; saveLocal(); renderStage();
      }
    }
    const p=await fetch(API_URL,{method:"PUT",headers:authHeaders({"Content-Type":"application/json"}),body:JSON.stringify(state)});
    if(p.status===401){ setSyncUI("auth"); return; }
    if(p.ok){ const r=await p.json(); state.savedAt=r.savedAt; saveLocal(); setSyncUI("synced"); }
    else setSyncUI("error");
  }catch(e){ setSyncUI(navigator.onLine?"error":"offline"); }
  finally{ syncing=false; }
}
window.addEventListener("online", ()=>{ if(loginRequired()&&sessionValid()) syncNow(); });
window.addEventListener("offline", ()=>setSyncUI("offline"));

/* ============================================================
   INICIO
   ============================================================ */
function init(){
  load();
  $("#tW").value=state.terreno.w; $("#tH").value=state.terreno.h;
  if(window.innerWidth < 880){ document.body.classList.add("cat-collapsed"); $("#stats").classList.add("collapsed"); }
  renderFilters(); renderSeasonFilter(); renderCatalog(); bind(); renderStage(); renderProjSelect();
  if(loginRequired() && !sessionValid()){ requireLogin(); }
  else { renderUserChip(); maybeAutoTutorial(); if(sessionValid()) syncNow(); }
}
document.addEventListener("DOMContentLoaded",init);
