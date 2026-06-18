/* ============================================================
   Circuito Verde · Formas de siembra y distancia ENTRE HILERAS (INTA)
   Fuente: INTA/ProHuerta — "La Huerta Orgánica" y "Calendario de siembra"
   (distancias publicadas como entre_plantas × entre_hileras, en cm).
   Se fusiona en window.DETAILS:
     entreLineasCm  -> separación entre hileras según INTA
     formaSiembra   -> forma de siembra que nombra INTA
     implanteInta   -> directa / almácigo-trasplante / plantación
   La distancia entre plantas usa el campo "dist" (círculo) ya cargado.
   ============================================================ */
(function(){
  // id: [entreLineasCm, forma, implante]
  const F = {
    lechuga:[20,"Al voleo, a chorrillo o en línea","Directa o trasplante"],
    acelga:[40,"En línea","Directa o trasplante"],
    espinaca:[40,"En línea","Siembra directa"],
    rucula:[20,"Al voleo o a chorrillo","Siembra directa"],
    perejil:[25,"A chorrillo","Siembra directa"],
    zanahoria:[40,"A chorrillo / en línea (ralear)","Siembra directa"],
    remolacha:[35,"En línea","Siembra directa"],
    rabanito:[20,"A chorrillo / en línea","Siembra directa"],
    cebolla:[40,"En línea","Almácigo y trasplante"],
    ajo:[40,"A golpes / en línea","Plantación del diente"],
    puerro:[40,"En línea","Almácigo y trasplante"],
    arveja:[40,"A golpes / en línea","Siembra directa"],
    haba:[40,"Directa a golpes","Siembra directa"],
    chaucha:[70,"Directa a golpes","Siembra directa"],
    tomate:[70,"En línea","Almácigo y trasplante"],
    pimiento:[70,"En línea","Almácigo y trasplante"],
    berenjena:[70,"En línea","Almácigo y trasplante"],
    aji:[70,"En línea","Almácigo y trasplante"],
    zapallo:[275,"Directa a golpes","Siembra directa"],
    zapallito:[100,"Directa a golpes","Siembra directa"],
    pepino:[120,"Directa a golpes","Siembra directa"],
    maiz:[70,"A golpes / en línea","Siembra directa"],
    albahaca:[40,"En línea","Almácigo y trasplante"],
    apio:[70,"En línea","Almácigo y trasplante"],
    repollo:[70,"En línea","Almácigo y trasplante"],
    brocoli:[50,"En línea","Almácigo y trasplante"],
    coliflor:[50,"En línea","Almácigo y trasplante"],
    papa:[70,"A golpes / en línea","Plantación del tubérculo"]
  };
  window.DETAILS = window.DETAILS || {};
  Object.keys(F).forEach(function(id){
    const [el,forma,imp]=F[id];
    window.DETAILS[id]=Object.assign(window.DETAILS[id]||{},{entreLineasCm:el, formaSiembra:forma, implanteInta:imp});
  });
  window.SIEMBRA_FUENTES = [
    "https://www.argentina.gob.ar/sites/default/files/2023/08/script-tmp-huerta_organica.pdf",
    "https://inta.gob.ar/documentos/calendario-de-siembra-pro-huerta-primavera-verano"
  ];
})();
