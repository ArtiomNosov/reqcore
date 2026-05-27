/**
 * Client-side Russian UI overlay for strings not yet in i18n JSON.
 * Active only when the current locale is Russian.
 */
const REPLACEMENTS: [string, string][] = [
  ['Email and password are required.', 'Укажите email и пароль.'],
  ['Enter your work email address to sign in with SSO.', 'Введите рабочий email для входа через SSO.'],
  ['Invalid credentials. Please try again.', 'Неверные учётные данные. Попробуйте снова.'],
  ['Sign-in failed. Please try again.', 'Не удалось войти. Попробуйте снова.'],
  ['SSO authentication failed. Please try again.', 'Ошибка SSO. Попробуйте снова.'],
  ['SSO sign-in failed. Please try again.', 'Не удалось войти через SSO. Попробуйте снова.'],
  ['Social sign-in failed. Please try again.', 'Не удалось войти через соцсеть. Попробуйте снова.'],
  ['No SSO provider found for this email domain. Sign in with email and password instead.', 'Для этого домена email SSO не настроен. Войдите по email и паролю.'],
  ['Sign In — Reqcore', 'Вход — Reqcore'],
  ['Sign in to your Reqcore account', 'Войдите в аккаунт Reqcore'],
  ['Sign Up — Reqcore', 'Регистрация — Reqcore'],
  ['Create your Reqcore account', 'Создайте аккаунт Reqcore'],
  ['Forgot Password — Reqcore', 'Восстановление пароля — Reqcore'],
  ['Reset Password — Reqcore', 'Новый пароль — Reqcore'],
  ['Sign in', 'Войти'],
  ['Sign up', 'Регистрация'],
  ['Sign out', 'Выйти'],
  ['Log in', 'Войти'],
  ['Log out', 'Выйти'],
  ['Create account', 'Создать аккаунт'],
  ['Forgot password?', 'Забыли пароль?'],
  ['Reset password', 'Сбросить пароль'],
  ['Email address', 'Email'],
  ['Password', 'Пароль'],
  ['Confirm password', 'Подтвердите пароль'],
  ['Remember me', 'Запомнить меня'],
  ['Continue with', 'Продолжить с'],
  ['Or continue with email', 'Или войдите по email'],
  ['Work email', 'Рабочий email'],
  ['Your name', 'Ваше имя'],
  ['New Job', 'Новая вакансия'],
  ['Get started', 'Начать работу'],
  ['Feedback', 'Обратная связь'],
  ['Notifications', 'Уведомления'],
  ['Search jobs by title or location…', 'Поиск вакансий по названию или локации…'],
  ['Search jobs by title, location, or description', 'Поиск по названию, локации или описанию'],
  ['Search candidates…', 'Поиск кандидатов…'],
  ['Search members…', 'Поиск участников…'],
  ['Search by name, date, or keyword…', 'Поиск по имени, дате или ключевому слову…'],
  ['No results found', 'Ничего не найдено'],
  ['No results', 'Нет результатов'],
  ['Loading…', 'Загрузка…'],
  ['Loading...', 'Загрузка…'],
  ['Save changes', 'Сохранить изменения'],
  ['Save draft', 'Сохранить черновик'],
  ['Delete', 'Удалить'],
  ['Cancel', 'Отмена'],
  ['Edit', 'Редактировать'],
  ['Apply', 'Применить'],
  ['Submit', 'Отправить'],
  ['Close', 'Закрыть'],
  ['Back', 'Назад'],
  ['Next', 'Далее'],
  ['Previous', 'Назад'],
  ['Create', 'Создать'],
  ['Update', 'Обновить'],
  ['Remove', 'Удалить'],
  ['Upload', 'Загрузить'],
  ['Download', 'Скачать'],
  ['Copy', 'Копировать'],
  ['Copied', 'Скопировано'],
  ['General', 'Общие'],
  ['Localization', 'Локализация'],
  ['Members', 'Участники'],
  ['Integrations', 'Интеграции'],
  ['AI Configuration', 'Настройка ИИ'],
  ['Single Sign-On', 'Единый вход (SSO)'],
  ['Account', 'Аккаунт'],
  ['Settings', 'Настройки'],
  ['Profile', 'Профиль'],
  ['Organization', 'Организация'],
  ['Open Positions', 'Открытые вакансии'],
  ['Open positions', 'Открытые вакансии'],
  ['Job Board', 'Доска вакансий'],
  ['Candidates', 'Кандидаты'],
  ['Candidate', 'Кандидат'],
  ['Applications', 'Отклики'],
  ['Application', 'Отклик'],
  ['Interviews', 'Собеседования'],
  ['Interview', 'Собеседование'],
  ['Timeline', 'Хронология'],
  ['Source Tracking', 'Источники'],
  ['AI Analysis', 'ИИ-анализ'],
  ['AI scoring', 'ИИ-оценка'],
  ['Match score', 'Оценка соответствия'],
  ['match score', 'оценка соответствия'],
  ['Ranking', 'Ранжирование'],
  ['Top candidates', 'Лучшие кандидаты'],
  ['Skills', 'Навыки'],
  ['Experience', 'Опыт'],
  ['Education', 'Образование'],
  ['Resume', 'Резюме'],
  ['Resumes', 'Резюме'],
  ['Upload resume', 'Загрузить резюме'],
  ['Job description', 'Описание вакансии'],
  ['Evaluation criteria', 'Критерии оценки'],
  ['Generate criteria', 'Сгенерировать критерии'],
  ['Cover letter', 'Сопроводительное письмо'],
  ['Gallery view', 'Галерея'],
  ['List view', 'Список'],
  ['Table view', 'Таблица'],
  ['Filter jobs', 'Фильтр вакансий'],
  ['Filters', 'Фильтры'],
  ['Switch to light mode', 'Светлая тема'],
  ['Switch to dark mode', 'Тёмная тема'],
  ['Translation incomplete', 'Перевод неполный'],
  ['Powered by', 'На базе'],
  ['Live demo', 'Живое демо'],
  ['User', 'Пользователь'],
  ['Draft', 'Черновик'],
  ['Open', 'Открыта'],
  ['Closed', 'Закрыта'],
  ['Archived', 'В архиве'],
  ['Pipeline', 'Воронка'],
  ['Table', 'Таблица'],
  ['Application Form', 'Анкета отклика'],
  ['Assistant', 'Ассистент'],
  ['More', 'Ещё'],
  ['Dashboard', 'Панель управления'],
  ['Jobs', 'Вакансии'],
  ['Job', 'Вакансия'],
  ['Features', 'Возможности'],
  ['Roadmap', 'Дорожная карта'],
  ['Blog', 'Блог'],
]

