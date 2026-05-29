#!/usr/bin/env node
/**
 * Capture Russian UI screenshots from a running Reqcore instance (with DB).
 * Usage: node scripts/capture-i18n-screenshots.mjs [baseUrl]
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { chromium } from 'playwright'

const baseUrl = (process.argv[2] ?? 'http://localhost:3000').replace(/\/$/, '')
const outDir = join(process.cwd(), 'artifacts', 'i18n-ru-screenshots')

const PUBLIC_ROUTES = [
  { name: 'home', path: '/' },
  { name: 'sign-in', path: '/auth/sign-in' },
  { name: 'sign-up', path: '/auth/sign-up' },
  { name: 'forgot-password', path: '/auth/forgot-password' },
  { name: 'reset-password', path: '/auth/reset-password' },
  { name: 'jobs', path: '/jobs' },
  { name: 'onboarding-create-org', path: '/onboarding/create-org' },
]

const DASHBOARD_ROUTES = [
  { name: 'dashboard', path: '/dashboard' },
  { name: 'dashboard-jobs', path: '/dashboard/jobs' },
  { name: 'dashboard-candidates', path: '/dashboard/candidates' },
  { name: 'dashboard-applications', path: '/dashboard/applications' },
  { name: 'dashboard-interviews', path: '/dashboard/interviews' },
  { name: 'dashboard-timeline', path: '/dashboard/timeline' },
  { name: 'dashboard-source-tracking', path: '/dashboard/source-tracking' },
  { name: 'dashboard-ai-analysis', path: '/dashboard/ai-analysis' },
  { name: 'dashboard-settings', path: '/dashboard/settings' },
  { name: 'dashboard-settings-account', path: '/dashboard/settings/account' },
  { name: 'dashboard-settings-members', path: '/dashboard/settings/members' },
  { name: 'dashboard-settings-localization', path: '/dashboard/settings/localization' },
  { name: 'dashboard-settings-ai', path: '/dashboard/settings/ai' },
]

const USER_LATIN =
  /\b(Sign in to your account|Sign in with SSO|Forgot password\?|Don't have an account\?|Sign in|Sign up|Save changes|Open-source ATS|applicant tracking|New Job|My Jobs|Select org|Source Tracking|AI Analysis|Get Started)\b/gi

const TECHNICAL_ALLOWLIST =
  /\b(GitHub|Google|Microsoft|Reqcore|SSO|API|JSON|POST|MinIO|Postgres|SQL|Python|FastAPI|Docker|LinkedIn|CRM|HR|IT|Git|Ollama|OpenAI|Anthropic)\b/gi

function findUnexpectedLatin(text) {
  const hits = [...text.matchAll(USER_LATIN)].map((m) => m[0])
  return [...new Set(hits)]
}

async function capture(page, route, report) {
  const url = `${baseUrl}${route.path}`
  let status = 'ok'
  let error = null
  try {
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90_000 })
    await page.waitForTimeout(6000)
    if (response && response.status() >= 500) {
      status = `http-${response.status()}`
    }
    const bodySnippet = await page.evaluate(() => document.body.innerText.slice(0, 200))
    if (
      bodySnippet.trimStart().startsWith('500')
      && bodySnippet.includes('Internal Server Error')
      && bodySnippet.length < 80
    ) {
      status = 'internal-server-error'
    }
  } catch (e) {
    status = 'navigation-error'
    error = e instanceof Error ? e.message : String(e)
  }

  const file = join(outDir, `${route.name}.png`)
  await page.screenshot({ path: file, fullPage: true })
  const text = await page.evaluate(() => document.body.innerText)
  report.push({
    route: route.path,
    name: route.name,
    url,
    status,
    error,
    screenshot: file,
    unexpectedLatin: findUnexpectedLatin(text),
    technicalLatinSamples: [...new Set([...text.matchAll(TECHNICAL_ALLOWLIST)].map((m) => m[0]))].slice(0, 20),
  })
}

async function signInDemo(context, page) {
  const response = await context.request.post(`${baseUrl}/api/auth/sign-in/email`, {
    headers: {
      'Content-Type': 'application/json',
      Origin: baseUrl,
      Referer: `${baseUrl}/auth/sign-in`,
    },
    data: { email: 'demo@reqcore.com', password: 'demo1234' },
  })

  if (!response.ok()) {
    await page.goto(`${baseUrl}/auth/sign-in`, { waitUntil: 'domcontentloaded', timeout: 90_000 })
    await page.waitForTimeout(6000)
    const emailInput = page.locator('input[type="email"], input[name="email"]').first()
    const passwordInput = page.locator('input[type="password"]').first()
    await emailInput.fill('demo@reqcore.com')
    await passwordInput.fill('demo1234')
    await page.locator('button[type="submit"]').click()
    await page.waitForURL(/\/dashboard/, { timeout: 120_000 })
  }

  const setOrg = await context.request.post(`${baseUrl}/api/auth/organization/set-active`, {
    headers: {
      'Content-Type': 'application/json',
      Origin: baseUrl,
    },
    data: { organizationSlug: 'reqcore-demo' },
  })
  if (!setOrg.ok()) {
    const body = await setOrg.text()
    throw new Error(`Set active org failed (${setOrg.status()}): ${body}`)
  }
}

async function resolveDynamicRoutes(page) {
  const dynamic = []
  try {
    const jobsRes = await page.request.get(`${baseUrl}/api/jobs?limit=5`)
    if (jobsRes.ok()) {
      const body = await jobsRes.json()
      const first = body?.data?.[0]
      if (first?.id) {
        dynamic.push(
          { name: 'dashboard-job-pipeline', path: `/dashboard/jobs/${first.id}` },
          { name: 'dashboard-job-candidates', path: `/dashboard/jobs/${first.id}/candidates` },
          { name: 'dashboard-job-ai-analysis', path: `/dashboard/jobs/${first.id}/ai-analysis` },
        )
      }
    }
  } catch {
    // ignore — optional routes
  }

  try {
    const appsRes = await page.request.get(`${baseUrl}/api/applications?limit=1`)
    if (appsRes.ok()) {
      const body = await appsRes.json()
      const first = body?.data?.[0]
      if (first?.id) {
        dynamic.push({ name: 'dashboard-application-detail', path: `/dashboard/applications/${first.id}` })
      }
    }
  } catch {
    // ignore
  }

  return dynamic
}

await mkdir(outDir, { recursive: true })

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await context.newPage()

const report = []

for (const route of PUBLIC_ROUTES) {
  await capture(page, route, report)
}

await signInDemo(context, page)

for (const route of DASHBOARD_ROUTES) {
  await capture(page, route, report)
}

const dynamicRoutes = await resolveDynamicRoutes(page)
for (const route of dynamicRoutes) {
  await capture(page, route, report)
}

await browser.close()

const summary = {
  baseUrl,
  capturedAt: new Date().toISOString(),
  demoLogin: 'demo@reqcore.com + org reqcore-demo via Better Auth API',
  totalPages: report.length,
  pagesWithUnexpectedLatin: report.filter((p) => p.unexpectedLatin.length > 0),
  pagesWithErrors: report.filter((p) => p.status !== 'ok'),
  pages: report,
}

await writeFile(join(outDir, 'dom-language-report.json'), `${JSON.stringify(summary, null, 2)}\n`)
console.log(`Saved ${report.length} screenshots to ${outDir}`)
console.log(
  `Unexpected Latin on ${summary.pagesWithUnexpectedLatin.length} page(s); errors on ${summary.pagesWithErrors.length} page(s).`,
)

if (summary.pagesWithUnexpectedLatin.length > 0) {
  process.exitCode = 1
}
