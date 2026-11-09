# Paquete de video de problemática — PhishNet

Esta carpeta contiene el video final y los archivos necesarios para revisarlo, editarlo y volver a renderizarlo en otra máquina. La composición está hecha en Hyperframes como HTML, CSS y GSAP. `renders/phishnet-con-audio.mp4` es la única exportación final e incluye las voces y la música suministradas.

## Entrega actual

- Duración: 1:44 (104 segundos).
- Formato: MP4 H.264, 1920 × 1080, 30 fps; audio AAC estéreo.
- Peso de referencia: aproximadamente 32 MB.
- Demo: flujo real de PhishNet con el Caso 1, resultado heurístico Alto, 88/100.
- El análisis no abre las URLs. La cifra se presenta como orientativa, no como veredicto.

## Contenido de la carpeta

| Ruta | Uso |
| --- | --- |
| `renders/phishnet-con-audio.mp4` | Exportación final con locución nivelada y música tenue. |
| `index.html` | Composición editable: escenas, textos, estilos y timeline GSAP. |
| `expanded-prompt.md` | Brief de producción, dirección visual, reglas y descripción de escenas. |
| `guion-voz.md` | Locución dividida entre cuatro personas, 26 segundos por bloque. |
| `assets/app-*.png` | Capturas reales de la aplicación que aparecen en la composición. |
| `capture-mail-flow.mjs` | Regenera el correo de ejemplo y las capturas del flujo OCR real. |
| `assets/voice-original.mp3`, `assets/music-original.mp3` | Pistas originales suministradas para la mezcla. |
| `mix-audio.ps1` | Rehace la mezcla de las cuatro voces y la música con FFmpeg. |
| `render-and-mix.ps1` | Renderiza, mezcla y elimina el video intermedio sin audio. |
| `assets/fonts/` | Fuentes Manrope y DM Mono usadas por la composición y sus licencias OFL. |
| `capture-app.mjs` | Script Playwright para regenerar la portada de la app. |
| `preview.jpg` | Fotograma de referencia de la exportación final. |

## Preparar otra máquina

Desde la raíz del repositorio:

1. Instalar Node.js compatible con el proyecto y las dependencias: `npm ci`.
2. Instalar Google Chrome o Chromium. Si el ejecutable no está en una ruta estándar, definir `CHROME_PATH` con la ruta completa al navegador.
3. Iniciar PhishNet en una terminal con `npm run dev -- --host 127.0.0.1` y dejarlo en ejecución en el puerto 5173.
4. En otra terminal, regenerar las capturas si se modificó la interfaz: `node video/capture-app.mjs` para la portada y `node video/capture-mail-flow.mjs` para el analizador.
5. Instalar FFmpeg y ejecutar `powershell -NoProfile -ExecutionPolicy Bypass -File video/render-and-mix.ps1`. El script usa Hyperframes 0.9.15, genera el video final con audio y elimina el intermedio.

La carpeta contiene el material de edición y las capturas actuales. Para volver a renderizar en otra máquina, esa máquina requiere acceso a internet la primera vez para descargar el CLI de Hyperframes; `npx` usa una versión fijada para reproducir el render. No se necesita una cuenta de Hyperframes.

## Cómo editar la composición

Abrir `index.html` en un editor de código. No editar el MP4 como fuente: los cambios se hacen en HTML/CSS/GSAP y luego se renderizan otra vez.

- **Textos:** buscar el texto dentro de la etiqueta `<section id="sceneN">` correspondiente y cambiar el contenido entre etiquetas. Los textos que ya están en pantalla también se pueden localizar desde la terminal con `rg "texto" video/index.html`.
- **Escenas:** hay ocho bloques, `scene1` a `scene8`. Cada bloque contiene sus rótulos, recursos visuales y clases CSS. El orden visual se controla con `z-index`; evitar cambiar identificadores sin actualizar las referencias de la timeline.
- **Colores, tipografía y geometría:** modificar las variables y reglas del `<style>` al inicio del archivo. Las fuentes locales están definidas mediante `@font-face`; conservar sus rutas relativas bajo `assets/fonts/`.
- **Tiempos y animación:** la timeline principal usa segundos en `gsap.timeline()`. `entrance(selector, from, to, start, duration, ease)` anima un elemento; `trans(from, to, start, direction)` controla el cambio de escena. `sourceCuts` y `targetCuts` distribuyen las escenas en ocho bloques de 13 segundos. Los íconos SVG aparecen de forma escalonada entre los segundos 3 y 10 de cada diapositiva; el texto y las capturas permanecen inmóviles una vez que entran. La composición dura 104 segundos, indicado por `data-duration="104"` en `#root`.
- **Imagen de la app:** reemplazar una captura en `assets/` conservando el nombre esperado por el `<img>` de `index.html`, o cambiar también el atributo `src`. Mantener las capturas en formato PNG.
- **Locución:** `mix-audio.ps1` separa el archivo suministrado en cuatro bloques, los alinea con las escenas, nivela las voces cerca de −21 LUFS y baja la música a unos −34 LUFS. `render-and-mix.ps1` ejecuta la secuencia completa y elimina el video intermedio sin audio.

### Guía de ritmo actual

| Escena | Rango aproximado | Contenido |
| --- | --- | --- |
| 1 | 0–13 s | Mensaje ficticio urgente; pregunta antes del clic. |
| 2 | 13–26 s | Decisión bajo presión y señales de riesgo. |
| 3 | 26–39 s | Dificultad cotidiana para verificar mensajes. |
| 4 | 39–52 s | Propósito transformador de PhishNet. |
| 5 | 52–65 s | Presentación del producto y sus límites. |
| 6 | 65–78 s | Adjuntar captura de correo, OCR y resultado en la interfaz real. |
| 7 | 78–91 s | Resultado 88/100 y señales detectadas. |
| 8 | 91–104 s | Cierre y llamado a actuar con contexto. |

## Regenerar y comprobar

Render final, desde la raíz del repo:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File video/render-and-mix.ps1
```

Comprobaciones de composición opcionales:

```sh
npx --yes hyperframes@0.9.15 lint video
npx --yes hyperframes@0.9.15 validate video
```

El MP4 de entrega debe comprobarse a 104 s, H.264, 1920 × 1080 y 30 fps después de cada render. `hyperframes lint video` y `hyperframes check video` permiten revisar la composición.

## Notas para futuras ediciones

- El mensaje `banco-seguro.top` es ficticio y solo funciona como ejemplo didáctico; no reemplazarlo por datos de personas o URLs reales.
- Si cambia el motor de análisis, actualizar las capturas y el 88/100 que aparece tanto en la UI como en la composición y el guion.
- No presentar el puntaje heurístico como una certeza o garantía de detección.
- Mantener el contraste de texto. La validación de Hyperframes permite detectar regresiones de contraste y errores de consola antes de exportar.
