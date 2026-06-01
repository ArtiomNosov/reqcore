/**
 * Generates server/scripts/seed-data-ru.ts with ASCII-only Unicode escapes
 * so Windows editors cannot corrupt Cyrillic on save.
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = join(__dirname, '../server/scripts/seed-data-ru.ts')

function escStr(s) {
  let out = ''
  for (const ch of s) {
    const code = ch.charCodeAt(0)
    if (code > 0x7e || code < 0x20) {
      if (ch === '\n') out += '\\n'
      else if (ch === '\r') out += '\\r'
      else if (ch === '\t') out += '\\t'
      else out += `\\u${code.toString(16).padStart(4, '0')}`
    }
    else if (ch === '\\') out += '\\\\'
    else if (ch === "'") out += "\\'"
    else out += ch
  }
  return `'${out}'`
}

function escTpl(s) {
  let out = ''
  for (const ch of s) {
    const code = ch.charCodeAt(0)
    if (code > 0x7e || (code < 0x20 && ch !== '\n')) {
      if (ch === '\n') out += '\\n'
      else out += `\\u${code.toString(16).padStart(4, '0')}`
    }
    else if (ch === '\\') out += '\\\\'
    else if (ch === '`') out += '\\`'
    else if (ch === '$') out += '\\$'
    else out += ch
  }
  return `\`${out}\``
}

const DEMO_ORG_NAME_RU = 'Демо Реккор'

const JOBS_DATA_RU = [
  {
    title: 'Старший разработчик полного стека',
    description: `Ищем старшего разработчика полного стека для развития платформы Реккор. Вы будете вести сквозные фичи на фронтенде, бэкенде и инфраструктуре.

**Обязанности**
- Разработка фич от исследования до продакшена
- Архитектурные решения для мультитенантности и надёжности
- Совместная работа с продуктом и дизайном
- Код-ревью, тесты, наблюдаемость

**Требования**
- 5+ лет коммерческой веб-разработки
- Уверенная работа с типизированным стеком на фронте и бэкенде
- Опыт с компонентными фреймворками и серверным рендерингом
- Реляционная СУБД, непрерывная интеграция, контейнеризация

**Плюсом**
- Опыт HR-платформ или корпоративных B2B-продуктов
- Практика с очередями и фоновой обработкой`,
    location: 'Москва, гибрид (офис)',
    type: 'full_time',
    status: 'open',
  },
  {
    title: 'Продуктовый дизайнер',
    description: `Проектируем интерфейсы найма: воронки, карточки, отчёты. Работа с продуктом и разработкой.

**Обязанности**
- Макеты от исследования до UI в проде
- Дизайн-система HR-платформы
- Согласование с продуктовой командой
- Юзабилити-тесты ключевых сценариев

**Требования**
- 3+ года продуктового дизайна, B2B SaaS
- Сильное портфолио
- Макеты, прототипы, дизайн-спецификации`,
    location: 'Удалённо (ЕС)',
    type: 'full_time',
    status: 'open',
  },
  {
    title: 'Инженер по эксплуатации',
    description: `Поддержка непрерывной доставки, мониторинга и инфраструктуры для облачного и выделенного развёртывания.

**Обязанности**
- Пайплайны сборки и выкладки
- Алертинг, логи, регламенты
- Резервное копирование СУБД и объектного хранилища

**Требования**
- 3+ года эксплуатации
- Оркестрация контейнеров, Linux, CI
- Шифрование, секреты, наблюдаемость`,
    location: 'Удалённо (любой TZ)',
    type: 'contract',
    status: 'open',
  },
  {
    title: 'Технический писатель (документация продукта)',
    description: `Документация для интеграторов, админов и разработчиков: гайды, API, устранение неполадок.

**Требования**
- 2+ года технического писательства
- Разметка, понятные гайды и справочники
- Опыт developer docs`,
    location: 'Удалённо (ЕС)',
    type: 'part_time',
    status: 'open',
  },
  {
    title: 'Стажёр клиентской разработки',
    description: `Стажировка 6 месяцев: компонентный фронтенд, адаптивная вёрстка, код-ревью и тесты.

**Требования**
- Курс CS или сильное портфолио
- Вёрстка, стили, скрипты
- Желание учиться в паре с ментором`,
    location: 'Берлин (офис)',
    type: 'internship',
    status: 'draft',
  },
]

const CANDIDATES_DATA_RU = [
  { firstName: 'Елена', lastName: 'Смирнова', email: 'elena.smirnova@example.com', phone: '+7 916 123 4567' },
  { firstName: 'Алексей', lastName: 'Козлов', email: 'alexey.kozlov@example.com', phone: '+7 903 234 5678' },
  { firstName: 'Мария', lastName: 'Волкова', email: 'maria.volkova@example.com', phone: '+49 170 3456789' },
  { firstName: 'Дмитрий', lastName: 'Новиков', email: 'dmitry.novikov@example.com', phone: '+31 6 45678901' },
  { firstName: 'Анна', lastName: 'Морозова', email: 'anna.morozova@example.com', phone: '+33 6 56789012' },
  { firstName: 'Иван', lastName: 'Петров', email: 'ivan.petrov@example.com', phone: '+44 7700 678901' },
  { firstName: 'София', lastName: 'Лебедева', email: 'sofia.lebedeva@example.com', phone: '+7 925 789 0123' },
  { firstName: 'Никита', lastName: 'Соколов', email: 'nikita.sokolov@example.com', phone: '+81 90 8901234' },
  { firstName: 'Ольга', lastName: 'Кузнецова', email: 'olga.kuznetsova@example.com', phone: '+46 70 901 23 45' },
  { firstName: 'Артём', lastName: 'Васильев', email: 'artem.vasiliev@example.com', phone: '+91 98765 01234' },
  { firstName: 'Екатерина', lastName: 'Иванова', email: 'katerina.ivanova@example.com', phone: '+34 612 123 456' },
  { firstName: 'Павел', lastName: 'Медведев', email: 'pavel.medvedev@example.com', phone: '+971 50 234 5678' },
  { firstName: 'Юлия', lastName: 'Фёдорова', email: 'yulia.fedorova@example.com', phone: '+49 172 3456780' },
  { firstName: 'Максим', lastName: 'Орлов', email: 'maxim.orlov@example.com', phone: '+33 7 45 67 89 01' },
  { firstName: 'Виктория', lastName: 'Зайцева', email: 'viktoria.zaitseva@example.com', phone: '+82 10 5678 9012' },
  { firstName: 'Сергей', lastName: 'Попов', email: 'sergey.popov@example.com', phone: '+7 916 678 9012' },
  { firstName: 'Наталия', lastName: 'Соловьёва', email: 'natalia.solovieva@example.com', phone: '+46 73 789 01 23' },
  { firstName: 'Андрей', lastName: 'Виноградов', email: 'andrey.vinogradov@example.com', phone: '+351 912 890 123' },
  { firstName: 'Татьяна', lastName: 'Белова', email: 'tatiana.belova@example.com', phone: '+1 415 901 2345' },
  { firstName: 'Кирилл', lastName: 'Комаров', email: 'kirill.komarov@example.com', phone: '+84 90 012 3456' },
  { firstName: 'Екатерина', lastName: 'Романова', email: 'ekaterina.romanova@example.com', phone: '+45 20 12 34 56' },
  { firstName: 'Глеб', lastName: 'Егоров', email: 'gleb.egorov@example.com', phone: '+962 79 123 4567' },
  { firstName: 'Дарья', lastName: 'Ковалева', email: 'darya.kovaleva@example.com', phone: '+48 501 234 567' },
  { firstName: 'Роман', lastName: 'Никитин', email: 'roman.nikitin@example.com', phone: '+1 212 345 6789' },
  { firstName: 'Алина', lastName: 'Павлова', email: 'alina.pavlova@example.com', phone: '+91 99887 76655' },
  { firstName: 'Игорь', lastName: 'Семёнов', email: 'igor.semenov@example.com', phone: '+49 175 4567890' },
  { firstName: 'Вера', lastName: 'Голубева', email: 'vera.golubeva@example.com', phone: '+46 76 567 89 01' },
  { firstName: 'Михаил', lastName: 'Степанов', email: 'mikhail.stepanov@example.com', phone: '+55 11 98765 4321' },
  { firstName: 'Полина', lastName: 'Андреева', email: 'polina.andreeva@example.com', phone: '+33 6 98 76 54 32' },
  { firstName: 'Олег', lastName: 'Макаров', email: 'oleg.makarov@example.com', phone: '+92 300 1234567' },
]

const FULLSTACK_QUESTIONS_RU = [
  { type: 'short_text', label: 'Лет опыта с типизированным стеком', required: true },
  { type: 'single_select', label: 'Предпочитаемый frontend-фреймворк', options: ['Вью', 'Реакт', 'Свелте', 'Ангуляр', 'Солид'], required: true },
  { type: 'long_text', label: 'Опишите сложный продакшен-баг, который вы закрыли', required: true },
  { type: 'url', label: 'Ссылка на репозиторий или портфолио', required: false },
  { type: 'single_select', label: 'Когда можете выйти на работу', options: ['Сразу', '2 недели', '1 месяц', '2–3 месяца'], required: true },
]

const DESIGNER_QUESTIONS_RU = [
  { type: 'url', label: 'Ссылка на портфолио', required: true },
  { type: 'single_select', label: 'Основной инструмент макетов', options: ['Фигма', 'Скетч', 'Адобе ИксДи', 'Фреймер'], required: true },
  { type: 'long_text', label: 'Опишите кейс редизайна воронки найма', required: true },
  { type: 'checkbox', label: 'Есть опыт в HR-продуктах', required: false },
]

const DEVOPS_QUESTIONS_RU = [
  { type: 'multi_select', label: 'В каких облаках работали', options: ['Амазон', 'Гугл', 'Азур', 'Хетцнер', 'ДиджиталОушен', 'Другое'], required: true },
  { type: 'short_text', label: 'Лет опыта с оркестрацией', required: true },
  { type: 'single_select', label: 'Предпочитаемая CI-система', options: ['Действия на хосте кода', 'Гитлаб CI', 'Дженкинс', 'Сёркл', 'Другое'], required: true },
]

const JOB_CRITERIA_RU = [
  [
    { key: 'core_tech_stack', name: 'Соответствие основному стеку', description: 'Насколько навыки кандидата совпадают с типизированным стеком, компонентным фронтендом и реляционной СУБД, необходимыми для роли.', category: 'technical', maxScore: 10, weight: 70, displayOrder: 0 },
    { key: 'system_design', name: 'Системный дизайн и архитектура', description: 'Опыт проектирования систем: мультитенантность, масштабирование, архитектурные решения в продакшене.', category: 'technical', maxScore: 10, weight: 55, displayOrder: 1 },
    { key: 'engineering_practices', name: 'Инженерные практики', description: 'Тестирование, непрерывная интеграция, код-ревью, документация, зрелость процесса разработки.', category: 'technical', maxScore: 10, weight: 40, displayOrder: 2 },
    { key: 'relevant_experience', name: 'Релевантный опыт', description: 'Годы и глубина опыта веб-разработки, желательно B2B SaaS или workflow-продуктах.', category: 'experience', maxScore: 10, weight: 50, displayOrder: 3 },
    { key: 'leadership_collab', name: 'Лидерство и сотрудничество', description: 'Менторство, техническое лидерство, кросс-функциональная коммуникация.', category: 'soft_skills', maxScore: 10, weight: 30, displayOrder: 4 },
  ],
  [
    { key: 'portfolio_quality', name: 'Качество портфолио и влияние', description: 'Глубина портфолио, сквозное решение задач, измеримый бизнес-эффект.', category: 'experience', maxScore: 10, weight: 70, displayOrder: 0 },
    { key: 'design_process', name: 'Дизайн-процесс и исследования', description: 'Исследования, прототипы, юзабилити-тесты, итерации на основе данных.', category: 'soft_skills', maxScore: 10, weight: 55, displayOrder: 1 },
    { key: 'ux_visual_craft', name: 'UX и визуальная проработка', description: 'Информационная архитектура, иерархия, доступность, дизайн-система.', category: 'technical', maxScore: 10, weight: 50, displayOrder: 2 },
    { key: 'cross_functional', name: 'Кросс-функциональное взаимодействие', description: 'Работа с разработкой, продуктом и стейкхолдерами, передача макетов.', category: 'soft_skills', maxScore: 10, weight: 40, displayOrder: 3 },
    { key: 'domain_knowledge', name: 'B2B SaaS и продуктовое мышление', description: 'Опыт data-heavy интерфейсов и B2B-продуктов.', category: 'experience', maxScore: 10, weight: 35, displayOrder: 4 },
  ],
  [
    { key: 'infrastructure', name: 'Инфраструктура и облака', description: 'Оркестрация контейнеров, облачные платформы, Linux, инфраструктура как код.', category: 'technical', maxScore: 10, weight: 65, displayOrder: 0 },
    { key: 'cicd_automation', name: 'CI/CD и автоматизация', description: 'Пайплайны сборки и выкладки, автоматизация релизов.', category: 'technical', maxScore: 10, weight: 55, displayOrder: 1 },
    { key: 'observability', name: 'Наблюдаемость и инциденты', description: 'Мониторинг, алертинг, регламенты, реагирование на инциденты.', category: 'technical', maxScore: 10, weight: 45, displayOrder: 2 },
    { key: 'security_compliance', name: 'Безопасность и соответствие', description: 'Шифрование, секреты, сеть, резервное копирование.', category: 'technical', maxScore: 10, weight: 40, displayOrder: 3 },
    { key: 'relevant_experience', name: 'Релевантный опыт', description: 'Опыт эксплуатации SaaS или выделенных развёртываний.', category: 'experience', maxScore: 10, weight: 45, displayOrder: 4 },
  ],
]

const INTERVIEW_TITLE_RU = {
  'Initial Phone Screen': 'Первичный телефонный скрининг',
  'Technical Interview - System Design & Coding': 'Техническое собеседование — системный дизайн и код',
  'Final Panel - Culture & Leadership': 'Финальная панель — культура и лидерство',
  'Recruiter Screen': 'Скрининг с рекрутером',
  'Technical Deep-Dive - Full-Stack Architecture': 'Техническое погружение — архитектура полного стека',
  'Hiring Manager Interview': 'Собеседование с руководителем найма',
  'Introductory Call': 'Вводный звонок',
  'Technical Assessment - Live Coding': 'Техническая оценка — лайв-кодинг',
  'Recruiter Phone Screen': 'Телефонный скрининг с рекрутером',
  'Technical Interview - Architecture & Problem Solving': 'Техническое собеседование — архитектура и задачи',
  'Initial Video Screen': 'Первичный видеоскрининг',
  'Phone Screen': 'Телефонный скрининг',
  'Portfolio Review & Design Discussion': 'Обзор портфолио и обсуждение дизайна',
  'Design Challenge Debrief & Team Fit': 'Разбор дизайн-задания и fit с командой',
  'Portfolio Walkthrough & Design Process': 'Презентация портфолио и процесса',
  'Introductory Design Interview': 'Вводное дизайн-собеседование',
  'Initial Screening Call': 'Первичный скрининговый звонок',
  'Design Exercise Review & Discussion': 'Разбор дизайн-упражнения и обсуждение',
  'Technical Screen - Infrastructure & CI/CD': 'Технический скрининг — инфраструктура и CI/CD',
  'System Design - Deployment Architecture': 'Системный дизайн — архитектура выкладки',
  'Introductory Technical Call': 'Вводный технический звонок',
  'Hands-On Technical Challenge Review': 'Разбор практического технического задания',
  'Technical Assessment - Container Orchestration': 'Техническая оценка — оркестрация контейнеров',
  'Technical Deep-Dive - Infrastructure as Code': 'Техническое погружение — инфраструктура как код',
  'Writing Sample Review & Discussion': 'Разбор письменной работы и обсуждение',
  'Editorial Discussion & Team Integration': 'Редакционное обсуждение и интеграция в команду',
  'Technical Writing Assessment Review': 'Разбор оценки технического письма',
  'Introductory Call (Rescheduled)': 'Вводный звонок (перенесён)',
  'Intro Call - Internship Overview': 'Вводный звонок — обзор стажировки',
  'Technical Screen - Frontend Fundamentals': 'Технический скрининг — основы фронтенда',
  'Internship Interview - Skills & Motivation': 'Собеседование на стажировку — навыки и мотивация',
}

const INTERVIEWER_NAME_RU = {
  'Anna Weiss': 'Анна Вайс',
  'Marcus Reiter': 'Марк Райтер',
  'Sarah Chen': 'Сара Чен',
  'Thomas Berger': 'Томас Бергер',
  'Lisa Hoffmann': 'Лиза Хоффман',
  'Daniel Krause': 'Даниил Краузе',
  'Julia Engel': 'Юлия Энгель',
}

const INTERVIEW_LOCATION_RU = {
  'Google Meet': 'Видеозвонок',
}

const TRACKING_LINK_NAMES_RU = [
  'Профессиональная сеть — старший инженер весна 2026',
  'Доска вакансий — инженер полного стека',
  'IT-вакансии — старший разработчик',
  'Рекомендация сотрудника — команда разработки',
  'Профессиональная сеть — продуктовый дизайнер ЕС',
  'Портфолио-доска — позиция дизайнера',
  'Соцсеть — тред о найме дизайнеров',
  'Профессиональная сеть — DevOps контракт удалённо',
  'Удалённая работа — вакансия DevOps',
  'Сообщество — пост о найме DevOps',
  'Рассылка — техписатель частичная занятость',
  'Карьерный сайт — технический писатель',
  'Студенческий подбор — стажёр фронтенд Берлин',
  'Ярмарка вуза — QR стенда',
  'Страница компании — все роли',
  'Агрегатор — список вакансий',
  'Агентство — пайплайн Q1',
  'Соцсеть — группа IT-вакансий Берлин',
  'Отзывы о работодателе — профиль компании',
]

const RU_APP_NOTES = {
  hired: [
    'Отличное техническое интервью, сильная культура команды. Оффер принят.',
    'Сильный DevOps: опыт с observability. Предложение принято.',
  ],
  offer: [
    'Прошёл system design. Ждём ответ по компенсации.',
    'Сильный backend. Рекомендация положительная.',
    'Хорошая коммуникация. Согласуем дату выхода.',
    'Сильные writing samples. Берём в штат.',
  ],
  interview: [
    'Сильное резюме. Назначена панель на следующей неделе.',
    'Релевантный опыт SaaS. Техническое собеседование.',
    'Хорошие ответы на скрининг. Ждём слот панели.',
    'Сильное портфолио. Walkthrough запланирован.',
  ],
  screening: [
    'Релевантный опыт SaaS. Продолжаем скрининг.',
    'Уверенный типизированный стек. Есть вопросы по домену.',
    'Сильное портфолио. Обсудим SSR.',
    'Сильный research-проект. Продуктовый фокус.',
  ],
  new: [
    'Свежий опыт с Nuxt. На рассмотрении ревьюером.',
    'Сильный open-source вклад. В очереди на скрининг.',
  ],
  rejected: [
    'Слишком мало senior для нашей роли.',
    'Нужен backend-ownership в прошлых ролях.',
    'Сильнее бренд/campaign, чем product.',
    'Слабее fundamentals в системном дизайне.',
  ],
}

function emitJob(j) {
  return `  {
    title: ${escStr(j.title)},
    description: ${escTpl(j.description)},
    location: ${escStr(j.location)},
    type: '${j.type}' as const,
    status: '${j.status}' as const,
  }`
}

function emitCandidate(c) {
  return `  { firstName: ${escStr(c.firstName)}, lastName: ${escStr(c.lastName)}, email: '${c.email}', phone: '${c.phone}' }`
}

function emitQuestion(q) {
  const opts = q.options ? `, options: [${q.options.map(o => escStr(o)).join(', ')}]` : ''
  return `  { type: '${q.type}' as const, label: ${escStr(q.label)}${opts}, required: ${q.required} }`
}

function emitNotesRecord() {
  const lines = Object.entries(RU_APP_NOTES).map(([status, arr]) => {
    const items = arr.map(s => escStr(s)).join(',\n      ')
    return `    ${status}: [\n      ${items},\n    ]`
  })
  return lines.join(',\n')
}

function emitCriterion(c) {
  return `    { key: '${c.key}', name: ${escStr(c.name)}, description: ${escStr(c.description)}, category: '${c.category}' as const, maxScore: ${c.maxScore}, weight: ${c.weight}, displayOrder: ${c.displayOrder} }`
}

function normalizeAsciiKey(s) {
  return s.replace(/\u2014/g, '-').replace(/\u2013/g, '-')
}

function emitTitleMap(obj) {
  return Object.entries(obj).map(([k, v]) =>
    `  ${JSON.stringify(normalizeAsciiKey(k))}: ${escStr(v)},`,
  ).join('\n')
}

function emitNameMap(obj) {
  return Object.entries(obj).map(([k, v]) => `  ${JSON.stringify(k)}: ${escStr(v)},`).join('\n')
}

const ts = `/**
 * Russian demo content for seed.ts (thesis/ru-localization).
 * AUTO-GENERATED by scripts/build-seed-data-ru.mjs — do not edit Cyrillic by hand.
 */

