<script lang="ts" setup>
import type {
  Language,
} from 'element-plus/es/locale'
import layoutPage from '@/layout/layout-page.vue'
import { useBaseStore } from '@/store/base'
import { DarkModeEnum, LanguageEnum } from '@/enums/base'
import layoutView from '@/layout/layout-view.vue'
import { setEpThemeColor } from '@/utils/base'
import { useDict } from '@/hooks/use-dict'

const route = useRoute()

const baseStore = useBaseStore()

const { getDictList } = useDict()

const { t, messages, locale } = useI18n()

const epMessages = computed(() => {
  return messages.value[baseStore.language][
    LanguageEnum.ELEMENT_PLUS_LANGUAGE
  ] as Language
})

const changeBrowserTitle = () => {
  if (route.meta.i18n)
    document.title = `${route.meta.i18n[locale.value]} - ${t('base.name')}`

  else
    document.title = t('base.name') || import.meta.env.WINGSCLOUD_BROWSER_TITLE
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
