/** Russian scoring criteria presets for job AI analysis (thesis RU locale). */
export type JobCriteriaTemplateItem = {
  key: string
  name: string
  description: string
  category: 'technical' | 'experience' | 'soft_skills' | 'education' | 'culture' | 'custom'
  maxScore: number
  weight: number
}

export const jobCriteriaTemplatesRu: Record<'standard' | 'technical' | 'non_technical', JobCriteriaTemplateItem[]> = {
  standard: [
    {
      key: 'technical_skills',
      name: 'Технические навыки',
      description: 'Оценка технических компетенций соискателя относительно требований вакансии.',
      category: 'technical',
      maxScore: 10,
      weight: 50,
    },
    {
      key: 'relevant_experience',
      name: 'Релевантный опыт',
      description: 'Годы и качество опыта, напрямую связанного с ролью.',
      category: 'experience',
      maxScore: 10,
      weight: 50,
    },
    {
      key: 'education_fit',
      name: 'Образование и сертификаты',
      description: 'Образование и сертификаты, релевантные позиции.',
      category: 'education',
      maxScore: 10,
      weight: 30,
    },
  ],
  technical: [
    {
      key: 'core_tech_stack',
      name: 'Соответствие основному стеку',
      description: 'Насколько навыки соискателя совпадают с ключевыми технологиями роли.',
      category: 'technical',
      maxScore: 10,
      weight: 70,
    },
    {
      key: 'system_design',
      name: 'Системный дизайн и архитектура',
      description: 'Опыт проектирования систем и принятия архитектурных решений.',
      category: 'technical',
      maxScore: 10,
      weight: 50,
    },
    {
      key: 'engineering_practices',
      name: 'Инженерные практики',
      description: 'Тестирование, CI/CD, код-ревью и жизненный цикл разработки.',
      category: 'technical',
      maxScore: 10,
      weight: 40,
    },
    {
      key: 'relevant_experience',
      name: 'Релевантный опыт',
      description: 'Глубина опыта в похожих ролях и доменах.',
      category: 'experience',
      maxScore: 10,
      weight: 50,
    },
    {
      key: 'leadership_collab',
      name: 'Лидерство и сотрудничество',
      description: 'Менторство, техлидерство и кросс-командная работа.',
      category: 'soft_skills',
      maxScore: 10,
      weight: 30,
    },
  ],
  non_technical: [
    {
      key: 'relevant_experience',
      name: 'Релевантный опыт',
      description: 'Глубина и широта опыта, применимого к роли.',
      category: 'experience',
      maxScore: 10,
      weight: 60,
    },
    {
      key: 'communication',
      name: 'Коммуникация',
      description: 'Письменная и устная коммуникация по материалам резюме и отклика.',
      category: 'soft_skills',
      maxScore: 10,
      weight: 50,
    },
    {
      key: 'domain_knowledge',
      name: 'Знание предметной области',
      description: 'Отраслевой или предметный опыт, релевантный позиции.',
      category: 'experience',
      maxScore: 10,
      weight: 40,
    },
    {
      key: 'education_fit',
      name: 'Образование и сертификаты',
      description: 'Образование и сертификаты, релевантные позиции.',
      category: 'education',
      maxScore: 10,
      weight: 30,
    },
    {
      key: 'culture_fit',
      name: 'Культура и ценности',
      description: 'Признаки соответствия ценностям компании и команде.',
      category: 'culture',
      maxScore: 10,
      weight: 30,
    },
  ],
}
