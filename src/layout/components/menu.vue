<script lang="ts" setup>
import { LayoutEnum } from '@/enum'
import { useSystemStore } from '@/hooks/use-system-store'
import layoutMenuItem from '@/layout/components/menu-item.vue'

const route = useRoute()

const systemStore = useSystemStore()
</script>

<template>
  <el-menu
    border-none router collapse-transition el-menu
    :mode="systemStore.layout === LayoutEnum.LAYOUT_TOP ? 'horizontal' : 'vertical'"
    :collapse="systemStore.layout === LayoutEnum.LAYOUT_TOP ? false : systemStore.collapse" :default-active="route.path"
  >
    <layout-menu-item :routes="systemStore.menuRoutes" />
  </el-menu>
</template>

<style lang="scss" scoped>
.el-menu:not(.el-menu--collapse) {
  width: 13rem;
}
</style>