export const DEMO_ORG_NAME_RU = ${escStr(DEMO_ORG_NAME_RU)}

export const JOBS_DATA_RU = [
${JOBS_DATA_RU.map(emitJob).join(',\n')},
] as const

export const CANDIDATES_DATA_RU = [
${CANDIDATES_DATA_RU.map(emitCandidate).join(',\n')},
]

export const FULLSTACK_QUESTIONS_RU = [
${FULLSTACK_QUESTIONS_RU.map(emitQuestion).join(',\n')},
]

export const DESIGNER_QUESTIONS_RU = [
${DESIGNER_QUESTIONS_RU.map(emitQuestion).join(',\n')},
]

export const DEVOPS_QUESTIONS_RU = [
${DEVOPS_QUESTIONS_RU.map(emitQuestion).join(',\n')},
]

/** Russian HR notes keyed by same structure as seed application assignments */
export function ruAppNote(status: string, score?: number): string | undefined {
  const notes: Record<string, string[]> = {
${emitNotesRecord()},
  }
  const pool = notes[status]
  if (!pool?.length) return undefined
  const idx = (score ?? 50) % pool.length
  return pool[idx]
}

export const JOB_CRITERIA_RU = [
[
${JOB_CRITERIA_RU[0].map(emitCriterion).join(',\n')},
],
[
${JOB_CRITERIA_RU[1].map(emitCriterion).join(',\n')},
],
[
${JOB_CRITERIA_RU[2].map(emitCriterion).join(',\n')},
],
] as const

