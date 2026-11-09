# Video de presentación — PhishNet (v2, 120 s)

Composición Hyperframes (HTML + CSS + GSAP) que evoluciona el video v1 de 104 s: conserva su paleta, tipografías (Manrope y DM Mono), escenas, glifos animados y transiciones blur/push, y suma PTM explícito, Abundancia, Mercado, una **demo real grabada** de la app publicada y un cierre con QR.

## Entrega

- `renders/phishnet-final-120s.mp4`: MP4 H.264, 1920 × 1080, 30 fps, AAC, 120 s.
- `renders/phishnet-v1-104s-respaldo.mp4`: el video original, sin cambios.
- `../video-v1-respaldo/`: composición, guion y scripts de mezcla de la v1 (para volver a renderizarla, copiar su `index.html` dentro de `video/`).

## Estructura

| Tiempo | Escena (`id`) | Contenido | Voz |
| --- | --- | --- | --- |
| 0:00–0:11.6 | `scene1` | Problema: el mensaje urgente | Equipo |
| 0:11.6–0:26.1 | `scene2` | Problema: presión, tres preguntas, "reconocer señales lleva tiempo" | Equipo |
| 0:26.1–0:38 | `scene4` | PTM: "Hacer que la seguridad digital sea accesible para todos" | Equipo |
| 0:38–0:53 | `scene9` (nueva) | Abundancia: en uso hoy vs. próximos pasos | Guía |
| 0:53–1:09 | `scene10` (nueva) | Mercado existente resegmentado | Guía |
| 1:09–1:15 | `scene5` | Solución: Conocé PhishNet | Equipo |
| 1:15–1:34.5 | `scene6` | Demo real: portada → analizador → tipeo → clic → resultado | Guía |
| 1:34.5–1:46 | `scene7` | Resultado real 52/100 encuadrado en la grabación | Guía |
| 1:46–2:00 | `scene8` | Cierre, frase y QR (visible 1:49.4–1:58); placa final con el logo en grande 1:58–2:00 | Equipo |

`scene3` sigue en el archivo como escena de respaldo, sin programar: su idea quedó resumida en el rótulo de `scene2` para ganar tiempo para la demo.

## Qué es real y qué es hoja de ruta

- **Demo:** grabación sin edición de contenido de https://pedr0torcivia.github.io/PhishNet/ (`assets/demo/demo-raw.webm`). Hyperframes solo recorta, encuadra y hace zoom. El cursor visible es un dibujo agregado por el script para que se vea el puntero; no cambia la app.
- **Abundancia:** en uso hoy son el código abierto (React, Tesseract.js para el OCR local) y la nube (GitHub Pages). IA y modelos de lenguaje, APIs de reputación y bases de amenazas, y datos públicos/comunidades están marcados como **PRÓXIMO PASO**: la app actual no los usa (ver `docs/arquitectura.md`).
- **Mercado:** la ventaja competitiva aparece como **hipótesis a validar**. Las alternativas se nombran como texto, sin logos.
- **Nota sobre el mensaje de prueba:** la frase sugerida "Tu cuenta bancaria será suspendida. Verificá inmediatamente tus datos para evitar el bloqueo" sola da **Bajo, 22/100** (el analizador no reconoce "bancaria" ni "verificá… tus datos"). La demo agrega "Ingresá tu clave en https://example.com/verificar" y obtiene **Alto, 52/100**. Puede ser una mejora para el analizador; la app no se modificó.

## Archivos

| Ruta | Uso |
| --- | --- |
| `index.html` | Composición editable: escenas, estilos, audio y timeline. |
| `guion-voz.md` | Guion con tiempos, fuente de cada frase y cómo regrabar la pista guía. |
| `record-demo.mjs` | Script Playwright que graba la demo real. |
| `assets/demo/demo-raw.webm`, `demo-log.json` | Grabación original y registro de tiempos y resultado obtenido. |
| `assets/voice-original.mp3` | Locución original del equipo (4 personas). |
| `assets/voice-guia/*.wav` | Pista guía sintética (Kokoro, local) de las frases nuevas: reemplazar por grabaciones del equipo. |
| `assets/music-original.mp3` | Música original. |
| `assets/qr-phishnet.svg` | QR a https://pedr0torcivia.github.io/PhishNet/ (corrección M, zona de silencio de 4 módulos). |
| `assets/phishnet-mark.svg`, `phishnet-mark-dark.svg` | Isotipo real de PhishNet (copia de `design/logo/`) y su versión para fondo oscuro (placa final). |
| `render.ps1` | Chequeo + render final con Hyperframes. |
| `capture-app.mjs`, `capture-mail-flow.mjs`, `assets/app-*.png` | Capturas de la v1 (la portada sigue usándose en `scene5`). |

## Volver a renderizar

Desde la raíz del repo, con Node.js, Google Chrome y FFmpeg en el PATH (Hyperframes usa FFmpeg para codificar):

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File video/render.ps1
```

Equivale a `npx hyperframes@0.9.26 check video` seguido de `npx hyperframes@0.9.26 render video -o video/renders/phishnet-final-120s.mp4 -q delivery`. La mezcla de audio (volúmenes, fundidos y recortes de la locución) está declarada en los `<audio>` de `index.html`; ya no se usa un script de FFmpeg aparte.

Para regrabar la demo (por ejemplo, si cambia la interfaz):

```powershell
node video/record-demo.mjs                          # app publicada
node video/record-demo.mjs http://127.0.0.1:5173/   # copia local (npm run dev)
```

Si cambian los tiempos de la grabación, revisar `demo-log.json` y ajustar en `index.html` el `data-media-start` de `#demo-a` y `#demo-b` y los tiempos del zoom (`.s6-cam`) y del aro de clic (`.s6-ring`). Si cambia el resultado, actualizar 52/100 en `scene7` y en el guion.

## Cómo editar

- **Textos:** dentro de cada `<section id="sceneN">`.
- **Tiempos:** el objeto `START` al inicio del `<script>` define cuándo entra cada escena; las animaciones de cada escena usan esos tiempos o segundos absolutos sincronizados con la voz.
- **Audio:** cada `<audio>` tiene `data-start` (en el video), `data-media-start` (dentro del archivo), `data-duration` y `data-volume`.
- También se puede editar en la app de escritorio de HyperFrames abriendo la carpeta `video/`.
