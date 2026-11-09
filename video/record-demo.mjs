// Graba una demo real de PhishNet con Playwright (sin simular resultados).
// Uso, desde la raíz del repo:  node video/record-demo.mjs [url]
// Por defecto usa la app publicada. Para la copia local: npm run dev y pasar http://127.0.0.1:5173/
// Salida: video/assets/demo/demo-raw.webm (grabación original) y demo-log.json (tiempos y resultado real).
import { chromium } from 'playwright-core'
import path from 'node:path'
import { mkdir, rename, rm, writeFile, readdir } from 'node:fs/promises'

const URL_APP = process.argv[2] || 'https://pedr0torcivia.github.io/PhishNet/'
const OUT = path.resolve('video/assets/demo')
const W = 1440, H = 900
// Mensaje ficticio pedido por el equipo + pedido de clave y dominio de prueba seguro (example.com).
const MESSAGE = 'Tu cuenta bancaria será suspendida. Verificá inmediatamente tus datos para evitar el bloqueo. Ingresá tu clave en https://example.com/verificar'

await rm(OUT, { recursive: true, force: true })
await mkdir(OUT, { recursive: true })
const browser = await chromium.launch({
  headless: true,
  args: ['--disable-spell-checking', '--disable-features=SpellCheck'],
  executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',
})
const context = await browser.newContext({
  viewport: { width: W, height: H },
  deviceScaleFactor: 1,
  locale: 'es-AR',
  recordVideo: { dir: OUT, size: { width: W, height: H } },
})
const page = await context.newPage()
const t0 = Date.now()
const marks = []
const mark = (name) => { marks.push({ name, t: +((Date.now() - t0) / 1000).toFixed(2) }); console.log(name, marks.at(-1).t) }
const wait = (ms) => page.waitForTimeout(ms)

// Cursor visible: solo dibuja la posición del mouse para quien mira la grabación.
await context.addInitScript(() => {
  addEventListener('DOMContentLoaded', () => {
    const c = document.createElement('div')
    c.id = '__demo_cursor'
    c.style.cssText = 'position:fixed;z-index:2147483647;left:0;top:0;width:26px;height:26px;pointer-events:none;transform:translate(-3px,-2px);transition:transform .08s'
    c.innerHTML = '<svg viewBox="0 0 26 26" width="26" height="26"><path d="M3 2l18 11-8 1.6L9.5 23z" fill="#071a1f" stroke="#fffdf7" stroke-width="1.6" stroke-linejoin="round"/></svg>'
    document.body.appendChild(c)
    addEventListener('mousemove', (e) => { c.style.left = e.clientX + 'px'; c.style.top = e.clientY + 'px' })
    addEventListener('mousedown', () => { c.style.transform = 'translate(-3px,-2px) scale(.82)' })
    addEventListener('mouseup', () => { c.style.transform = 'translate(-3px,-2px)' })
  })
})

const glide = async (locator, steps = 28) => {
  const box = await locator.boundingBox()
  const x = box.x + box.width / 2, y = box.y + box.height / 2
  await page.mouse.move(x, y, { steps })
  return { x, y }
}

mark('nav-start')
await page.goto(URL_APP, { waitUntil: 'networkidle' })
await page.mouse.move(W * 0.62, H * 0.62)
mark('home-visible')
await wait(3200)

// 1. Acceso: desde la portada al analizador.
const cta = page.getByRole('link', { name: /Analizar contenido/i }).first()
await glide(cta)
await wait(350)
mark('click-cta')
await cta.click()
await page.locator('#content').waitFor({ state: 'visible' })
await wait(1600)
mark('analyzer-visible')

// 2. Ingreso del mensaje.
const box = page.locator('#content')
await glide(box)
await box.click()
await wait(300)
mark('typing-start')
await box.pressSequentially(MESSAGE, { delay: 38 })
mark('typing-end')
await wait(900)

// 3. Análisis real.
const submit = page.getByRole('button', { name: /Analizar chat/i })
await glide(submit)
await wait(400)
mark('click-analyze')
await submit.click()
await page.locator('.result-panel .score').waitFor({ state: 'visible', timeout: 30000 })
mark('result-visible')
await wait(2600)

// 4. Resultados: recorrer señales y recomendaciones.
const recs = page.locator('.recommendations')
await recs.scrollIntoViewIfNeeded()
await page.mouse.move(W * 0.72, H * 0.55, { steps: 20 })
mark('recommendations-visible')
await wait(4200)

const result = {
  risk: await page.locator('.result-panel .score h2').innerText(),
  score: await page.locator('.result-panel .score strong').innerText(),
  signals: await page.locator('.result-panel .found b').allInnerTexts(),
  recommendations: await page.locator('.recommendations li').allInnerTexts(),
}
mark('end')
const video = page.video()
await context.close()
await browser.close()
const raw = path.join(OUT, 'demo-raw.webm')
await rename(await video.path(), raw)
for (const f of await readdir(OUT)) if (f.endsWith('.webm') && f !== 'demo-raw.webm') await rm(path.join(OUT, f))
await writeFile(path.join(OUT, 'demo-log.json'), JSON.stringify({ url: URL_APP, recordedAt: new Date().toISOString(), viewport: { W, H }, message: MESSAGE, marks, result }, null, 2))
console.log(JSON.stringify(result, null, 2))
