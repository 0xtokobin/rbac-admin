<script lang="ts" setup>
import { useSystemStore } from '@/hooks/use-system-store'
import { useUserStore } from '@/hooks/use-user-store'
import { DarkModeEnum, LayoutEnum, RouteEnum } from '@/enum'

const { t } = useI18n()

const router = useRouter()

const systemStore = useSystemStore()

const userStore = useUserStore()

const goHomeRoute = () => {
  router.push({ path: RouteEnum.ROUTE_FIRST })
}

const width = computed(() => {
  let _width = 'var(--wingscloud-header-logo-width)'
  if (
    systemStore.collapse
    && systemStore.layout === LayoutEnum.LAYOUT_SIDE
  )
    _width = 'var(--wingscloud-aside-width-fold)'
  else
    _width = 'var(--wingscloud-aside-width)'

  return `width:${_width};`
})

const position = computed(() => {
  let _position = 'display:flex;align-items:center;'
  if (
    systemStore.layout !== LayoutEnum.LAYOUT_TOP
  )
    _position += 'justify-content:center;'
  else if (
    systemStore.layout === LayoutEnum.LAYOUT_TOP
  )
    _position += 'justify-content:flex-start;'

  return _position
})
</script>

<template>
  <div class="wingscloud-admin-layout-admin-logo" cursor-pointer :style="[width, position]" @click="goHomeRoute()">
    <div class="logo" flex items-center justify-center h-5>
      <img h-full src="@/assets/logo.svg">
    </div>
    <div
      v-if="
        (!systemStore.collapse && systemStore.layout === LayoutEnum.LAYOUT_SIDE) || systemStore.layout !== LayoutEnum.LAYOUT_SIDE"
      w-full text="4.2" font-600 ml-4 class="single-line-omitted name" :style="
        systemStore.darkMode === DarkModeEnum.DARK_MODE_DARK
          || systemStore.layout === LayoutEnum.LAYOUT_SIDE
          || systemStore.isMobile
          ? 'color: var(--wingscloud-menu-text-color)'
          : 'color: var(--wingscloud-header-text-color)'
      "
    >
      {{ t('app.name') }}
    </div>
  </div>
</template>
