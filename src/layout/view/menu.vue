<script lang="ts" setup>
import menuItem from '@/layout/menu/item.vue'
import { useSystemStore } from '@/hooks/store/use-system-store'
import { useRouteStore } from '@/hooks/store/use-route-store'
import { SettingsValueEnum } from '@/constants/enums'

const props = defineProps({
  mode: {
    type: String,
    default: 'vertical',
  },
})

const route = useRoute()

const systemStore = useSystemStore()
const routeStore = useRouteStore()

const wrapStyle = computed(() => {
  if (props.mode === 'vertical') {
    let _height = '100vh'
    if (
      systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP
      || systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP_LEAN
    ) {
      _height
        = 'calc(100vh - var(--wingscloud-header-height) - var(--wingscloud-collapse-height))'
    }
    else {
      _height
        = 'calc(100vh - var(--wingscloud-aside-logo-height) - var(--wingscloud-collapse-height))'
    }
    if (systemStore.isMobile)
      _height = 'calc(100vh - var(--wingscloud-aside-logo-height)'

    return `height:${_height};`
  }
  else {
    const _width
      = 'calc(100vw - var(--wingscloud-header-toobar-width) - var(--wingscloud-header-logo-width))'
    return `width:${_width};height:100%;display:flex;align-items:center;`
  }
})
</script>

<template>
  <el-scrollbar :wrap-style="wrapStyle">
    <div
      class="wingscloud-admin-layout-admin-menu" :class="[
        `wingscloud-admin-${systemStore.settings.MenuStyle}`,
        `wingscloud-admin-${systemStore.colorScheme}`,
        `wingscloud-admin-${systemStore.settings.Layout}`,
      ]" h-full
    >
      <el-menu
        router collapse-transition :mode="props.mode as any"
        :collapse="props.mode === 'vertical' ? systemStore.collapse : false"
        :unique-opened="systemStore.settings.UniqueOpened" :default-active="route.path" important="h-full border-none"
      >
        <menu-item :routes="routeStore.menuRoutes" />
      </el-menu>
    </div>
  </el-scrollbar>
</template>
