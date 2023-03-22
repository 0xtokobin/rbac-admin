<script lang="ts" setup>
import type { Language } from 'element-plus/es/locale'
import { useBaseStore } from '@apps/admin/stores/use-base-store'
import { DarkModeEnum, LanguageEnum } from '@libs/common/enums/base'
import layoutPage from '@apps/admin/layout/layout-page.vue'
import layoutView from '@apps/admin/layout/layout-view.vue'
import { setEpThemeColor } from '@libs/common/utils/base'
import { useDict } from '@libs/common/hooks/use-dict'

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

onBeforeMount(() => {
  baseStore.openDarkMode(baseStore.isDarkMode)
  baseStore.changeMobileLayout()
  window.onresize = () => {
    baseStore.changeMobileLayout()
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
