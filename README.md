# 🌱 Circuito Verde

**Planificador de huerta e invernadero para el clima patagónico (INTA Bariloche).**

App web de un solo archivo (sin instalación, funciona offline) para *estrategizar* la huerta hogareña y el invernadero: elegí plantas, entendé cuánto espacio ocupa cada una y diseñá tus bancales arrastrando y soltando sobre un lienzo a escala real.

## ¿Qué hace?

- **Catálogo de 61 plantas** adecuadas a Bariloche / Patagonia cordillerana, con función comestible, repelente de plagas y/o atractora de polinizadores e insectos benéficos.
- Cada planta tiene una **ilustración estilo lápiz de color** (generada con Gemini "Nano Banana", estética consistente) para reconocerla de un vistazo y un **círculo de distancia** que representa el espacio real que necesita entre planta y planta. Si falta una imagen, cae a un dibujo SVG de respaldo.
- **3 listas / filtros:** (1) Todas · (2) Por categoría · (3) Por nombre científico y grupo botánico. Más buscador, filtros por función (🥬 comestible, 🛡️ repele plagas, 🐝 polinizadores, 🐞 benéficos, ⚡ fija nitrógeno, 🏠 invernadero) y **filtro por temporada** (🌸 Primavera · ☀️ Verano · 🍂 Otoño · ❄️ Invierno).
- **Botón ＋info** en cada planta: abre una ficha con emparejamiento positivo/negativo (asociación de cultivos), fortalezas, debilidades, riego y tipo de riego, luz, temporada en cantero, método de implantación (siembra directa / trasplante / plantación) y distancia.
- **Lienzo a escala** (1 cuadro = 1 m²) con el **terreno delimitado** y un margen alrededor para maniobrar. Arrastrá las plantas que quieras; el círculo punteado muestra cuánto ocupan y si dos quedan demasiado juntas se marcan en **rojo**.
- **Tablones / bancales**: cuadrilátero con relleno blanco y bordes de listones de madera (vista superior), arrastrables y redimensionables (ej. 2×1 m) para replicar tus camas reales.
- **Selección múltiple** con `Shift + click` (mover o borrar varias a la vez) y **zoom con `Ctrl + rueda`** además de los botones de escala.
- **Resumen del diseño**: total de plantas, especies, bancales y área. Botón **Exportar** a JSON.
- Tu diseño se **guarda solo** en el navegador (localStorage).

## Cómo usar

- **Online:** https://planificador-huerta.vercel.app
- **Local:** abrí `index.html` con doble clic en cualquier navegador (funciona offline).

> Para desarrollo se incluye `.claude/launch.json` que sirve la carpeta con `python -m http.server 5180`.

### Login con Google

La app usa **Google Identity Services** con el mismo Client ID que la app de Inventario (ver `config.js`). Para que el login funcione en un dominio, ese origen debe figurar en **"Orígenes autorizados de JavaScript"** del Client ID en Google Cloud Console. Ej.: `https://planificador-huerta.vercel.app` y `http://localhost:5180`. Si `config.js` tiene el `googleClientId` vacío, la app queda abierta sin login.

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
| `index.html` | Estructura, estilos y modal de detalles |
| `plants.js` | Base de datos de las 61 plantas (nombre, distancia, función, etc.) |
| `details.js` | Datos para el ＋info: asociación de cultivos, riego, luz, temporada y método |
| `app.js` | Dibujos SVG de respaldo, filtros, drag & drop, lienzo, tablones, selección y zoom |
| `img/` | 61 ilustraciones estilo lápiz de color (Nano Banana / Gemini) |
| `tools/generate_images.py` | Script para (re)generar las imágenes; lee `GEMINI_API_KEY` del entorno |

---

Hecho con 💚 para la huerta patagónica.
