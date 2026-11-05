# Arquitectura y seguridad

## Estado actual

Aplicación estática React/TypeScript. `analyzer.ts` contiene reglas puras y pesos explícitos. Para capturas, Tesseract.js y el modelo español incluido en `public/ocr` extraen texto dentro del navegador. El navegador valida, analiza y guarda un preview de hasta 72 caracteres en `localStorage`. No hay backend, base de datos, autenticación ni llamada a terceros.

## Flujo de datos

1. La persona pega un chat/texto/URL o selecciona una captura PNG, JPG o WEBP de hasta 10 MB.
2. Si hay una captura, el OCR local genera una transcripción editable de hasta 5.000 caracteres.
3. La UI valida 8–5.000 caracteres y renderiza contenido como texto de React, evitando HTML arbitrario.
4. El motor ejecuta expresiones regulares y `URL()`; nunca hace `fetch`, navegación ni DNS.
5. Devuelve señales, puntaje limitado a 100 y recomendaciones.
6. Solo un preview del texto queda localmente; la imagen no se persiste ni se sincroniza.

## Controles

- **XSS:** React escapa texto; no existe `dangerouslySetInnerHTML`.
- **SSRF:** no hay servidor ni solicitud a URLs aportadas por usuarios.
- **Secretos:** `.env` ignorado y `.env.example` sin claves.
- **Errores:** mensajes genéricos y validación previa.
- **Privacidad:** advertencia para no pegar datos sensibles; sin telemetría.
- **OCR local:** worker, núcleo WASM y modelo español se sirven con la aplicación; la captura no sale del navegador.
- **Accesibilidad:** HTML semántico, labels, estados `role=alert`, foco nativo, contraste y `prefers-reduced-motion`.

## Evolución segura

Una API de reputación debe vivir detrás de un backend proxy con allowlist de proveedor, timeout, límites de tamaño, rate limiting, protección de DNS rebinding, normalización de URL, caché y logging sin query strings. Nunca devolver la clave al cliente. Definir retención y consentimiento antes de almacenar contenido.
