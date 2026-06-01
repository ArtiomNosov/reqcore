/**
 * Relative date/time strings for Russian UI (locale-aware).
 */
export function useRelativeTime() {
  const { t, locale } = useI18n()

  function isRu() {
    return String(locale.value).startsWith('ru')
  }

  function formatRelativeFromNow(dateStr: string | Date, now = new Date()) {
    const date = new Date(dateStr)
    const diffMs = date.getTime() - now.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

    if (!isRu()) {
      if (diffDays === 0) {
        if (diffHours <= 0) return 'Now'
        return `In ${diffHours}h`
      }
      if (diffDays === 1) return 'Tomorrow'
      if (diffDays < 7) return `In ${diffDays} days`
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    }

    if (diffDays === 0) {
      if (diffHours <= 0) return t('time.now')
      return t('time.inHours', { count: diffHours })
    }
    if (diffDays === 1) return t('time.tomorrow')
    if (diffDays > 1 && diffDays < 7) return t('time.inDays', { count: diffDays })
    if (diffDays < 0 && diffDays > -7) return t('time.daysAgo', { count: Math.abs(diffDays) })
    return date.toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' })
  }

  function formatRelativeAgo(dateStr: string | Date, now = new Date()) {
    const date = new Date(dateStr)
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (!isRu()) {
      if (diffMins < 1) return 'Just now'
      if (diffMins < 60) return `${diffMins}m ago`
      if (diffHours < 24) return `${diffHours}h ago`
      if (diffDays < 7) return `${diffDays}d ago`
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    }

    if (diffMins < 1) return t('time.justNow')
    if (diffMins < 60) return t('time.minutesAgo', { count: diffMins })
    if (diffHours < 24) return t('time.hoursAgo', { count: diffHours })
    if (diffDays < 7) return t('time.daysAgo', { count: diffDays })
    return date.toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' })
  }

  function formatNumberCompact(n: number) {
    if (!isRu()) {
      if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
      if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
      return n.toString()
    }
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)} ${t('units.million')}`
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)} ${t('units.thousand')}`
    return n.toString()
  }

  return {
    formatRelativeFromNow,
    formatRelativeAgo,
    formatNumberCompact,
  }
}
