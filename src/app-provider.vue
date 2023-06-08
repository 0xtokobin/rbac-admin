<script lang="ts" setup>
import type {
  Language,
} from 'element-plus/es/locale'
import { useBaseStore } from '@/hooks/use-store'
import { DarkModeEnum, LanguageEnum } from '@/constants/enums'
import { setEpThemeColor } from '@/utils/base/index.js'
import { useDict } from '@/hooks/use-crud'
import LayoutView from '@/layouts/layout-view.vue'
import LayoutPage from '@/layouts/layout-page.vue'

const route = useRoute()

const baseStore = useBaseStore()

const { getDictList } = useDict()

const { t, messages, locale } = useI18n()

const epMessages = computed(() => {
  return messages.value[baseStore.language][
    LanguageEnum.ELEMENT_PLUS_LANGUAGE
  ] as Language
})

function changeBrowserTitle() {
  if (route.meta.i18n)
    document.title = `${route.meta.i18n[locale.value]} - ${t('base.name')}`

  else
    document.title = t('base.name') || import.meta.env.APP_BROWSER_TITLE
}

onBeforeMount(() => {
  getDictList()
  baseStore.openDarkMode(baseStore.isDarkMode)
  baseStore.changeMobileLayout()
  window.onresize = () => {
    baseStore.changeMobileLayout()
  }
})

watch(
  () => route.path,
  () => changeBrowserTitle(),
  {
    immediate: true,
  },
)

watch(() => locale.value, () => changeBrowserTitle())

watch(
  () => baseStore.theme,
  (newVal, old) => {
    if (newVal && (newVal !== old || !old))
      setEpThemeColor(newVal as string, baseStore.darkMode === DarkModeEnum.DARK_MODE_DARK)
  },
  {
    immediate: true,
  },
)

watch(
  () => baseStore.isDarkMode,
  (newVal, oldVal) => {
    document.documentElement.classList.remove(oldVal ? DarkModeEnum.DARK_MODE_DARK : DarkModeEnum.DARK_MODE_LIGHT)
    document.documentElement.classList.add(newVal ? DarkModeEnum.DARK_MODE_DARK : DarkModeEnum.DARK_MODE_LIGHT)
    baseStore.isDarkMode = newVal
  },
)
</script>

<template>
  <el-config-provider
    :locale="epMessages" :button="{ autoInsertSpace: true }" :message="{ max: 3 }"
    :size="baseStore.size"
  >
    <LayoutPage v-if="route.meta.layout === '' || route.meta?.layout === 'page'">
      <template #router-view>
        <slot name="app" />
      </template>
    </LayoutPage>
    <LayoutView v-if="route.meta?.layout === 'view'">
      <template #router-view>
        <slot name="app" />
      </template>
    </LayoutView>
  </el-config-provider>
</template>
