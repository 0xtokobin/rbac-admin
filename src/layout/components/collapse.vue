<script setup lang="ts">
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import { useSystemStore } from '@/hooks/use-system-store'

const systemStore = useSystemStore()
</script>

<template>
  <div
    v-if="!systemStore.isMobile" w-full flex items-center justify-center h-16
    @click="systemStore.collapse = !systemStore.collapse"
  >
    <el-button bg text circle :icon="systemStore.collapse ? DArrowRight : DArrowLeft" />
  </div>
</template>
