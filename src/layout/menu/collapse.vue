<script lang="ts" setup>
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import { useSystemStore } from '@/hooks/use-system-store'

const systemStore = useSystemStore()

const changeCollapse = (): void => {
  systemStore.collapse = !systemStore.collapse
}
</script>

<template>
  <div
    flex
    items-center
    justify-center
    cursor-pointer
    style="height: var(--wingscloud-collapse-height)"
    class="wingscloud-admin-layout-aside-menu-collapse" :class="[
      `wingscloud-admin-${systemStore.colorScheme}`,
      `wingscloud-admin-${systemStore.settings.Layout}`,
    ]"
    @click="changeCollapse()"
  >
    <el-button
      v-if="systemStore.collapse"
      bg
      text
      circle
      :icon="DArrowRight"
    />
    <el-button v-else bg text circle :icon="DArrowLeft" />
  </div>
</template>
