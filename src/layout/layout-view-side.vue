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
  <div
    class="wingscloud-admin-layout-admin-aside" :class="[
      `wingscloud-admin-${systemStore.darkMode}`,
      `wingscloud-admin-${systemStore.layout}`,
    ]"
  >
    <layout-logo
      v-if="
        systemStore.isMobile || systemStore.layout === LayoutEnum.LAYOUT_SIDE"
      style="height: var(--wingscloud-aside-logo-height)"
    />
    <layout-menu />
    <div
      v-if="!systemStore.isMobile" flex items-center justify-center cursor-pointer
      style="height: var(--wingscloud-collapse-height)" class="wingscloud-admin-layout-aside-menu-collapse" :class="[
        `wingscloud-admin-${systemStore.darkMode}`,
        `wingscloud-admin-${systemStore.layout}`,
      ]" @click="changeCollapse()"
    >
      <el-button v-if="systemStore.collapse" bg text circle :icon="DArrowRight" />
      <el-button v-else bg text circle :icon="DArrowLeft" />
    </div>
  </div>
</template>
