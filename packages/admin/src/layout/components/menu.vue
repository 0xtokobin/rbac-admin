<script lang="ts" setup>
import { LayoutEnum } from '@/enum'
import { useBaseStore } from '@/hooks/stores/use-base-store'
import layoutMenuItem from '@/layout/components/menu-item.vue'

const route = useRoute()

const baseStore = useBaseStore()
</script>

<template>
  <el-scrollbar>
    <el-menu
      border-none router collapse-transition el-menu
      :mode="baseStore.layout === LayoutEnum.LAYOUT_TOP ? 'horizontal' : 'vertical'"
      :collapse="baseStore.layout === LayoutEnum.LAYOUT_TOP ? false : baseStore.collapse" :default-active="route.path"
    >
      <layout-menu-item :routes="baseStore.menuRoutes" />
    </el-menu>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.el-menu:not(.el-menu--collapse) {
  width: 13rem;
}
</style>
