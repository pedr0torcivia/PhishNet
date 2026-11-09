import { chromium } from 'playwright-core'
import path from 'node:path'
import { access, mkdir } from 'node:fs/promises'
import { homedir } from 'node:os'

async function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH

  const candidates = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    path.join(homedir(), 'Applications/Google Chrome.app/Contents/MacOS/Google Chrome'),
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ]

  for (const candidate of candidates) {
    try {
      await access(candidate)
      return candidate
    } catch {}
  }

  throw new Error('No encontré Chrome o Chromium. Define CHROME_PATH con la ruta al ejecutable del navegador.')
}

const output = path.resolve('video/assets')
await mkdir(output, { recursive: true })

const browser = await chromium.launch({
  headless: true,
  executablePath: await findChrome(),
})

const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
await page.goto('http://127.0.0.1:5173/#inicio', { waitUntil: 'networkidle' })
await page.screenshot({ path: path.join(output, 'app-home.png') })
await browser.close()
