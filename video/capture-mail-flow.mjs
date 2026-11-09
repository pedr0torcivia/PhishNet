import { chromium } from 'playwright-core'
import path from 'node:path'
import { mkdir } from 'node:fs/promises'

const assets = path.resolve('video/assets')
await mkdir(assets, { recursive: true })
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe' })

const mail = await browser.newPage({ viewport: { width: 1200, height: 650 }, deviceScaleFactor: 1 })
await mail.setContent(`<!doctype html><html lang="es"><meta charset="UTF-8"><style>
*{box-sizing:border-box}body{margin:0;background:#f2f4f7;font:28px Arial,sans-serif;color:#17232b;padding:38px}
main{background:white;border:1px solid #cfd7dc;box-shadow:0 8px 30px #25313c22;padding:40px 48px;height:570px}
header{font-size:18px;color:#61717a;border-bottom:1px solid #d7dfe2;padding-bottom:20px;margin-bottom:28px}
h1{font-size:34px;margin:0 0 22px}p{line-height:1.4;margin:12px 0}strong{font-weight:700}
</style><main><header>CORREO RECIBIDO · Soporte de cuenta</header><h1>Verificá tu cuenta hoy</h1>
<p><strong>URGENTE:</strong> detectamos actividad inusual.</p>
<p>Verificá tu cuenta y contraseña en</p>
<p><strong>http://banco-seguro.top/login</strong></p></main></html>`)
const mailPath = path.join(assets, 'mail-example.png')
await mail.screenshot({ path: mailPath })
await mail.close()

const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
await page.goto('http://127.0.0.1:5173/#analizar', { waitUntil: 'networkidle' })
await page.getByRole('tab', { name: 'Captura de pantalla' }).click()
await page.screenshot({ path: path.join(assets, 'app-mail-select.png') })
await page.locator('#screenshot').setInputFiles(mailPath)
await page.screenshot({ path: path.join(assets, 'app-mail-attached.png') })
await page.getByRole('button', { name: 'Analizar captura' }).click()
await page.locator('.risk-alto').waitFor({ state: 'visible', timeout: 120000 })
await page.screenshot({ path: path.join(assets, 'app-mail-result.png') })
await page.setViewportSize({ width: 1440, height: 1100 })
await page.screenshot({ path: path.join(assets, 'app-mail-result-tall.png') })
console.log('OCR:', await page.locator('#ocr-text').inputValue())
console.log('RESULTADO:', await page.locator('.score').innerText())
await browser.close()
