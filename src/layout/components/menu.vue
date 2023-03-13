<script lang="ts" setup>
import { useSystemStore } from '@/hooks/use-system-store'
import layoutMenuItem from '@/layout/components/menu-item.vue'

const props = defineProps({
  mode: {
    type: String,
    default: 'vertical',
  },
})

const route = useRoute()

const systemStore = useSystemStore()
</script>

<template>
  <el-scrollbar>
    <el-menu
      wingscloud-layout-menu
      border-none
      h-full router collapse-transition el-menu :mode="props.mode"
      :collapse="props.mode === 'vertical' ? systemStore.collapse : false" :default-active="route.path"
    >
      <layout-menu-item :routes="systemStore.menuRoutes" />
    </el-menu>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.el-menu:not(.el-menu--collapse) {
  width: 13rem;
}
</style>
