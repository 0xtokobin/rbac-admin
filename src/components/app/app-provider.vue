<script lang="ts" setup>
import type { Language } from 'element-plus/es/locale'
import layoutPage from '@/layout/layout-page.vue'
import layoutView from '@/layout/layout-view.vue'
import { Settings } from '@/constants/settings'
import { SettingsValueEnum } from '@/constants/enums'
import { setEpThemeColor } from '@/utils/theme'
import { useSystemStore } from '@/hooks/store/use-system-store'
import { useMobileCodes } from '@/hooks/crud/use-mobile-codes'
import { useDictionary } from '@/hooks/crud/use-dictionary'

const route = useRoute()

const systemStore = useSystemStore()

const { getMobileCodes } = useMobileCodes()

const { getDictionaryAll } = useDictionary()

const { t, messages } = useI18n()

const locale = messages.value[systemStore.language][
  Settings.ElementPlus.language
] as Language

watch(
  () => systemStore.settings.ColorScheme,
  (newVal) => {
    if (newVal === SettingsValueEnum.COLOR_SCHEME_AUTO) {
      systemStore.changeDarkOrLight(
        window.matchMedia('(prefers-color-scheme: dark)').matches,
      )
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (event) => {
          systemStore.changeDarkOrLight(event.matches)
        })
    }
    else {
      document.documentElement.classList.remove(systemStore.colorScheme)
      document.documentElement.classList.add(newVal)
      systemStore.colorScheme = newVal
    }
  },
  {
    immediate: true,
  },
)

watch(
  () => systemStore.settings.ThemeColor,
  (newVal, old) => {
    if (newVal && (newVal !== old || !old))
      setEpThemeColor(newVal as string)
  },
  {
    immediate: true,
  },
)

watch(
  () => systemStore.browserTitle,
  () => {
    if (systemStore.browserTitle) {
      document.title = `${systemStore.browserTitle} - ${t('app.name') || import.meta.env.APP_NAME
        }`
    }
    else {
      document.title = t('app.name') || import.meta.env.APP_NAME
    }
  },
  {
    immediate: true,
  },
)

onBeforeMount(() => {
  systemStore.changeMobile()
  window.onresize = () => {
    systemStore.changeMobile()
  }
})

onBeforeMount(() => {
  getMobileCodes()
  getDictionaryAll()
})
</script>

<template>
  <el-config-provider
    :locale="locale" :button="systemStore.settings.ElementPlus.button"
    :message="systemStore.settings.ElementPlus.message" :size="systemStore.settings.ElementPlus.size"
  >
    <layout-page v-if=" !route.meta.layout || route.meta?.layout === '' || route.meta?.layout === 'page'">
      <template #router-view>
        <slot name="index" />
      </template>
    </layout-page>
    <layout-view v-if="route.meta?.layout === 'view'">
      <template #router-view>
        <slot name="index" />
      </template>
    </layout-view>
  </el-config-provider>
</template>
