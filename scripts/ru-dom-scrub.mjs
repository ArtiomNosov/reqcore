/** Phrase-only DOM scrub for screenshots (no Latin→Cyrillic homoglyphs). */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dir = dirname(fileURLToPath(import.meta.url))
const dataPath = join(__dir, '../app/plugins/ru-replacements-data.ts')
const raw = readFileSync(dataPath, 'utf8')
const pairs = [...raw.matchAll(/\['([^']*)', '([^']*)'\]/g)].map((m) => [m[1], m[2]])
const SORTED = pairs.sort((a, b) => b[0].length - a[0].length)

export function scrubText(value) {
  if (!value?.trim()) return value
  let out = value
  for (const [from, to] of SORTED) {
    if (out.includes(from)) out = out.split(from).join(to)
  }
  out = out.replace(/(\d+)\s*m ago/gi, '$1 мин назад')
  out = out.replace(/(\d+)\s*h ago/gi, '$1 ч назад')
  out = out.replace(/(\d+)\s*d ago/gi, '$1 дн назад')
  return out
}

export const SCRUB_PAIRS = SORTED

export async function applyDomScrub(page) {
  await page.evaluate((pairs) => {
    function scrubText(value) {
      if (!value || !String(value).trim()) return value
      let out = String(value)
      for (const [from, to] of pairs) {
        if (out.includes(from)) out = out.split(from).join(to)
      }
      out = out.replace(/(\d+)\s*m ago/gi, '$1 мин назад')
      out = out.replace(/(\d+)\s*h ago/gi, '$1 ч назад')
      out = out.replace(/(\d+)\s*d ago/gi, '$1 дн назад')
      return out
    }
    const skip = new Set(['SCRIPT', 'STYLE', 'PRE', 'NOSCRIPT'])
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    let n = walker.nextNode()
    while (n) {
      const p = n.parentElement
      if (p && !skip.has(p.tagName)) {
        const next = scrubText(n.textContent)
        if (next !== n.textContent) n.textContent = next
      }
      n = walker.nextNode()
    }
    for (const el of document.querySelectorAll('[placeholder],[title],[aria-label],[alt]')) {
      for (const attr of ['placeholder', 'title', 'aria-label', 'alt']) {
        const raw = el.getAttribute(attr)
        if (!raw) continue
        const next = scrubText(raw)
        if (next !== raw) el.setAttribute(attr, next)
      }
    }
  }, SCRUB_PAIRS)
}
