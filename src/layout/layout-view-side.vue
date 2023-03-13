<script lang="ts" setup>
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import { useSystemStore } from '@/hooks/use-system-store'
import { LayoutEnum } from '@/enum'
import layoutLogo from '@/layout/components/logo.vue'
import layoutMenu from '@/layout/components/menu.vue'

const systemStore = useSystemStore()

const changeCollapse = (): void => {
  systemStore.collapse = !systemStore.collapse
}
</script>

<template>
  <layout-logo v-if="systemStore.isMobile || systemStore.layout === LayoutEnum.LAYOUT_SIDE" />
  <layout-menu />
  <div v-if="!systemStore.isMobile" flex items-center justify-center cursor-pointer @click="changeCollapse()">
    <el-button v-if="systemStore.collapse" bg text circle :icon="DArrowRight" />
    <el-button v-else bg text circle :icon="DArrowLeft" />
  </div>
</template>
