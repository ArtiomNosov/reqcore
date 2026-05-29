/**
 * Russian demo content for seed.ts (thesis/ru-localization).
 */

export const DEMO_ORG_NAME_RU = 'Демо Reqcore'

export const JOBS_DATA_RU = [
  {
    title: 'Старший full-stack инженер',
    description: `Ищем старшего full-stack инженера для развития платформы Reqcore. Вы будете вести сквозные фичи на TypeScript, Nuxt и PostgreSQL.\n\n**Обязанности**\n- Разработка фич от исследования до продакшена\n- Архитектурные решения для мультитенантности и надёжности\n- Совместная работа с продуктом и дизайном\n- Код-ревью, тесты, наблюдаемость\n\n**Требования**\n- 5+ лет коммерческой веб-разработки\n- Уверенный TypeScript на фронте и бэкенде\n- Vue/React или аналоги\n- PostgreSQL, CI/CD, Docker\n\n**Плюсом**\n- Опыт HR-продуктов или внутренних B2B-инструментов\n- Интерес к прозрачному ИИ в подборе`,
    location: 'Берлин, Германия (гибрид)',
    type: 'full_time' as const,
    status: 'open' as const,
  },
  {
    title: 'Продуктовый дизайнер',
    description: `Создавайте ежедневные сценарии рекрутеров: воронка, кандидаты, дашборд. Работа с инженерами и продуктом.\n\n**Обязанности**\n- Дизайн от discovery до UI в проде\n- Упрощение сложных HR-процессов\n- Исследования и usability-тесты\n- Развитие дизайн-системы\n\n**Требования**\n- 3+ года product design, B2B SaaS\n- Сильное портфолио\n- Figma, доступность, IA`,
    location: 'Удалённо (ЕС)',
    type: 'full_time' as const,
    status: 'open' as const,
  },
  {
    title: 'DevOps-инженер',
    description: `Укрепление CI/CD, контейнеров и наблюдаемости для self-hosted и облачных установок.\n\n**Обязанности**\n- Пайплайны релизов\n- Docker, алерты, runbook'и\n- Бэкапы Postgres и хранилища\n\n**Требования**\n- 3+ года DevOps\n- Docker, Linux, CI/CD\n- TLS, прокси, инциденты`,
    location: 'Удалённо (весь мир)',
    type: 'contract' as const,
    status: 'open' as const,
  },
  {
    title: 'Технический писатель (частичная занятость)',
    description: `Документация для рекрутеров, админов и разработчиков: гайды, API, troubleshooting.\n\n**Требования**\n- 2+ года техписательства\n- Markdown, ясный русский/английский\n- Опыт developer docs`,
    location: 'Удалённо (ЕС)',
    type: 'part_time' as const,
    status: 'open' as const,
  },
  {
    title: 'Стажёр frontend-разработки',
    description: `Стажировка 6 месяцев: Vue/Nuxt, доступность, код-ревью с ментором.\n\n**Требования**\n- Студент CS или смежной специальности\n- HTML, CSS, JavaScript\n- TypeScript и компоненты — плюс`,
    location: 'Берлин (офис)',
    type: 'internship' as const,
    status: 'draft' as const,
  },
] as const

export const CANDIDATES_DATA_RU = [
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
  { firstName: 'Катерина', lastName: 'Иванова', email: 'katerina.ivanova@example.com', phone: '+34 612 123 456' },
  { firstName: 'Павел', lastName: 'Медведев', email: 'pavel.medvedev@example.com', phone: '+971 50 234 5678' },
  { firstName: 'Юлия', lastName: 'Фёдорова', email: 'yulia.fedorova@example.com', phone: '+49 172 3456780' },
  { firstName: 'Максим', lastName: 'Орлов', email: 'maxim.orlov@example.com', phone: '+33 7 45 67 89 01' },
  { firstName: 'Виктория', lastName: 'Зайцева', email: 'viktoria.zaitseva@example.com', phone: '+82 10 5678 9012' },
  { firstName: 'Сергей', lastName: 'Попов', email: 'sergey.popov@example.com', phone: '+7 916 678 9012' },
  { firstName: 'Наталья', lastName: 'Соловьёва', email: 'natalia.solovieva@example.com', phone: '+46 73 789 01 23' },
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

export const FULLSTACK_QUESTIONS_RU = [
  { type: 'short_text' as const, label: 'Стаж работы с TypeScript', required: true },
  { type: 'single_select' as const, label: 'Предпочитаемый frontend-фреймворк', options: ['Vue', 'React', 'Svelte', 'Angular', 'Solid'], required: true },
  { type: 'long_text' as const, label: 'Опишите сложную техническую задачу, которую вы недавно решили', required: true },
  { type: 'url' as const, label: 'Ссылка на GitHub или портфолио', required: false },
  { type: 'single_select' as const, label: 'Когда можете выйти на работу?', options: ['Сразу', '2 недели', '1 месяц', '2–3 месяца'], required: true },
]

export const DESIGNER_QUESTIONS_RU = [
  { type: 'url' as const, label: 'Ссылка на портфолио', required: true },
  { type: 'single_select' as const, label: 'Основной инструмент дизайна', options: ['Figma', 'Sketch', 'Adobe XD', 'Framer'], required: true },
  { type: 'long_text' as const, label: 'Опишите процесс работы над недавним проектом', required: true },
  { type: 'checkbox' as const, label: 'Есть опыт с дизайн-системами', required: false },
]

export const DEVOPS_QUESTIONS_RU = [
  { type: 'multi_select' as const, label: 'С какими облаками работали?', options: ['AWS', 'GCP', 'Azure', 'Hetzner', 'DigitalOcean', 'Другое'], required: true },
  { type: 'short_text' as const, label: 'Стаж работы с Docker', required: true },
  { type: 'single_select' as const, label: 'Предпочитаемая CI/CD платформа', options: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'CircleCI', 'Другое'], required: true },
]

/** Russian HR notes keyed by same structure as seed application assignments */
export function ruAppNote(status: string, score?: number): string | undefined {
  const notes: Record<string, string[]> = {
    hired: [
      'Отличное архитектурное интервью, сильные примеры лидерства. Оффер принят.',
      'Сильный DevOps: контейнеры и observability. Контракт подписан.',
    ],
    offer: [
      'Сильный system design. Пакет на финальном согласовании.',
      'Глубокий backend. Обсуждаем компенсацию.',
      'Чёткая коммуникация. Финальный звонок по офферу.',
      'Отличные writing samples. Готовим оффер.',
    ],
    interview: [
      'Хорошее тестовое. Финальная панель на следующей неделе.',
      'Стабильное качество кода. Архитектурный раунд.',
      'Позитивный фидбек рекрутера. Цикл интервью идёт.',
      'Сильное портфолио. Walkthrough запланирован.',
    ],
    screening: [
      'Релевантный опыт SaaS. Назначаем техскрининг.',
      'Уверенный TypeScript. Ждём слот на звонок.',
      'Хороший фундамент. Проверяем SSR.',
      'Сильный research-подход. Портфолио-ревью.',
    ],
    new: [
      'Сильное резюме с Nuxt. На первичной проверке.',
      'Хороший open-source профиль. В очереди рекрутера.',
    ],
    rejected: [
      'Уровень ниже senior для этой роли.',
      'Мало backend-ownership в последних ролях.',
      'Портфолио больше brand/campaign, не product.',
      'Слабые fundamentals в практическом задании.',
    ],
  }
  const pool = notes[status]
  if (!pool?.length) return undefined
  const idx = (score ?? 50) % pool.length
  return pool[idx]
}
