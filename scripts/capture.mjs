import { chromium } from 'playwright-core'
import path from 'node:path'

const root = process.cwd()
const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
})

for (const shot of [
  { name: 'landing-desktop.png', viewport: { width: 1440, height: 1000 } },
  { name: 'landing-mobile.png', viewport: { width: 390, height: 844 } },
]) {
  const page = await browser.newPage({ viewport: shot.viewport, deviceScaleFactor: 1 })
  await page.goto('http://127.0.0.1:5173/#inicio', { waitUntil: 'networkidle' })
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += Math.max(420, innerHeight * .75)) {
      scrollTo({ top: y, behavior: 'instant' })
      await new Promise(resolve => setTimeout(resolve, 80))
    }
    scrollTo({ top: 0, behavior: 'instant' })
    await new Promise(resolve => setTimeout(resolve, 150))
  })
  await page.screenshot({ path: path.join(root, 'design', 'screenshots', shot.name), fullPage: true })
  await page.close()
}

await browser.close()
