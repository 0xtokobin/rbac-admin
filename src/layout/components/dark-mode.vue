<script lang="ts" setup>
import { useBaseStore } from '@/hooks/stores/use-base-store'
import { DarkModeEnum } from '@/enum'

const baseStore = useBaseStore()
</script>

<template>
  <el-button circle @click="baseStore.changeDarkMode(baseStore.darkMode === DarkModeEnum.DARK_MODE_LIGHT)">
    <el-icon>
      <Moon v-if="baseStore.darkMode === DarkModeEnum.DARK_MODE_DARK" />
      <Sunny v-else />
    </el-icon>
  </el-button>
</template>