const SORTED = [...REPLACEMENTS].sort((a, b) => b[0].length - a[0].length)

const ATTRS = ['placeholder', 'title', 'aria-label', 'alt'] as const

const SKIP_PARENT_TAGS = new Set(['SCRIPT', 'STYLE', 'CODE', 'PRE', 'NOSCRIPT'])

function translateText(value: string): string {
  if (!value.trim()) return value
  let out = value
  for (const [from, to] of SORTED) {
    if (out.includes(from)) out = out.split(from).join(to)
  }
  return out
}

function shouldSkipNode(node: Node): boolean {
  const parent = node.parentElement
  if (!parent) return true
  let el: Element | null = parent
  while (el) {
    if (SKIP_PARENT_TAGS.has(el.tagName)) return true
    if (el.closest('[data-i18n-skip]')) return true
    el = el.parentElement
  }
  return false
}

function translateTextNode(node: Text) {
  if (shouldSkipNode(node)) return
  const next = translateText(node.textContent ?? '')
  if (next !== node.textContent) node.textContent = next
}

function translateElement(root: Element) {
  if (SKIP_PARENT_TAGS.has(root.tagName)) return

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  let current = walker.nextNode()
  while (current) {
    translateTextNode(current as Text)
    current = walker.nextNode()
  }

  if (root instanceof HTMLElement) {
    for (const attr of ATTRS) {
      const raw = root.getAttribute(attr)
      if (!raw) continue
      const next = translateText(raw)
      if (next !== raw) root.setAttribute(attr, next)
    }
  }

  root.querySelectorAll<HTMLElement>('*').forEach((el) => {
    for (const attr of ATTRS) {
      const raw = el.getAttribute(attr)
      if (!raw) continue
      const next = translateText(raw)
      if (next !== raw) el.setAttribute(attr, next)
    }
  })
}

export default defineNuxtPlugin(() => {
  const { locale } = useI18n()

  let scheduled = false
  function scheduleTranslate() {
    if (scheduled) return
    scheduled = true
    requestAnimationFrame(() => {
      scheduled = false
      if (!locale.value.startsWith('ru')) return
      translateElement(document.body)
    })
  }

  function startObserver() {
    if (!locale.value.startsWith('ru')) return
    scheduleTranslate()
    const observer = new MutationObserver(() => scheduleTranslate())
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    })
  }

  watch(locale, () => scheduleTranslate())

  if (import.meta.client) {
    onMounted(startObserver)
  }
})
