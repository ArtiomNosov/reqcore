/**
 * Client-side Russian UI overlay for strings not yet in i18n JSON.
 * Active only when the current locale is Russian.
 */
const REPLACEMENTS: [string, string][] = [
  ['Sign in to your account', 'Войдите в аккаунт'],
  ['Signing in…', 'Вход…'],
  ['Sign in', 'Войти'],
  ['Sign up', 'Регистрация'],
  ["Don't have an account?", 'Нет аккаунта?'],
  ['Forgot password?', 'Забыли пароль?'],
  ['Email', 'Email'],
  ['Password', 'Пароль'],
  ['New Job', 'Новая вакансия'],
  ['My Jobs', 'Мои вакансии'],
  ['More', 'Ещё'],
  ['more', 'ещё'],
  ['Select org', 'Выберите организацию'],
  ['4 new applications', '4 новых отклика'],
  ['3 new applications', '3 новых отклика'],
  ['new applications', 'новых откликов'],
  ['Views', 'Виды'],
  ['Filters', 'Фильтры'],
  ['Review', 'Проверить'],
  ['Screening', 'Скрининг'],
  ['Interview', 'Собеседование'],
  ['Offer', 'Оффер'],
  ['Hired', 'Нанят'],
  ['Rejected', 'Отклонён'],
  ['New', 'Новые'],
  ['Open', 'Открыта'],
  ['Closed', 'Закрыта'],
  ['Full-time', 'Полная занятость'],
  ['Part-time', 'Частичная занятость'],
  ['Contract', 'Контракт'],
  ['Remote', 'Удалённо'],
  ['General', 'Общие'],
  ['Localization', 'Локализация'],
  ['Members', 'Участники'],
  ['Integrations', 'Интеграции'],
  ['AI Configuration', 'Настройка ИИ'],
  ['Single Sign-On', 'Единый вход (SSO)'],
  ['Account', 'Аккаунт'],
  ['Source Tracking', 'Источники'],
  ['AI Analysis', 'ИИ-анализ'],
  ['Application Form', 'Анкета отклика'],
  ['Search candidates…', 'Поиск кандидатов…'],
  ['Search jobs by title, location, or description', 'Поиск по названию, локации или описанию'],
  ['Save changes', 'Сохранить изменения'],
  ['No results found', 'Ничего не найдено'],
  ['Live demo', 'Живое демо'],
  ['Deploy your own free instance →', 'Развернуть свою бесплатную копию →'],
]

const SORTED = [...REPLACEMENTS].sort((a, b) => b[0].length - a[0].length)
const ATTRS = ['placeholder', 'title', 'aria-label', 'alt'] as const
const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'CODE', 'PRE', 'NOSCRIPT'])

function translateText(value: string): string {
  if (!value.trim()) return value
  let out = value
  for (const [from, to] of SORTED) {
    if (out.includes(from)) out = out.split(from).join(to)
  }
  return out
}

function translateElement(root: Element) {
  if (SKIP_TAGS.has(root.tagName) || root.closest('[data-i18n-skip]')) return

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  let node = walker.nextNode()
  while (node) {
    const parent = node.parentElement
    if (parent && !SKIP_TAGS.has(parent.tagName) && !parent.closest('[data-ru-ui]')) {
      const raw = node.textContent ?? ''
      const next = translateText(raw)
      if (next !== raw) {
        node.textContent = next
        parent.setAttribute('data-ru-ui', '1')
      }
    }
    node = walker.nextNode()
  }

  root.querySelectorAll<HTMLElement>('[placeholder],[title],[aria-label],[alt]').forEach((el) => {
    if (el.closest('[data-ru-ui]')) return
    for (const attr of ATTRS) {
      const raw = el.getAttribute(attr)
      if (!raw) continue
      const next = translateText(raw)
      if (next !== raw) {
        el.setAttribute(attr, next)
        el.setAttribute('data-ru-ui', '1')
      }
    }
  })
}

export default defineNuxtPlugin((nuxtApp) => {
  const { locale } = useI18n()
  let scheduled = false
  let translating = false
  let observer: MutationObserver | null = null

  function runTranslate() {
    if (!locale.value.startsWith('ru') || translating) return
    translating = true
    try {
      translateElement(document.body)
    } finally {
      translating = false
    }
  }

  function scheduleTranslate() {
    if (!locale.value.startsWith('ru') || scheduled) return
    scheduled = true
    requestAnimationFrame(() => {
      scheduled = false
      runTranslate()
    })
  }

  function startObserver() {
    if (!locale.value.startsWith('ru') || observer) return
    scheduleTranslate()
    observer = new MutationObserver((mutations) => {
      const hasNewNodes = mutations.some((m) => m.type === 'childList' && m.addedNodes.length > 0)
      if (hasNewNodes) scheduleTranslate()
    })
    observer.observe(document.body, { childList: true, subtree: true })
  }

  nuxtApp.hook('page:finish', () => scheduleTranslate())
  watch(locale, () => scheduleTranslate())

  if (import.meta.client) {
    onMounted(startObserver)
    onUnmounted(() => observer?.disconnect())
  }
})
