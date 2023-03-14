<script lang="ts" setup>
import type { Language } from 'element-plus/es/locale'
import { DarkModeEnum, LanguageEnum } from '@/enum'
import { setEpThemeColor } from '@/utils/common'
import { useBaseStore } from '@/hooks/stores/use-base-store'
import { useDict } from '@/hooks/use-dict'
import layoutPage from '@/layout/layout-page.vue'
import layoutView from '@/layout/layout-view.vue'

const route = useRoute()

const baseStore = useBaseStore()

const { getDictList } = useDict()

const { t, messages, locale } = useI18n()

const epMessages = computed(() => {
  return messages.value[baseStore.language][
    LanguageEnum.ELEMENT_PLUS_LANGUAGE
  ] as Language
})

watch(
  () => baseStore.darkMode,
  (newVal) => {
    if (!newVal || newVal === DarkModeEnum.DARK_MODE_AUTO) {
      baseStore.changeDarkMode(
        window.matchMedia('(prefers-color-scheme: dark)').matches,
      )
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (event) => {
          baseStore.changeDarkMode(event.matches)
        })
    }
    else {
      document.documentElement.classList.remove(baseStore.darkMode)
      document.documentElement.classList.add(newVal)
      baseStore.darkMode = newVal
    }
  },
  {
    immediate: true,
  },
)

watch(
  () => baseStore.theme,
  (newVal, old) => {
    if (newVal && (newVal !== old || !old))
      setEpThemeColor(newVal as string)
  },
  {
    immediate: true,
  },
)

watch(
  () => route.path,
  () => {
    if (route.meta.i18n)
      document.title = `${route.meta.i18n[locale.value]} - ${t('app.name')}`

    else
      document.title = t('app.name') || import.meta.env.WINGSCLOUD_BROWSER_TITLE
  },
  {
    immediate: true,
  },
)

onBeforeMount(() => {
  baseStore.changeMobile()
  window.onresize = () => {
    baseStore.changeMobile()
  }
})

onBeforeMount(() => {
  getDictList()
})
</script>

<template>
  <el-config-provider
    :locale="epMessages" :button="{ autoInsertSpace: true }" :message="{ max: 3 }"
    :size="baseStore.size"
  >
    <layout-page v-if="route.meta?.layout === '' || route.meta?.layout === 'page'">
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
