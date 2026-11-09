# Guion de voz — v2 (120 s)

La v2 conserva la locución humana del equipo (`assets/voice-original.mp3`) donde sigue sirviendo y agrega frases nuevas para Abundancia, Mercado y la demo grabada. Esas frases nuevas tienen hoy una **pista guía sintética** (Kokoro, voz `ef_dora`) en `assets/voice-guia/`. Para el video final conviene que el equipo las grabe y reemplace cada archivo `.wav` **con el mismo nombre**: la composición no cambia.

Columna "Fuente": **Equipo** = fragmento de `voice-original.mp3` (inicio dentro del archivo entre corchetes). **Guía** = archivo nuevo a regrabar. La duración indicada es el espacio disponible; grabar un poco más corto es mejor que más largo.

| Tiempo en el video | Escena | Fuente | Texto |
| --- | --- | --- | --- |
| 0:00–0:23.6 | Problema (1 y 2) | Equipo, persona 1 [0:00] | Llega un mensaje inesperado. Dice que detectaron actividad inusual y que tu cuenta podría suspenderse hoy. Te pide verificar tus datos de inmediato. ¿Harías clic en ese enlace? La urgencia nos empuja a responder antes de pensar. Conviene frenar un momento y hacerse tres preguntas. ¿Quién envió el mensaje? ¿A dónde lleva el enlace? ¿Por qué pide mis datos? |
| 0:24.2–0:37.4 | Problema → PTM | Equipo, persona 2 [0:33.76] | Reconocer estas señales lleva tiempo. Por eso creamos PhishNet. Queremos que la seguridad digital sea accesible para todos. El proyecto ayuda a comprender qué mirar antes de decidir, con explicaciones claras para situaciones cotidianas. |
| 0:38.3–0:52.7 (≤ 14,5 s) | Abundancia | Guía `g01-abundancia.wav` | Y hoy, los recursos para lograrlo abundan. PhishNet ya aprovecha el código abierto y la nube: lee capturas con un OCR libre y se publica sin costo. Lo que viene: inteligencia artificial, APIs de reputación y datos de comunidades de ciberseguridad. |
| 0:53.2–1:08.8 (≤ 15,6 s) | Mercado | Guía `g02-mercado.wav` | Entramos en un mercado existente, pero resegmentado. Google Safe Browsing, VirusTotal o Microsoft Defender ya protegen, con un enfoque técnico. PhishNet le habla a quien usa banca digital, compra o chatea sin saber de ciberseguridad. Más adelante, también a las PyMEs. |
| 1:09.4–1:13.9 | Solución | Equipo, persona 3 [0:46.96] | PhishNet es una demo que analiza mensajes, correos y capturas. |
| 1:15.6–1:18.0 (≤ 2,4 s) | Demo | Guía `g03-demo-intro.wav` | Probémoslo en la aplicación publicada. |
| 1:21.4–1:27.9 (≤ 6,5 s) | Demo, mientras se tipea | Guía `g04-demo-mensaje.wav` | Pegamos un mensaje sospechoso: tu cuenta bancaria será suspendida, verificá tus datos, ingresá tu clave. |
| 1:28.4–1:32.2 (≤ 3,8 s) | Demo, clic en Analizar (1:29.6) | Guía `g05-demo-analizar.wav` | Tocamos Analizar. Todo ocurre en el navegador, sin abrir el enlace. |
| 1:35.2–1:40.2 (≤ 5 s) | Resultado | Guía `g06-demo-resultado.wav` | Riesgo alto, cincuenta y dos sobre cien: detecta urgencia y pedido de credenciales. |
| 1:40.6–1:45.3 (≤ 4,7 s) | Resultado | Guía `g07-demo-consejos.wav` | Y explica qué hacer: no abrir enlaces y contactar a la entidad por un canal oficial. |
| 1:46.3–1:59.8 | Cierre con QR | Equipo, persona 4 [1:25.6] | Si un mensaje te genera dudas, detente y confirma por un canal oficial. PhishNet acompaña esa decisión con contexto. Frená, analizá y recién después, actuá. Seguridad digital accesible para todos. |

## Cómo reemplazar la pista guía

1. Grabar cada frase por separado (WAV o MP3, sin música, con poco silencio al inicio).
2. Guardarla en `video/assets/voice-guia/` con el nombre de la tabla. Si cambia la extensión, actualizar el `src` del `<audio>` con el mismo `id` en `video/index.html`.
3. Si la nueva toma dura distinto, ajustar `data-duration` (y si hace falta `data-start`) del `<audio>` correspondiente. El volumen se nivela con `data-volume` (1 = 0 dB; las voces del equipo se dejaron cerca de −21 LUFS).
4. Volver a renderizar (ver `README.md`).

## Datos verificados de la demo

- Grabación: `assets/demo/demo-raw.webm`, hecha con `record-demo.mjs` sobre https://pedr0torcivia.github.io/PhishNet/ el 9/11/2026.
- Mensaje ficticio: "Tu cuenta bancaria será suspendida. Verificá inmediatamente tus datos para evitar el bloqueo. Ingresá tu clave en https://example.com/verificar".
- Resultado real devuelto por la app: **Alto, 52/100**. Señales: Presión o urgencia (+22) y Solicitud de credenciales (+30). Recomendaciones: no abrir enlaces ni descargar archivos; contactar a la organización por su sitio o teléfono oficial; si se compartieron datos, cambiar claves y avisar a la entidad.
- La frase sugerida originalmente, sin el pedido de clave, devuelve **Bajo, 22/100** (solo detecta urgencia). Por eso se agregó "Ingresá tu clave en…": es una señal típica de phishing y deja ver más de una señal. Ver la nota del README.
