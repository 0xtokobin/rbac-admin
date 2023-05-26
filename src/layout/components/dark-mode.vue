<script lang="ts" setup>
import { useBaseStore } from '@/store/base'

const baseStore = useBaseStore()
</script>

<template>
  <el-button circle @click="baseStore.openDarkMode(!baseStore.isDarkMode)">
    <el-icon>
      <Moon v-if="baseStore.isDarkMode" />
      <Sunny v-else />
    </el-icon>
  </el-button>
</template>
