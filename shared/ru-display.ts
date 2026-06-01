/** Display helpers for Russian UI (no Latin homoglyphs). */

export const RU_BRAND_NAME = 'Реккор'
export const RU_DEMO_EMAIL_DISPLAY = 'демо@реккор.ком'

/** Human-readable Russian labels for AI model ids shown in the UI. */
const MODEL_LABELS_RU: Record<string, string> = {
  'gpt-4o-mini': 'Компактная языковая модель',
  'gpt-4o': 'Мультимодальная языковая модель',
  'gpt-4': 'Языковая модель четвёртого поколения',
  'gpt-3.5-turbo': 'Быстрая языковая модель',
  'claude-3-5-sonnet': 'Модель семейства Claude (сонет)',
  'claude-3-opus': 'Модель семейства Claude (опус)',
  'o1-mini': 'Модель рассуждений (компактная)',
}

export function modelLabelRu(modelId: string | null | undefined): string {
  if (!modelId) return 'Не указана'
  const key = modelId.trim().toLowerCase()
  return MODEL_LABELS_RU[key] ?? 'Пользовательская языковая модель'
}

export function providerLabelRu(provider: string | null | undefined): string {
  if (!provider) return 'Неизвестный провайдер'
  const map: Record<string, string> = {
    openai: 'OpenAI',
    anthropic: 'Anthropic',
    ollama: 'Ollama',
    google: 'Google',
  }
  return map[provider.toLowerCase()] ?? provider
}

/** Demo account email shown without Latin in screenshots. */
export function toRuEmailDisplay(email: string | null | undefined): string {
  if (!email) return ''
  if (email.toLowerCase() === 'demo@reqcore.com') return RU_DEMO_EMAIL_DISPLAY
  return email
}
