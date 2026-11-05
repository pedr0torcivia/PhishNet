# Paquete de video de problemática — PhishNet

Esta carpeta contiene el video final y los archivos necesarios para revisarlo, editarlo y volver a renderizarlo en otra máquina. La composición está hecha en Hyperframes como HTML, CSS y GSAP. El MP4 final es **silencioso**: toda la historia se entiende mediante texto en pantalla y `guion-voz.md` ofrece una locución opcional para que el equipo la grabe y añada después.

## Entrega actual

- Duración: 2:30 (150 segundos).
- Formato: MP4 H.264, 1920 × 1080, 30 fps; sin pista de audio.
- Peso de referencia: aproximadamente 38 MB.
- Demo: flujo real de PhishNet con el Caso 1, resultado heurístico Alto, 88/100.
- El análisis no abre las URLs. La cifra se presenta como orientativa, no como veredicto.

## Contenido de la carpeta

| Ruta | Uso |
| --- | --- |
| `renders/phishnet-problematica.mp4` | Exportación final lista para presentar. |
| `index.html` | Composición editable: escenas, textos, estilos y timeline GSAP. |
| `expanded-prompt.md` | Brief de producción, dirección visual, reglas y descripción de escenas. |
| `guion-voz.md` | Propuesta opcional de locución con tiempos. |
| `assets/app-*.png` | Capturas reales de la aplicación que aparecen en la composición. |
| `assets/fonts/` | Fuentes Manrope y DM Mono usadas por la composición y sus licencias OFL. |
| `capture-app.mjs` | Script Playwright para regenerar las capturas desde la app local. |
| `preview.jpg` | Fotograma de referencia de la exportación final. |
| `review-frames/` | Fotogramas y hojas de contacto de revisión generados durante el montaje. |

## Preparar otra máquina

Desde la raíz del repositorio:

1. Instalar Node.js compatible con el proyecto y las dependencias: `npm ci`.
2. Instalar Google Chrome o Chromium. Si el ejecutable no está en una ruta estándar, definir `CHROME_PATH` con la ruta completa al navegador.
3. Iniciar PhishNet en una terminal con `npm run dev -- --host 127.0.0.1` y dejarlo en ejecución en el puerto 5173.
4. En otra terminal, regenerar las capturas si se modificó la interfaz: `node video/capture-app.mjs`.
5. Renderizar la composición con Hyperframes 0.9.15: `npx --yes hyperframes@0.9.15 render video -o video/renders/phishnet-problematica.mp4 -q delivery --workers 2`.

La carpeta contiene el material de edición y las capturas actuales. Para volver a renderizar en otra máquina, esa máquina requiere acceso a internet la primera vez para descargar el CLI de Hyperframes; `npx` usa una versión fijada para reproducir el render. No se necesita una cuenta de Hyperframes.

## Cómo editar la composición

Abrir `index.html` en un editor de código. No editar el MP4 como fuente: los cambios se hacen en HTML/CSS/GSAP y luego se renderizan otra vez.

- **Textos:** buscar el texto dentro de la etiqueta `<section id="sceneN">` correspondiente y cambiar el contenido entre etiquetas. Los textos que ya están en pantalla también se pueden localizar desde la terminal con `rg "texto" video/index.html`.
- **Escenas:** hay ocho bloques, `scene1` a `scene8`. Cada bloque contiene sus rótulos, recursos visuales y clases CSS. El orden visual se controla con `z-index`; evitar cambiar identificadores sin actualizar las referencias de la timeline.
- **Colores, tipografía y geometría:** modificar las variables y reglas del `<style>` al inicio del archivo. Las fuentes locales están definidas mediante `@font-face`; conservar sus rutas relativas bajo `assets/fonts/`.
- **Tiempos y animación:** la timeline principal usa segundos en `gsap.timeline()`. `entrance(selector, from, to, start, duration, ease)` anima un elemento; `trans(from, to, start, direction)` controla el cambio de escena. Los tiempos `start` y `duration` están en segundos. La composición dura 150 segundos, indicado por `data-duration="150"` en `#root`; si se alarga, actualizar esa duración y revisar el cierre.
- **Imagen de la app:** reemplazar una captura en `assets/` conservando el nombre esperado por el `<img>` de `index.html`, o cambiar también el atributo `src`. Mantener las capturas en formato PNG.
- **Locución:** el MP4 está sin audio por decisión del equipo. Usar `guion-voz.md` como base de grabación y sincronizar la voz en un editor de video, o incorporar una pista de audio en la composición antes de renderizar si se desea que Hyperframes la mezcle.

### Guía de ritmo actual

| Escena | Rango aproximado | Contenido |
| --- | --- | --- |
| 1 | 0–17 s | Mensaje ficticio urgente; pregunta antes del clic. |
| 2 | 17–34 s | Decisión bajo presión y señales de riesgo. |
| 3 | 34–52 s | Dificultad cotidiana para verificar mensajes. |
| 4 | 52–69 s | Propósito transformador de PhishNet. |
| 5 | 69–88 s | Presentación del producto y sus límites. |
| 6 | 88–111 s | Flujo de análisis en la interfaz real. |
| 7 | 111–132 s | Resultado 88/100, señales y aclaración heurística. |
| 8 | 132–150 s | Cierre y llamado a actuar con contexto. |

## Regenerar y comprobar

Render principal, desde la raíz del repo:

```sh
npx --yes hyperframes@0.9.15 render video -o video/renders/phishnet-problematica.mp4 -q delivery --workers 2
```

Comprobaciones de composición opcionales:

```sh
npx --yes hyperframes@0.9.15 lint video
npx --yes hyperframes@0.9.15 validate video
```

En el montaje entregado, lint no reportó errores ni avisos; la validación no encontró errores de consola y aprobó 60 elementos de texto con WCAG AA. El MP4 fue comprobado a 150 s, H.264, 1920 × 1080 y 30 fps.

## Notas para futuras ediciones

- El mensaje `banco-seguro.top` es ficticio y solo funciona como ejemplo didáctico; no reemplazarlo por datos de personas o URLs reales.
- Si cambia el motor de análisis, actualizar las capturas y el 88/100 que aparece tanto en la UI como en la composición y el guion.
- No presentar el puntaje heurístico como una certeza o garantía de detección.
- Mantener el contraste de texto. La validación de Hyperframes permite detectar regresiones de contraste y errores de consola antes de exportar.
