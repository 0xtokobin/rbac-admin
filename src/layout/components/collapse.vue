<script setup lang="ts">
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import { useSystemStore } from '@/hooks/use-system-store'

const systemStore = useSystemStore()
</script>

<template>
  <div
    v-if="!systemStore.isMobile" flex items-center justify-center cursor-pointer
    @click="systemStore.collapse = !systemStore.collapse"
  >
    <el-button v-if="systemStore.collapse" bg text circle :icon="DArrowRight" />
    <el-button v-else bg text circle :icon="DArrowLeft" />
  </div>
</template>
