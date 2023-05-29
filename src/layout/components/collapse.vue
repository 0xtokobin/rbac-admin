<script setup lang="ts">
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import { useBaseStore } from '@/hooks/use-base-store'

const baseStore = useBaseStore()
</script>

<template>
  <div
    v-if="!baseStore.isMobile" w-full flex items-center justify-center h-16
    @click="baseStore.collapse = !baseStore.collapse"
  >
    <el-button bg text circle :icon="baseStore.collapse ? DArrowRight : DArrowLeft" />
  </div>
</template>
