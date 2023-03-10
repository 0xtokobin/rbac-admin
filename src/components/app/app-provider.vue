<script lang="ts" setup>
import type { Language } from 'element-plus/es/locale'
import { DarkModeEnum, LanguageEnum } from '@/enum'
import { setEpThemeColor } from '@/utils/common'
import { useSystemStore } from '@/hooks/use-system-store'
import { useMobileCodes } from '@/hooks/use-mobile-codes'
import { useDictionary } from '@/hooks/use-dict'

const route = useRoute()

const systemStore = useSystemStore()

const { getMobileCodes } = useMobileCodes()

const { getDictionaryAll } = useDictionary()

const { t, messages } = useI18n()

const locale = messages.value[systemStore.language][
  LanguageEnum.ZH_CN_ALIAS
] as Language

watch(
  () => systemStore.setting.darkMode,
  (newVal) => {
    if (newVal === DarkModeEnum.DARK_MODE_AUTO) {
      systemStore.changeDarkMode(
        window.matchMedia('(prefers-color-scheme: dark)').matches,
      )
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (event) => {
          systemStore.changeDarkMode(event.matches)
        })
    }
    else {
      document.documentElement.classList.remove(systemStore.darkMode)
      document.documentElement.classList.add(newVal)
      systemStore.darkMode = newVal
    }
  },
  {
    immediate: true,
  },
)

watch(
  () => systemStore.setting.theme,
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
      document.title = `${systemStore.browserTitle} - ${t('app.name') || import.meta.env.WINGSCLOUD_BROWSER_TITLE
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
    :locale="locale" :button="systemStore.setting.elementPlus.button" :message="{
      max: 3,
    }"
    :size="systemStore.setting.elementPlus.size"
  >
    <layout-page v-if="!route.meta.layout || route.meta?.layout === '' || route.meta?.layout === 'page'">
      <template #router-view>
        <slot name="app" />
      </template>
    </layout-page>
    <layout-view v-if="route.meta?.layout === 'view'">
      <template #router-view>
        <slot name="app" />
      </template>
    </layout-view>
  </el-config-provider>
</template>
