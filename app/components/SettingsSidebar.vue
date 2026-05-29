<script setup lang="ts">
import {
  Building2, Users, UserCircle, ChevronLeft, Settings, Plug, Brain, ShieldCheck, Globe,
} from 'lucide-vue-next'

const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

const settingsNav = computed(() => [
  {
    label: t('settings.general.label'),
    description: t('settings.general.description'),
    to: '/dashboard/settings',
    icon: Building2,
    exact: true,
  },
  {
    label: t('settings.localization.label'),
    description: t('settings.localization.description'),
    to: '/dashboard/settings/localization',
    icon: Globe,
    exact: true,
  },
  {
    label: t('settings.members.label'),
    description: t('settings.members.description'),
    to: '/dashboard/settings/members',
    icon: Users,
    exact: true,
  },
  {
    label: t('settings.integrations.label'),
    description: t('settings.integrations.description'),
    to: '/dashboard/settings/integrations',
    icon: Plug,
    exact: true,
  },
  {
    label: t('settings.ai.label'),
    description: t('settings.ai.description'),
    to: '/dashboard/settings/ai',
    icon: Brain,
    exact: true,
  },
  {
    label: t('settings.sso.label'),
    description: t('settings.sso.description'),
    to: '/dashboard/settings/sso',
    icon: ShieldCheck,
    exact: true,
    badge: t('common.beta'),
  },
  {
    label: t('settings.account.label'),
    description: t('settings.account.description'),
    to: '/dashboard/settings/account',
    icon: UserCircle,
    exact: true,
  },
])

function isActive(to: string, exact: boolean) {
  const localizedTo = localePath(to)
  if (exact) return route.path === localizedTo
  return route.path === localizedTo || route.path.startsWith(`${localizedTo}/`)
}
</script>

<template>
  <aside
    class="flex h-full w-56 min-w-56 flex-col border-r border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 overflow-y-auto overscroll-contain"
  >
    <div class="px-4 pt-5 pb-4">
      <NuxtLink
        :to="$localePath('/dashboard')"
        class="inline-flex items-center gap-1.5 text-xs font-medium text-surface-400 dark:text-surface-500 hover:text-surface-600 dark:hover:text-surface-300 transition-colors no-underline mb-3"
      >
        <ChevronLeft class="size-3.5" />
        {{ t('settings.backToJobs') }}
      </NuxtLink>
      <div class="flex items-center gap-2.5">
        <div class="flex items-center justify-center size-8 rounded-lg bg-surface-100 dark:bg-surface-800 text-surface-500 dark:text-surface-400">
          <Settings class="size-4" />
        </div>
        <h2 class="text-sm font-semibold text-surface-900 dark:text-surface-100">
          {{ t('settings.title') }}
        </h2>
      </div>
    </div>

    <nav class="flex-1 px-3 pb-5">
      <div class="flex flex-col gap-0.5">
        <NuxtLink
          v-for="item in settingsNav"
          :key="item.to"
          :to="$localePath(item.to)"
          class="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all no-underline"
          :class="isActive(item.to, item.exact)
            ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 font-medium'
            : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800/60 hover:text-surface-900 dark:hover:text-surface-100'"
        >
          <div
            class="flex items-center justify-center size-8 rounded-md transition-colors"
            :class="isActive(item.to, item.exact)
              ? 'bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400'
              : 'bg-surface-100 dark:bg-surface-800 text-surface-400 dark:text-surface-500 group-hover:text-surface-600 dark:group-hover:text-surface-300'"
          >
            <component :is="item.icon" class="size-4" />
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-1.5 leading-tight">
              <span class="truncate">{{ item.label }}</span>
              <span
                v-if="item.badge"
                class="shrink-0 inline-flex items-center rounded-full bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 text-[10px] font-medium text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800"
              >
                {{ item.badge }}
              </span>
            </div>
            <div
              class="text-[11px] leading-tight mt-0.5 truncate"
              :class="isActive(item.to, item.exact)
                ? 'text-brand-500/70 dark:text-brand-400/60'
                : 'text-surface-400 dark:text-surface-500'"
            >
              {{ item.description }}
            </div>
          </div>
        </NuxtLink>
      </div>
    </nav>
  </aside>
</template>
