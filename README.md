# 🌱 Circuito Verde

**Planificador de huerta e invernadero para el clima patagónico (INTA Bariloche).**

App web de un solo archivo (sin instalación, funciona offline) para *estrategizar* la huerta hogareña y el invernadero: elegí plantas, entendé cuánto espacio ocupa cada una y diseñá tus bancales arrastrando y soltando sobre un lienzo a escala real.

## ¿Qué hace?

- **Catálogo de 61 plantas** adecuadas a Bariloche / Patagonia cordillerana, con función comestible, repelente de plagas y/o atractora de polinizadores e insectos benéficos.
- Cada planta tiene un **dibujo estilo lápiz de colores** para reconocerla de un vistazo y un **círculo de distancia** que representa el espacio real que necesita entre planta y planta.
- **3 listas / filtros:** (1) Todas · (2) Por categoría · (3) Por nombre científico y grupo botánico. Más buscador y filtros por función (🥬 comestible, 🛡️ repele plagas, 🐝 polinizadores, 🐞 benéficos, ⚡ fija nitrógeno, 🏠 invernadero).
- **Lienzo en blanco a escala** (1 cuadro = 1 m²): arrastrá las plantas que quieras y el círculo punteado te muestra cuánto ocupan. Si dos plantas quedan demasiado juntas, sus círculos se marcan en **rojo**.
- **Tablones de madera** que arrastrás y redimensionás (ej. 2×1 m) para replicar tus **bancales** reales y medir el espacio de producción.
- **Resumen del diseño**: total de plantas, especies, bancales y área. Botón **Exportar** a JSON (lista de plantas, cantidades y distancias).
- Tu diseño se **guarda solo** en el navegador (localStorage).

## Cómo usar

Abrí `index.html` con doble clic en cualquier navegador. No necesita servidor ni conexión.

> Para desarrollo se incluye `.claude/launch.json` que sirve la carpeta con `python -m http.server 5180`.

## Datos / fuentes

El catálogo se basa en recomendaciones de **INTA** para la huerta agroecológica de la Patagonia cordillerana:

- Calendario de siembra de Bariloche (INTA) y calendario hortícola del sur de Río Negro / norte de la Patagonia.
- *"Pautas para diseñar una huerta en la Patagonia cordillerana"*.
- *"Cinco opciones para ahuyentar las plagas de la huerta"* (INTA Informa) y cartilla *"Control de plagas en la huerta"* (biopreparados).
- *"Primer mapeo de huertas urbanas en Bariloche"* (Repositorio INTA, EEA Bariloche).
- Río Negro Nutre (distancias de plantación de cultivos de fruto, pimiento, zapallo y arveja).

Las distancias entre plantas combinan las tablas de INTA con valores hortícolas estándar donde la fuente exacta no estaba disponible. Verificá siempre contra la cartilla de tu zona antes de plantar.

## Estructura

| Archivo | Qué contiene |
|---|---|
| `index.html` | Estructura y estilos de la app |
| `plants.js` | Base de datos de las 61 plantas |
| `app.js` | Dibujos a lápiz, filtros, drag & drop, lienzo y tablones |

---

Hecho con 💚 para la huerta patagónica.
