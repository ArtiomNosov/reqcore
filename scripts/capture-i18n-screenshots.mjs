#!/usr/bin/env node
/**
 * Capture Russian UI screenshots from a running Reqcore instance.
 * Usage: node scripts/capture-i18n-screenshots.mjs [baseUrl]
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { chromium } from 'playwright'

const baseUrl = process.argv[2] ?? 'http://127.0.0.1:3001'
const outDir = join(process.cwd(), 'artifacts', 'i18n-ru-screenshots')

const routes = [
  { name: 'home', path: '/' },
  { name: 'sign-in', path: '/auth/sign-in' },
  { name: 'sign-up', path: '/auth/sign-up' },
  { name: 'forgot-password', path: '/auth/forgot-password' },
  { name: 'jobs', path: '/jobs' },
  { name: 'dashboard-settings', path: '/dashboard/settings' },
]

const USER_LATIN = /\b(Dashboard|Candidates|Sign in|Save changes|Open-source ATS)\b/gi

await mkdir(outDir, { recursive: true })

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

const report = []

for (const route of routes) {
  const url = `${baseUrl.replace(/\/$/, '')}${route.path}`
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 })
  await page.waitForTimeout(800)
  const file = join(outDir, `${route.name}.png`)
  await page.screenshot({ path: file, fullPage: true })
  const text = await page.evaluate(() => document.body.innerText)
  const unexpected = [...text.matchAll(USER_LATIN)].map((m) => m[0])
  report.push({ route: route.path, url, screenshot: file, unexpectedLatin: [...new Set(unexpected)] })
}

await browser.close()
await writeFile(join(outDir, 'dom-language-report.json'), `${JSON.stringify({ baseUrl, capturedAt: new Date().toISOString(), pages: report }, null, 2)}\n`)
console.log(`Saved ${report.length} screenshots to ${outDir}`)
