<script lang="ts" setup>
import { Settings } from '@/constants/settings'
import { useSystemStore } from '@/hooks/store/use-system-store'
import { SettingsValueEnum } from '@/constants/enums'

const { t } = useI18n()

const router = useRouter()

const systemStore = useSystemStore()

const goHomeRoute = () => {
  router.push({ path: Settings.AdminFirstRoute })
}

const width = computed(() => {
  let _width = 'var(--wingscloud-header-logo-width)'
  if (
    systemStore.collapse
    && systemStore.settings.Layout !== SettingsValueEnum.LAYOUT_TOP
    && systemStore.settings.Layout !== SettingsValueEnum.LAYOUT_TOP_LEAN
  )
    _width = 'var(--wingscloud-aside-width-fold)'
  else
    _width = 'var(--wingscloud-aside-width)'

  if (
    systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP
    || systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP_LEAN
  )
    _width = 'var(--wingscloud-header-logo-width)'

  if (systemStore.isMobile)
    _width = 'var(--wingscloud-aside-width)'

  return `width:${_width};`
})

const position = computed(() => {
  let _position = 'display:flex;align-items:center;'
  if (
    systemStore.settings.Layout !== SettingsValueEnum.LAYOUT_TOP
    && systemStore.settings.Layout !== SettingsValueEnum.LAYOUT_TOP_LEAN
  )
    _position += 'justify-content:center;'
  else if (
    systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP
    || systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP_LEAN
  )
    _position += 'justify-content:flex-start;'

  return _position
})
</script>

<template>
  <div
    class="wingscloud-admin-layout-admin-logo"
    cursor-pointer
    p-x-6
    box-border
    :style="[width, position]"
    @click="goHomeRoute()"
  >
    <div class="logo" flex items-center justify-center>
      <img
        v-if="
          (systemStore.colorScheme === SettingsValueEnum.COLOR_SCHEME_THEME
            && systemStore.settings.Layout !== SettingsValueEnum.LAYOUT_ASIDE
            && systemStore.settings.Layout
              !== SettingsValueEnum.LAYOUT_ASIDE_LEAN
            && !systemStore.isMobile)
            || (systemStore.colorScheme !== SettingsValueEnum.COLOR_SCHEME_THEME
              && (systemStore.settings.Layout
                === SettingsValueEnum.LAYOUT_ASIDE_DARK
                || systemStore.settings.Layout
                  === SettingsValueEnum.LAYOUT_ASIDE_LEAN_DARK))
            || (systemStore.isMobile
              && (systemStore.settings.Layout
                === SettingsValueEnum.LAYOUT_ASIDE_DARK
                || systemStore.settings.Layout
                  === SettingsValueEnum.LAYOUT_ASIDE_LEAN_DARK))
            || systemStore.colorScheme === SettingsValueEnum.COLOR_SCHEME_DARK
        "
        w-10
        h-10
        src="@/assets/logo-white.svg"
      >
      <img v-else w-10 h-10 src="@/assets/logo.svg">
    </div>
    <div
      v-if="
        !systemStore.collapse
          || systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP
          || systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP_LEAN
      "
      w-full
      text-6
      font-600
      ml-4
      class="single-line-omitted name"
      :style="
        systemStore.colorScheme === SettingsValueEnum.COLOR_SCHEME_DARK
          || (systemStore.colorScheme === SettingsValueEnum.COLOR_SCHEME_THEME
            && (systemStore.settings.Layout
              === SettingsValueEnum.LAYOUT_ASIDE_LEAN
              || systemStore.settings.Layout === SettingsValueEnum.LAYOUT_ASIDE))
          || systemStore.isMobile
          ? 'color: var(--wingscloud-menu-text-color)'
          : 'color: var(--wingscloud-header-text-color)'
      "
    >
      {{ t('app.name') }}
    </div>
  </div>
</template>
