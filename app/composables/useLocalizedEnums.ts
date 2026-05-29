/**
 * Localized labels for enum-like API values shown in the UI.
 */
export function useLocalizedEnums() {
  const { t } = useI18n()

  const applicationStatus = (status: string) =>
    t(`pipeline.status.${status}`, status)

  const jobStatus = (status: string) =>
    t(`job.status.${status}`, status)

  const jobType = (type: string) =>
    t(`job.type.${type}`, type)

  const interviewStatus = (status: string) =>
    t(`interview.status.${status}`, status)

  return {
    applicationStatus,
    jobStatus,
    jobType,
    interviewStatus,
  }
}