const INTERVIEW_TITLE_MAP: Record<string, string> = {
${emitTitleMap(INTERVIEW_TITLE_RU)}
}

const INTERVIEWER_NAME_MAP: Record<string, string> = {
${emitNameMap(INTERVIEWER_NAME_RU)}
}

const INTERVIEW_LOCATION_MAP: Record<string, string> = {
${emitNameMap(INTERVIEW_LOCATION_RU)}
}

export const TRACKING_LINK_NAMES_RU = [
${TRACKING_LINK_NAMES_RU.map(n => escStr(n)).join(',\n  ')},
] as const

export interface InterviewSeedRuInput {
  title: string
  interviewers: string[]
  location: string | null
  notes: string | null
}

function normalizeAsciiKey(s: string): string {
  return s.replace(/\\u2014/g, '-').replace(/\\u2013/g, '-')
}

export function localizeInterview<T extends InterviewSeedRuInput>(iv: T): T {
  let location = iv.location
  if (location) {
    for (const [en, ru] of Object.entries(INTERVIEW_LOCATION_MAP)) {
      if (location.includes(en)) location = location.replace(en, ru)
    }
    if (location.includes('Reqcore HQ')) location = ${escStr('Офис Реккор, Берлин')}
  }
  return {
    ...iv,
    title: INTERVIEW_TITLE_MAP[normalizeAsciiKey(iv.title)] ?? iv.title,
    interviewers: iv.interviewers.map((n) => INTERVIEWER_NAME_MAP[n] ?? n),
    location,
  }
}
`

writeFileSync(outPath, ts, 'ascii')
console.log('Wrote', outPath)
