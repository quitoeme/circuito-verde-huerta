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
const norm = s => (s||"").toString().normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().trim();  // sin acentos

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
  selUids.clear(); save(); renderStage(); updateUndoBtn(); toast("↶ Deshecho");
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
    <div class="card-actions">
      <button class="info-btn" data-info="${p.id}">info</button>
      <button class="add-btn" data-add="${p.id}" title="Agregar al lienzo · Shift = 5 · Ctrl = 10">＋</button>
    </div>
  </div>`;
}
function passesFilter(p){
  if(searchTxt){
    const hay = norm(p.nombre+" "+p.cientifico+" "+p.familia+" "+p.grupo+" "+p.categoria+" "+
      p.funciones.map(f=>FX_NAME[f]).join(" "));
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
/* grosor visual del listón de madera (en px), dibujado POR FUERA del interior */
const FRAME_M = 0.09;
function boardFrameThick(){ return Math.max(7, Math.min(state.scale*FRAME_M, 18)); }
/* frame de listones (W,H = footprint TOTAL; t = grosor de madera; interior con mulch) */
function boardFrameInner(W,H,t){
  const ix=t, iy=t, iw=Math.max(0,W-2*t), ih=Math.max(0,H-2*t);
  return `
    <path d="M0 0 H${W} V${H} H0 Z M${t} ${t} H${W-t} V${H-t} H${t} Z"
      fill="url(#woodGrain)" fill-rule="evenodd" stroke="#6e4a25" stroke-width="1.4"/>
    <line x1="0" y1="0" x2="${t}" y2="${t}" stroke="#5e3f1f" stroke-width="1"/>
    <line x1="${W}" y1="0" x2="${W-t}" y2="${t}" stroke="#5e3f1f" stroke-width="1"/>
    <line x1="${W}" y1="${H}" x2="${W-t}" y2="${H-t}" stroke="#5e3f1f" stroke-width="1"/>
    <line x1="0" y1="${H}" x2="${t}" y2="${H-t}" stroke="#5e3f1f" stroke-width="1"/>
    <rect x="${ix}" y="${iy}" width="${iw}" height="${ih}" fill="url(#mulch)" stroke="#9c7a3f" stroke-width="1.2"/>
    <path d="M${ix} ${iy} H${ix+iw}" stroke="#000" stroke-opacity=".12" stroke-width="2"/>
    <path d="M${ix} ${iy} V${iy+ih}" stroke="#000" stroke-opacity=".12" stroke-width="2"/>
    <path d="M0 0 H${W}" stroke="#dcb589" stroke-width="2" opacity=".9"/>
    <path d="M0 0 V${H}" stroke="#dcb589" stroke-width="2" opacity=".9"/>
    <path d="M0 ${H} H${W}" stroke="#5e3f1f" stroke-width="2" opacity=".7"/>
    <path d="M${W} 0 V${H}" stroke="#5e3f1f" stroke-width="2" opacity=".7"/>`;
}
function boardFrameSVG(W,H,t){
  return `<svg class="frame" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"
    preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">${boardFrameInner(W,H,t)}</svg>`;
}
function boardEl(b){
  const s = state.scale, ft = boardFrameThick();
  const wpx = b.L*s + 2*ft, hpx = b.W*s + 2*ft;
  const el = document.createElement("div");
  el.className = "node board"; el.dataset.uid = b.uid;
  el.style.left = (b.x*s - ft)+"px"; el.style.top = (b.y*s - ft)+"px";
  el.innerHTML = `<div class="board-rect" style="width:${wpx}px;height:${hpx}px">
      ${boardFrameSVG(wpx,hpx,ft)}
      <span class="dim h">${b.L.toFixed(1)} m</span>
      <span class="dim w">${b.W.toFixed(1)} m</span>
      <button class="rot" title="Rotar 90°">⟳</button>
      <button class="lock ${b.locked?"on":""}" title="${b.locked?"Bloqueado: las plantas se mueven con el bancal":"Desbloqueado: el bancal se mueve solo"}">${b.locked?"🔒":"🔓"}</button>
      <button class="del" title="Quitar bancal">✕</button>
      <button class="ana" title="Diseñar este bancal: elegí qué plantar y te calculo la mejor forma (+ rotación INTA)">📐 Diseñar</button>
      <span class="handle" title="Redimensionar"></span>
    </div>`;
  el.querySelector(".del").addEventListener("pointerdown",e=>{e.stopPropagation();});
  el.querySelector(".del").addEventListener("click",e=>{
    e.stopPropagation(); pushUndo(); state.boards = state.boards.filter(x=>x.uid!==b.uid); save(); renderStage();});
  el.querySelector(".lock").addEventListener("pointerdown",e=>{e.stopPropagation();});
  el.querySelector(".lock").addEventListener("click",e=>{
    e.stopPropagation(); b.locked=!b.locked; save(); renderStage();
    toast(b.locked?"🔒 Bancal bloqueado: las plantas se mueven con él":"🔓 Bancal desbloqueado");});
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
  const n=selUids.size;
  pushUndo();
  state.plants=state.plants.filter(x=>!selUids.has(x.uid));
  state.boards=state.boards.filter(x=>!selUids.has(x.uid));
  selUids.clear(); save(); renderStage();
  toast(`🗑 ${n} elemento${n>1?"s":""} borrado${n>1?"s":""}`);
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
  // bancales BLOQUEADOS: arrastran las plantas de adentro aunque no estén seleccionadas
  const already=new Set(items.map(it=>it.ref.uid));
  items.filter(it=>it.type==="board" && it.ref.locked).forEach(it=>{
    plantsInBoard(it.ref).forEach(pl=>{ if(!already.has(pl.uid)){
      already.add(pl.uid);
      items.push({type:"plant", ref:pl, el:stage.querySelector(`.node[data-uid="${pl.uid}"]`), sx:pl.x, sy:pl.y});
    }});
  });
  const startMX=(e.clientX-rect.left)/s, startMY=(e.clientY-rect.top)/s;
  let moved=false; const pre=snapshot();
  try{ el.setPointerCapture(e.pointerId); }catch(_){}
  const move=ev=>{
    moved=true;
    const dx=(ev.clientX-rect.left)/s-startMX, dy=(ev.clientY-rect.top)/s-startMY;
    items.forEach(it=>{
      let nx=snapVal(it.sx+dx), ny=snapVal(it.sy+dy);
      if(it.type==="plant"){ nx=clamp(nx,0,stageW()); ny=clamp(ny,0,stageH());
        it.ref.x=nx; it.ref.y=ny; it.el.style.left=(nx*s)+"px"; it.el.style.top=(ny*s)+"px"; }
      else { nx=clamp(nx,0,stageW()-it.ref.L); ny=clamp(ny,0,stageH()-it.ref.W);
        const ft=boardFrameThick(); it.ref.x=nx; it.ref.y=ny; it.el.style.left=(nx*s-ft)+"px"; it.el.style.top=(ny*s-ft)+"px"; }
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
      const ft=boardFrameThick(), Wpx=b.L*s+2*ft, Hpx=b.W*s+2*ft;
      rectEl.style.width=Wpx+"px"; rectEl.style.height=Hpx+"px";
      const svg=rectEl.querySelector("svg.frame");
      svg.setAttribute("width",Wpx); svg.setAttribute("height",Hpx);
      svg.setAttribute("viewBox",`0 0 ${Wpx} ${Hpx}`); svg.innerHTML=boardFrameInner(Wpx,Hpx,ft);
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
function showLegumes(){
  activeFx = new Set(["nitrogeno"]); activeSeason = new Set(); searchTxt="";
  const sb=$("#search"); if(sb) sb.value="";
  document.body.classList.remove("cat-collapsed");
  renderFilters(); renderSeasonFilter(); renderCatalog();
  const cat=$("#catalog"); if(cat) cat.scrollTop=0;
  toast("🫛 Filtré las leguminosas y abonos verdes que fijan nitrógeno");
}

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
  $("#search").addEventListener("input",e=>{ searchTxt=norm(e.target.value); renderCatalog(); });
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
  // botones de la tarjeta: + info y ➕ agregar (Shift=5, Ctrl=10)
  $("#catalog").addEventListener("click",e=>{
    const ib=e.target.closest(".info-btn"); if(ib){ openInfo(ib.dataset.info); return; }
    const ab=e.target.closest(".add-btn"); if(ab){ const n=e.shiftKey?5:((e.ctrlKey||e.metaKey)?10:1); addPlants(ab.dataset.add, n); }
  });
  // cerrar modal
  $("#modalClose").addEventListener("click",closeInfo);
  $("#modal").addEventListener("click",e=>{ if(e.target.id==="modal") closeInfo(); });
  // modal: mes del calendario, optimizador y compañera/planta clickeable
  $("#modalBody").addEventListener("click",e=>{
    const m=e.target.closest("[data-m]"); if(m){ calMonth=+m.dataset.m; renderCalendar(); return; }
    const tb=e.target.closest("[data-btab]"); if(tb && boardAnaB){ boardTab=tb.dataset.btab; showModal(boardAnaHTML(boardAnaB)); return; }
    if(e.target.closest("#goLegumes")){ closeInfo(); showLegumes(); return; }
    const ob=e.target.closest(".optbtn"); if(ob && optBoard && !ob.disabled){ fillMulti(optBoard, optSel, ob.dataset.fillmode); return; }
    const sw=e.target.closest(".sc-w"); if(sw && optBoard){ const id=sw.dataset.id; optW[id]=Math.min(9,Math.max(1,(optW[id]||1)+(+sw.dataset.wd))); refreshOpt(); return; }
    const rm=e.target.closest(".sc-x"); if(rm && optBoard){ optSel=optSel.filter(x=>x!==rm.dataset.rm); delete optW[rm.dataset.rm]; refreshOpt(); return; }
    if(e.target.closest("#optSuggest") && optBoard){ suggestCompanion(); return; }
    const g=e.target.closest("[data-goto]"); if(g) openInfo(g.dataset.goto);
  });
  $("#modalBody").addEventListener("change",e=>{
    if(e.target.id==="optAdd" && optBoard && e.target.value){ if(!optSel.includes(e.target.value)){ optSel.push(e.target.value); optW[e.target.value]=1; } refreshOpt(); }
  });
  $("#modalBody").addEventListener("keydown",e=>{
    if(e.target.id==="optCmd" && e.key==="Enter"){ e.preventDefault(); parseOptCommand(e.target.value); const c=$("#optCmd"); if(c){ c.focus(); } }
  });
  // arrastrar del catálogo (mouse) / tocar para colocar (touch)
  $("#catalog").addEventListener("pointerdown",e=>{
    if(e.target.closest(".info-btn,.add-btn")) return;
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
    toast("📐 Tocá “Diseñar” en el bancal: elegís qué plantar y te calculo la mejor forma");
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
  // click izquierdo en vacío deselecciona
  stage.addEventListener("pointerdown",e=>{ if(e.button===0 && (e.target===stage||e.target===gridC)){ clearSel(); }});
  // click DERECHO + arrastrar = selección por recuadro (sin teclas)
  stage.addEventListener("contextmenu",e=>e.preventDefault());
  stage.addEventListener("pointerdown",e=>{
    if(e.button!==2) return;
    e.preventDefault();
    const rect=stage.getBoundingClientRect(), s=state.scale;
    const sx=e.clientX-rect.left, sy=e.clientY-rect.top;
    const box=document.createElement("div"); box.className="marquee"; stage.appendChild(box);
    let moved=false;
    const move=ev=>{
      moved=true;
      const cx=ev.clientX-rect.left, cy=ev.clientY-rect.top;
      box.style.left=Math.min(sx,cx)+"px"; box.style.top=Math.min(sy,cy)+"px";
      box.style.width=Math.abs(cx-sx)+"px"; box.style.height=Math.abs(cy-sy)+"px";
    };
    const up=ev=>{
      document.removeEventListener("pointermove",move); document.removeEventListener("pointerup",up);
      box.remove();
      const cx=ev.clientX-rect.left, cy=ev.clientY-rect.top;
      const x0=Math.min(sx,cx)/s, y0=Math.min(sy,cy)/s, x1=Math.max(sx,cx)/s, y1=Math.max(sy,cy)/s;
      if(moved){
        const sel=state.plants.filter(p=>p.x>=x0&&p.x<=x1&&p.y>=y0&&p.y<=y1).map(p=>p.uid);
        setSelection(sel);
        if(sel.length) toast(`✓ ${sel.length} planta${sel.length>1?"s":""} seleccionada${sel.length>1?"s":""} — arrastrá para moverlas`);
      }
    };
    document.addEventListener("pointermove",move); document.addEventListener("pointerup",up);
  });
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
let toastTimer=null;
function toast(msg){
  const t=$("#toast"); if(!t) return;
  t.textContent=msg; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.remove("show"), 2000);
}

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
  toast(`⧉ ${news.length} duplicada${news.length>1?"s":""}`);
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
/* agregar N plantas, cada una en el próximo espacio LIBRE cerca de lo visible */
function addPlants(id, n){
  const p=byId[id]; if(!p) return;
  const s=state.scale, d=Math.max(p.dist/100, 0.12), myR=d/2, step=Math.max(d, 0.15);
  const vcx=(stageWrap.scrollLeft + Math.min(stageWrap.clientWidth, stage.offsetWidth)/2)/s;
  const vcy=(stageWrap.scrollTop  + Math.min(stageWrap.clientHeight, stage.offsetHeight)/2)/s;
  // candidatos sobre una grilla, ordenados por cercanía al centro visible
  const cands=[];
  for(let y=step/2; y<=stageH(); y+=step) for(let x=step/2; x<=stageW(); x+=step)
    cands.push({x,y,dd:(x-vcx)*(x-vcx)+(y-vcy)*(y-vcy)});
  cands.sort((a,b)=>a.dd-b.dd);
  const occ=state.plants.map(pl=>({x:pl.x,y:pl.y,r:(byId[pl.id].dist/100)/2}));
  const pre=snapshot(); let added=0;
  for(const cd of cands){
    if(added>=n) break;
    let ok=true;
    for(const o of occ){ const mr=o.r+myR; if((o.x-cd.x)*(o.x-cd.x)+(o.y-cd.y)*(o.y-cd.y) < mr*mr){ ok=false; break; } }
    if(ok){ state.plants.push({uid:"p"+(state.nextId++), id, x:+cd.x.toFixed(3), y:+cd.y.toFixed(3)});
      occ.push({x:cd.x,y:cd.y,r:myR}); added++; }
  }
  if(!added){ toast("Sin espacio libre — agrandá el terreno o el bancal"); return; }
  pushUndo(pre); save(); renderStage();
  toast(`➕ ${added} ${p.nombre}${added>1?"s":""} agregada${added>1?"s":""}`);
  if(window.innerWidth<880) closeCatalog();
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
  toast(`💾 Proyecto "${name}" guardado`);
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
    toast("📁 Diseño importado");
  }catch(e){ toast("No pude leer ese archivo (JSON inválido)"); } };
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
    const ft=boardFrameThick(), x=b.x*s-ft, y=b.y*s-ft, bw=b.L*s+2*ft, bh=b.W*s+2*ft;
    ctx.fillStyle="#b5824e"; ctx.fillRect(x,y,bw,bh);                       // madera (por fuera)
    ctx.fillStyle="#f3e9cf"; ctx.fillRect(b.x*s,b.y*s,b.L*s,b.W*s);          // interior (mulch/paja)
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
const ROT_ICON={fruto:"🍅",hoja:"🥬",raiz:"🥕",leguminosa:"🫛"};
const ROT_SHORT={fruto:"Fruto",hoja:"Hoja",raiz:"Raíz / bulbo",leguminosa:"Leguminosa"};
function rotCycleHTML(dom){
  const nextG = dom ? ROT_INTA.next[dom] : null;
  const steps = ROT_INTA.seq.map(g=>{
    const cls = g===dom ? "now" : (g===nextG ? "next" : "");
    const tag = g===dom ? `<span class="rs-tag now">estás acá</span>`
              : (g===nextG ? `<span class="rs-tag next">lo que sigue</span>` : "");
    return `<div class="rotstep ${cls}"><div class="rs-ic">${ROT_ICON[g]}</div><div class="rs-lb">${ROT_SHORT[g]}</div>${tag}</div>`;
  }).join(`<div class="rotarrow">→</div>`);
  return `<div class="rotcycle">${steps}<div class="rotloop" title="el ciclo vuelve a empezar">↻</div></div>`;
}
let boardAnaB=null, boardTab="plantar";
function openBoardAnalysis(b){
  boardAnaB=b; optBoard=b;
  showModal(boardAnaHTML(b));
}
function boardAnaHTML(b){
  const inside=plantsInBoard(b);
  const tabs=`<div class="btabs">
      <button class="btab ${boardTab==='plantar'?'on':''}" data-btab="plantar">📐 Plantar / optimizar</button>
      <button class="btab ${boardTab==='rotacion'?'on':''}" data-btab="rotacion">🔄 Rotación INTA</button>
    </div>`;
  return `
    <div class="m-head"><div><h3>📐 Diseñar bancal · ${b.L.toFixed(1)} × ${b.W.toFixed(1)} m</h3>
      <div class="m-sci">${inside.length} planta${inside.length!==1?"s":""} adentro</div></div></div>
    <div style="padding:10px 18px 0">${tabs}</div>
    <div id="boardTab">${renderBoardTab(b, boardTab)}</div>`;
}
function renderBoardTab(b, tab){ return tab==="rotacion" ? rotacionTabHTML(b) : plantarTabHTML(b); }
function plantarTabHTML(b){
  const inside=plantsInBoard(b);
  const counts={}; inside.forEach(pl=>counts[pl.id]=(counts[pl.id]||0)+1);
  const def = Object.keys(counts).sort((a,b)=>counts[b]-counts[a]);
  return `<div style="padding:8px 18px 16px">
    <div class="tip-box">Elegí <b>qué querés plantar</b> (una o varias) y te calculo <b>cuántas entran y la mejor forma de acomodarlas</b> con las distancias de INTA. Tocá una opción y las ubica solas. 🌱</div>
    ${optimizerSection(b, def)}
  </div>`;
}
function rotacionTabHTML(b){
  const inside=plantsInBoard(b);
  if(!inside.length) return `<div style="padding:26px 18px;text-align:center;color:var(--ink-soft)">
    <div style="font-size:34px">🔄</div>Plantá algo en el bancal (pestaña <b>Plantar</b>) y acá vas a ver en qué fase del <b>ciclo de rotación INTA</b> estás y qué conviene la próxima temporada.</div>`;
  const famCount={}, grpCount={}, counts={};
  inside.forEach(pl=>{ const p=byId[pl.id]; if(!p) return;
    counts[pl.id]=(counts[pl.id]||0)+1; famCount[p.grupo]=(famCount[p.grupo]||0)+1;
    const g=rotGroup(p); grpCount[g]=(grpCount[g]||0)+1; });
  const hasLeg=(grpCount.leguminosa||0)>0;
  let dom=null,domN=0; ["hoja","fruto","raiz","leguminosa"].forEach(g=>{ if((grpCount[g]||0)>domN){domN=grpCount[g];dom=g;} });
  const famRepetidas=Object.entries(famCount).filter(([f,n])=>n>=2).map(([f])=>f);
  const famList=Object.entries(famCount).sort((a,b)=>b[1]-a[1]).map(([f,n])=>`<span class="pill">${f} (${n})</span>`).join("");
  let reco="";
  if(dom){ const ng=ROT_INTA.next[dom];
    reco=`<div class="ok-box"><b>Próxima temporada:</b> este bancal fue de <b>${ROT_INTA.label[dom].toLowerCase()}</b>. Seguí con <b>${ROT_INTA.label[ng].toLowerCase()}</b> — ej.: ${ROT_INTA.ejemplos[ng]}.</div>`;
    reco += hasLeg
      ? `<div class="ok-box">✅ Hay leguminosas que reponen nitrógeno: el suelo queda en buenas condiciones.</div>`
      : `<div class="warn-box">🌱 No hay leguminosas. Antes del próximo cultivo exigente conviene una <b>leguminosa o abono verde</b> para reponer nitrógeno.<br><button class="btn ghost" id="goLegumes" style="margin-top:7px">🫛 Ver leguminosas</button></div>`;
  }
  if(famRepetidas.length) reco+=`<div class="warn-box">⚠️ Familia(s) repetida(s): <b>${famRepetidas.join(", ")}</b>. No las repitas acá por unos ${ROT_INTA.anios} años.</div>`;
  const fuentes=`<div class="m-foot" style="padding:10px 0 0">Criterio INTA / ProHuerta. Fuentes: ${ROT_INTA.fuentes.map((u,i)=>`<a href="${u}" target="_blank" rel="noopener">[${i+1}]</a>`).join(" ")}</div>`;
  return `<div style="padding:8px 18px 16px">
    <h5 class="asec">Familias presentes</h5><div class="cal-list">${famList}</div>
    <h5 class="asec">¿En qué fase está este bancal?</h5>${rotCycleHTML(dom)}
    <h5 class="asec">Recomendación</h5>${reco}
    <details style="margin-top:8px"><summary style="cursor:pointer;font-size:12px;color:var(--green-dark);font-weight:600">¿Por qué rotar? (INTA)</summary>
      <ul style="font-size:12.5px;color:var(--ink);margin:8px 0 0;padding-left:18px;line-height:1.5">${ROT_INTA.reglas.map(r=>`<li>${r}</li>`).join("")}</ul></details>
    ${fuentes}</div>`;
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
    // si el acceso/canopia exige más entre hileras (dRow>dPlant), respetarlo; si no, triángulo equilátero
    const rs = (dRow && dRow>dPlant) ? dRow : dPlant*SQRT3_2;
    if(W<dPlant || L<dPlant){ if(L>=hp&&W>=hp) pos.push({x:L/2,y:W/2}); return pos; }
    const nrows=Math.floor((W-dPlant)/rs)+1;
    const startY=(W-(nrows-1)*rs)/2;               // centrar verticalmente
    for(let r=0;r<nrows;r++){
      const y=startY+r*rs, off=(r%2)?hp:0;
      const ncols=Math.floor((L-dPlant-off)/dPlant)+1;
      const startX=(L-((ncols-1)*dPlant)-off)/2 + off;   // centrar (con corrimiento)
      for(let c=0;c<ncols;c++){ const x=startX+c*dPlant; if(x>=hp-1e-6 && x<=L-hp+1e-6) pos.push({x,y}); }
    }
  } else {                                          // marco real / en línea (rectangular)
    const dr=dRow||dPlant, hr=dr/2;
    if(W<dr || L<dPlant){ if(L>=hp&&W>=hr) pos.push({x:L/2,y:W/2}); return pos; }
    const ncols=Math.floor((L-dPlant)/dPlant)+1, nrows=Math.floor((W-dr)/dr)+1;
    const startX=(L-(ncols-1)*dPlant)/2, startY=(W-(nrows-1)*dr)/2;   // centrar la grilla
    for(let r=0;r<nrows;r++) for(let c=0;c<ncols;c++) pos.push({x:startX+c*dPlant, y:startY+r*dr});
  }
  return pos;
}
/* ---- selección múltiple de especies (con proporción ×N) ---- */
let optSel = [], optW = {};
function optimizerSection(b, defIds){
  optSel = (defIds && defIds.length) ? [...new Set(defIds)] : ["lechuga"];
  optW = {}; optSel.forEach(id=>optW[id]=1);
  return `<h5 class="asec">📐 ¿Qué querés plantar acá?</h5>
    <div id="optSelWrap">${renderOptSel()}</div>
    <div id="optResult">${renderOptResult(b)}</div>`;
}
function renderOptSel(){
  const chips = optSel.length
    ? optSel.map(id=>`<span class="selchip"><span class="sc-nm">${byId[id].nombre}</span>
        <button class="sc-w" data-wd="-1" data-id="${id}" title="menos">−</button>
        <b class="sc-n">×${optW[id]||1}</b>
        <button class="sc-w" data-wd="1" data-id="${id}" title="más">＋</button>
        <button class="sc-x" data-rm="${id}" title="quitar">✕</button></span>`).join("")
    : `<span class="cal-empty">Elegí al menos una planta…</span>`;
  const opts = PLANTS.slice().sort((a,b)=>a.nombre.localeCompare(b.nombre))
    .filter(p=>!optSel.includes(p.id))
    .map(p=>`<option value="${p.id}">${p.nombre} (${p.dist} cm)</option>`).join("");
  return `<div class="selchips">${chips}</div>
    <div class="selctrls">
      <select id="optAdd"><option value="">＋ agregar planta…</option>${opts}</select>
      <button class="btn ghost" id="optSuggest" title="Sumar una buena compañera (INTA)">🤝 Sugerir compañera</button>
    </div>
    <input id="optCmd" class="optcmd" placeholder="💬 Pedí: “el doble de lechuga”, “más tomate”, “sacá ajo”…"/>`;
}
function renderOptResult(b){
  if(!optSel.length) return `<div class="cal-empty" style="padding:10px 0">Agregá plantas arriba para calcular cuántas entran.</div>`;
  const line=multiLayout(b, optSel, "sq"), tres=multiLayout(b, optSel, "tres");
  const mono = optSel.length===1;
  const card=(title, plan, mode, badge, badgeCls)=>{
    const bd = plan.perSpecies.map(s=>`${s.n} ${byId[s.id].nombre}`).join(" · ") || "no entra";
    return `<button class="opt-card optbtn ${plan.total?"":"disabled"}" data-fillmode="${mode}" ${plan.total?"":"disabled"}>
      <div class="opt-n">${plan.total}</div>
      <div class="opt-t">${title} <span class="${badgeCls}">${badge}</span></div>
      <div class="opt-bd">${bd}</div>
      <div class="opt-cta">tocá para plantar →</div>
    </button>`;
  };
  return `
    <div style="font-size:11.5px;color:var(--ink-soft);margin:8px 0 6px">${mono?"Elegí cómo ordenarla":"Las acomodo por hileras, alternando las especies"} y respetando las distancias de INTA. <b>Tocá una opción para plantar</b>:</div>
    <div class="opt-grid">
      ${card("🌱 En línea (marco INTA)", line, "sq", "INTA", "")}
      ${card("🔼 Tresbolillo (denso)", tres, "tres", "no INTA", "no")}
    </div>`;
}
/* secuencia ponderada (round-robin suave) para repartir hileras según peso */
function weightedSeq(weights, len){
  const total=weights.reduce((a,b)=>a+b,0)||1, cred=weights.map(()=>0), out=[];
  for(let i=0;i<len;i++){ for(let j=0;j<weights.length;j++) cred[j]+=weights[j];
    let mi=0; for(let j=1;j<weights.length;j++) if(cred[j]>cred[mi]) mi=j;
    cred[mi]-=total; out.push(mi); }
  return out;
}
/* disposición de varias especies: hileras según proporción, cada una a su distancia INTA */
function multiLayout(b, ids, mode){
  const sp = ids.map(id=>{ const d=byId[id].dist/100; const el=DET(id).entreLineasCm?Math.max(DET(id).entreLineasCm/100,d):d; return {id,d,el,w:(optW[id]||1)}; });
  const seq = weightedSeq(sp.map(s=>s.w), 400);
  const positions=[], cnt={}; ids.forEach(id=>cnt[id]=0);
  const n=sp.length; let y=0, k=0, rows=0, guard=0; const failed=new Set();
  while(failed.size<n && guard<900){
    guard++;
    const s=sp[seq[k%seq.length]]; k++;
    if(y + s.el <= b.W + 1e-6){
      const cy=y+s.el/2, off=(mode==="tres" && rows%2===1)?s.d/2:0;
      const ncols=Math.floor((b.L - s.d - off)/s.d)+1;
      const startX=(b.L-((ncols-1)*s.d)-off)/2+off;
      for(let c=0;c<ncols;c++){ const x=startX+c*s.d; if(x>=s.d/2-1e-6 && x<=b.L-s.d/2+1e-6){ positions.push({id:s.id,x,y:cy}); cnt[s.id]++; } }
      rows++; y+=s.el; failed.clear();
    } else failed.add(s.id);
  }
  const offY=Math.max(0,(b.W-y)/2);                 // centrar verticalmente el bloque
  positions.forEach(p=>p.y+=offY);
  return { total:positions.length, perSpecies: ids.map(id=>({id,n:cnt[id]})).filter(x=>x.n>0), positions };
}
/* mini-chat: interpreta pedidos simples sobre el diseño */
function parseOptCommand(txt){
  const t=norm(txt); if(!t){ return; }
  let found=null, flen=0;
  PLANTS.forEach(p=>{ const bn=norm(plantBaseName(p)); if(bn && t.includes(bn) && bn.length>flen){ found=p; flen=bn.length; } });
  if(!found){ toast("No reconocí qué planta 🤔"); return; }
  const id=found.id;
  if(/\b(saca|sacar|saco|quita|quitar|quito|elimina|borra|sin)\b/.test(t)){
    optSel=optSel.filter(x=>x!==id); delete optW[id]; refreshOpt(); toast(`➖ Saqué ${found.nombre}`); return;
  }
  if(!optSel.includes(id)){ optSel.push(id); optW[id]=1; }
  const numX=t.match(/x\s*(\d+)/) || t.match(/(\d+)\s*(?:veces|x)/);
  if(t.includes("doble")) optW[id]=2;
  else if(t.includes("triple")) optW[id]=3;
  else if(t.includes("cuadruple")) optW[id]=4;
  else if(/\bmitad\b/.test(t) || /\bmenos\b/.test(t)) optW[id]=Math.max(1,(optW[id]||1)-1);
  else if(/\bmas\b/.test(t)) optW[id]=Math.min(9,(optW[id]||1)+1);
  if(numX) optW[id]=Math.min(9,Math.max(1,+numX[1]));
  refreshOpt(); toast(`✓ ${found.nombre} ×${optW[id]||1}`);
}
function fillMulti(b, ids, mode){
  const plan=multiLayout(b, ids, mode);
  if(!plan.total){ toast("No entra ninguna en este bancal — agrandalo"); return; }
  pushUndo();
  const insideUids=new Set(plantsInBoard(b).map(x=>x.uid));
  state.plants=state.plants.filter(x=>!insideUids.has(x.uid));
  plan.positions.forEach(pt=>state.plants.push({uid:"p"+(state.nextId++), id:pt.id, x:+(b.x+pt.x).toFixed(3), y:+(b.y+pt.y).toFixed(3)}));
  save(); renderStage(); closeInfo();
  const bd=plan.perSpecies.map(s=>`${s.n} ${byId[s.id].nombre}`).join(" + ");
  toast(`✓ Plantado: ${bd}`);
}
function refreshOpt(){
  const w=$("#optSelWrap"); if(w) w.innerHTML=renderOptSel();
  const r=$("#optResult"); if(r && optBoard) r.innerHTML=renderOptResult(optBoard);
}
function suggestCompanion(){
  const base=optSel[0]; if(!base){ toast("Agregá primero una planta"); return; }
  const cands=assocCandidates(base).filter(id=>!optSel.includes(id));
  if(!cands.length){ toast("No encontré una compañera nueva para sumar"); return; }
  optSel.push(cands[0]); refreshOpt();
  toast(`🤝 Sumé ${byId[cands[0]].nombre} (buena compañera, distinta familia)`);
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
function assocCandidates(principalId){    // -> lista de hasta 3 parejas (ids), criterio INTA
  const principalFast = isFastLow(principalId) && !isTallSlow(principalId);
  const pool = principalFast ? TALL_SLOW : FAST_LOW;
  const pos = (DET(principalId).compaPos||[]).map(x=>findPlantByName(x)).filter(Boolean).map(p=>p.id);
  let cands = pool.filter(id=>byId[id] && compatibleAssoc(principalId,id) && (principalFast?isTallSlow(id):isFastLow(id)));
  if(cands.length<2) pool.forEach(id=>{ if(byId[id]&&compatibleAssoc(principalId,id)&&!cands.includes(id)) cands.push(id); });
  cands = [...new Set(cands)].sort((a,b)=>(pos.includes(b)?1:0)-(pos.includes(a)?1:0));
  return cands.slice(0,3);
}
function assocPairOf(principalId, partnerId){    // decide cuál es A (alto/lento) y cuál B (bajo/rápido)
  let A,B;
  if(isTallSlow(principalId) && !isTallSlow(partnerId)){ A=principalId; B=partnerId; }
  else if(isTallSlow(partnerId) && !isTallSlow(principalId)){ A=partnerId; B=principalId; }
  else { A=((DET(principalId).alturaCm||0)>=(DET(partnerId).alturaCm||0))?principalId:partnerId; B=(A===principalId?partnerId:principalId); }
  return {A,B};
}
function assocLayout(b, aId, bId){
  const A=byId[aId], B=byId[bId];
  const dA=A.dist/100, elA=DET(aId).entreLineasCm? Math.max(DET(aId).entreLineasCm/100,dA):dA;
  const dB=B.dist/100, hpA=dA/2, hpB=dB/2;
  const posA=[], posB=[];
  if(b.L<dA || b.W<elA){ if(b.L>=hpA&&b.W>=hpA) posA.push({x:b.L/2,y:b.W/2}); return {posA,posB}; }
  const ncolsA=Math.floor((b.L-dA)/dA)+1, nrowsA=Math.floor((b.W-elA)/elA)+1, ysA=[];
  const startXA=(b.L-(ncolsA-1)*dA)/2, startYA=(b.W-(nrowsA-1)*elA)/2;   // centrar A
  for(let r=0;r<nrowsA;r++){ const y=startYA+r*elA; ysA.push(y); for(let c=0;c<ncolsA;c++) posA.push({x:startXA+c*dA,y}); }
  if(ysA.length>=2 && elA>=dB){                               // B en hileras intermedias
    const ncolsB=Math.floor((b.L-dB)/dB)+1, startXB=(b.L-(ncolsB-1)*dB)/2;
    for(let r=0;r<ysA.length-1;r++){ const y=ysA[r]+elA/2; for(let c=0;c<ncolsB;c++) posB.push({x:startXB+c*dB,y}); }
  } else if(dA>=dB*1.4){                                      // bancal angosto: intercalar en la misma hilera
    ysA.forEach(y=>{ for(let c=0;c<ncolsA-1;c++) posB.push({x:startXA+c*dA+dA/2,y}); });
  }
  return {posA,posB};
}
function fillAssoc(b, aId, bId){
  const {posA,posB}=assocLayout(b,aId,bId);
  if(!posA.length){ alert("No entra la asociación en este bancal."); return; }
  pushUndo();
  const insideUids=new Set(plantsInBoard(b).map(x=>x.uid));
  state.plants=state.plants.filter(x=>!insideUids.has(x.uid));
  posA.forEach(pt=>state.plants.push({uid:"p"+(state.nextId++), id:aId, x:+(b.x+pt.x).toFixed(3), y:+(b.y+pt.y).toFixed(3)}));
  posB.forEach(pt=>state.plants.push({uid:"p"+(state.nextId++), id:bId, x:+(b.x+pt.x).toFixed(3), y:+(b.y+pt.y).toFixed(3)}));
  save(); renderStage(); closeInfo();
  toast(`✓ ${posA.length} ${byId[aId].nombre} + ${posB.length} ${byId[bId].nombre} en el bancal`);
}
function descPorte(id){ const d=DET(id),t=[]; if(d.alturaCm&&d.alturaCm>=60)t.push("alta"); else if(d.alturaCm&&d.alturaCm<=25)t.push("baja");
  if(d.diasCosecha&&d.diasCosecha>=85)t.push("lenta"); else if(d.diasCosecha&&d.diasCosecha<=55)t.push("rápida"); return t.join(" y ")||"de porte medio"; }
let assocPrincipal=null;
function renderAssocPair(b, principalId, partnerId){
  const {A,B}=assocPairOf(principalId, partnerId);
  const {posA,posB}=assocLayout(b,A,B);
  const countA=posA.length, countB=posB.length, total=countA+countB;
  const note = countB===0
    ? `<div class="warn-box" style="margin:6px 0 0">El bancal es angosto para intercalar la hilera de ${byId[B].nombre}; ensanchalo o usá monocultivo.</div>` : "";
  return `<div class="assoc-txt">Combiná <b>${byId[A].nombre}</b> (${descPorte(A)}) con <b>${byId[B].nombre}</b> (${descPorte(B)}): intercalás la baja/rápida entre las hileras de la alta/lenta — aprovechás el espacio, cosechás la rápida antes y al ser de distinta familia bajás plagas. <i>(criterio INTA)</i></div>
    <div class="opt-grid" style="margin-top:7px">
      <div class="opt-card on"><div class="opt-n">${countA}</div><div class="opt-t">${byId[A].nombre}</div></div>
      <div class="opt-card on"><div class="opt-n">${countB}</div><div class="opt-t">${byId[B].nombre}</div></div>
    </div>${note}
    <button class="btn" id="optFillAsoc" data-a="${A}" data-b="${B}" style="margin-top:7px" ${total?"":"disabled"}>🤝 Ordenar asociación (${countA} + ${countB})</button>`;
}
function assocSection(b, principalId){
  assocPrincipal=principalId;
  const cands=assocCandidates(principalId);
  if(!cands.length) return `<div class="assoc-box"><div class="assoc-h">🤝 Asociación de cultivos <span>INTA</span></div>
    <div class="assoc-txt">No encontré una buena pareja para <b>${byId[principalId].nombre}</b> (misma familia o antagonismo). Probá con otra planta.</div></div>`;
  const partner=cands[0];
  const chips=cands.map(id=>`<button class="assoc-opt ${id===partner?"on":""}" data-partner="${id}">${byId[id].nombre}</button>`).join("");
  return `<div class="assoc-box">
    <div class="assoc-h">🤝 Asociación de cultivos <span>INTA · gran sugerencia</span></div>
    <div class="assoc-txt" style="margin-bottom:7px">Asociá tu cultivo con otro de <b>distinto porte y velocidad</b> (alto/lento + bajo/rápido) y de otra familia: aprovechás el espacio y bajás plagas.</div>
    <div class="assoc-lbl">Probá con</div>
    <div class="assoc-opts">${chips}</div>
    <div id="assocBody">${renderAssocPair(b, principalId, partner)}</div>
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
   text:"Planificá tu <b>huerta e invernadero</b> para el clima patagónico (datos de <b>INTA Bariloche</b>). Elegí plantas, armá tus bancales y dejá que la app te diga <b>cuántas entran y cómo ordenarlas</b>. Te muestro lo clave en 1 minuto."},
  {art:"📚", title:"Catálogo de 61 plantas",
   text:"A la izquierda están las plantas. Cambiá entre <b>Todas</b>, <b>por categoría</b> y <b>por nombre científico/grupo</b>, usá el <b>buscador</b> y filtrá por <b>función</b> (🥬🛡️🐝🐞) y por <b>temporada</b> (🌸☀️🍂❄️)."},
  {art:"➕", title:"Agregar plantas al lienzo",
   text:"Tocá el botón <b>➕</b> de una planta para sumarla (<kbd>Shift</kbd>=5, <kbd>Ctrl</kbd>=10) o <b>arrastrala</b>. Se ubican solas en el próximo espacio libre. El <b>círculo punteado</b> es la distancia real que necesita; si dos quedan muy juntas, se marca en <b>rojo</b>."},
  {art:"ℹ️", title:"Ficha de cada planta (info)",
   text:"El botón <b>info</b> abre la ficha: <b>buenas y malas compañeras</b> (clickeables), riego, luz, tolerancia a heladas, días a cosecha, altura, temporada y forma de siembra INTA."},
  {art:"🟫", title:"Bancales con borde de madera",
   text:"Elegí <b>largo y ancho</b> (= el interior cultivable) y tocá <b>+ Bancal</b>. La madera va por fuera y el interior tiene <b>mulch de paja</b>. Movelo, <b>redimensionalo</b> desde la esquina y <b>rotalo 90°</b> con ⟳ (las plantas rotan con él)."},
  {art:"📐", title:"Diseñá el bancal (¡lo mejor!)",
   text:"Tocá <b>📐 Diseñar</b> en un bancal: elegís <b>una o varias plantas</b> (podés pedir “el doble de lechuga”) y te dice <b>cuántas entran y la mejor forma</b> de acomodarlas — tocás <b>En línea</b> o <b>Tresbolillo</b> y las planta solas. Además te muestra la <b>rotación INTA</b>. Acá está el mayor valor."},
  {art:"🗺️", title:"Terreno, calendario y proyectos",
   text:"El recuadro punteado es tu <b>terreno</b> (cambiá medidas y <b>Aplicar</b>), con margen alrededor para maniobrar. <b>📅 Calendario</b>: qué sembrar/cosechar cada mes. <b>📁 Proyecto</b>: guardá, cargá e importá varios diseños."},
  {art:"⌨️", title:"Selección y atajos",
   text:"<kbd>Shift</kbd>+clic selecciona <b>varias</b>; <kbd>Ctrl</kbd>+<kbd>A</kbd> todas. <kbd>Ctrl</kbd>+<kbd>C</kbd>/<kbd>V</kbd> copiar/pegar, <kbd>Ctrl</kbd>+<kbd>X</kbd> cortar, <kbd>Ctrl</kbd>+<kbd>D</kbd> duplicar, <b>flechas</b> mover, <kbd>Ctrl</kbd>+<kbd>Z</kbd> deshacer. <kbd>Ctrl</kbd>+rueda = zoom. En celular: <b>tocá</b> una planta para colocarla."},
  {art:"💾", title:"Se guarda solo · Exportar",
   text:"Tu diseño se <b>guarda automáticamente</b> y, con tu cuenta de Google, se <b>sincroniza</b> entre dispositivos. <b>📊 Análisis</b> da el resumen y la lista de compra; exportás a <b>PNG / JSON</b> o lo <b>imprimís</b>. ¡A diseñar tu huerta! 🌻"},
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
