<script lang="ts" setup>
import { useSystemStore } from '@/hooks/use-system-store'
import { LayoutEnum } from '@/enum'

const props = defineProps({
  mode: {
    type: String,
    default: 'vertical',
  },
})

const route = useRoute()

const systemStore = useSystemStore()

const wrapStyle = computed(() => {
  if (props.mode === 'vertical') {
    let _height = '100vh'
    if (
      systemStore.setting.layout === LayoutEnum.LAYOUT_TOP
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
        `wingscloud-admin-${systemStore.darkMode}`,
        `wingscloud-admin-${systemStore.setting.layout}`,
      ]" h-full
    >
      <el-menu
        router collapse-transition :mode="props.mode as any"
        :collapse="props.mode === 'vertical' ? systemStore.collapse : false" :default-active="route.path"
        important="h-full border-none"
      >
        <app-menu-item :routes="systemStore.menuRoutes" />
      </el-menu>
    </div>
  </el-scrollbar>
</template>
