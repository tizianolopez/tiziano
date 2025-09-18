# Portfolio — Tiziano López

Resumen
- Sitio SPA estático que muestra un hero/parallax con tres imágenes (efecto "warp") y secciones internas: Sobre mí, Proyectos y Contacto.
- Implementado con HTML, CSS y JavaScript vanilla. No requiere backend (los datos se guardan localmente cuando aplica).

Cómo ver el proyecto (rápido)
1. Abrir `index.html` en el navegador (doble clic).  
2. Recomendado: servir con un servidor local para evitar problemas de rutas y CORS:
   - Python 3 (Windows PowerShell/CMD):  
     py -m http.server 8000  
     o  
     python -m http.server 8000  
   - Abrir http://localhost:8000 en el navegador.

Estructura de archivos (relevante)
- src/
  - css/styles_nosotros.css      — estilos principales
  - js/parallax.js              — lógica del parallax / aparición de imágenes
  - js/content_scroll.js        — animaciones de contenido según scroll
  - js/navbar.js                — comportamiento nav (scroll activo, ocultar/mostrar)
  - img/                        — imágenes (TL.png favicon, fotos, SVGs)
- index.html                    — página principal (secciones y anclas internas)

Dónde editar contenido
- Textos y secciones: `index.html` (artículos con class="member").  
- Proyectos: artículos dentro de la sección `#projects` en `index.html`.  
- Favicon: `src/img/TL.png` y la etiqueta `<link rel="icon" href="src/img/TL.png">` en `<head>` de `index.html`.

Ajustes importantes del parallax (parallax.js)
- Archivo: `src/js/parallax.js`
- Parámetros clave (tunables) al inicio del archivo:
  - TOTAL_VIEWPORTS — número de alturas de pantalla que duran las animaciones (aumentar => alarga todo el pase).
  - START2, START3 — momento (0..1 relativo a TOTAL_VIEWPORTS) en que img2 / img3 empiezan desde su escala inicial.
  - SCALE_BASE, SCALE_FACTOR — controlan tamaño inicial y velocidad de crecimiento (sin tope si lo deseas).
  - BLUR_START, MAX_BLUR — cuándo y cuánto se difumina.
  - LEFT_OFFSET — desplaza imágenes hacia la izquierda (en vh).
- Ejemplo rápido: para que img3 empiece verdaderamente pequeña en un momento posterior, subir START3 (ej. 0.8–0.9) y/o aumentar TOTAL_VIEWPORTS.

Problemas comunes y soluciones rápidas
- Favicon no aparece: limpiar caché (Ctrl+F5) o abrir en ventana incógnita. Verificar ruta en `<link rel="icon">`.
- Imágenes que no se ven / se muestran recortadas: revisar reglas CSS de `.image` (background-size: contain / cover) y que no haya `height: 100vh` fijo en el contenedor si quieres que escalen.
- Animación se detiene: comprobar si CSS contiene transform/transition con mayor especificidad que el JS; si existen, quítalas o usa `!important` con cuidado.

Despliegue
- Proyecto listo para deploy estático (GitHub Pages, Netlify, Vercel). Subir la carpeta raíz y configurar directorio público en `index.html`.

Contribuciones
- Para cambios rápidos: editar `index.html`, `src/css/styles_nosotros.css`, o `src/js/parallax.js`.  
- Si añades scripts que acceden a datos, documenta la fuente (ej. Kaggle) y el pipeline en `src/docs/` si es necesario.

Licencia
- Libre para uso personal y académico. Añade una licencia explícita (MIT) si quieres permitir uso público.

Contacto
- Email en la página: aparece en la sección Contacto de `index.html`.
