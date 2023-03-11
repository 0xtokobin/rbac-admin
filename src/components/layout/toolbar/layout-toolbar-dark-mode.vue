<script lang="ts" setup>
import { useSystemStore } from '@/hooks/use-system-store'
import { DarkModeEnum } from '@/enum'

const systemStore = useSystemStore()
</script>

<template>
  <el-button circle @click="systemStore.changeDarkMode(systemStore.darkMode === DarkModeEnum.DARK_MODE_LIGHT)">
    <el-icon>
      <Moon v-if="systemStore.darkMode === DarkModeEnum.DARK_MODE_DARK" />
      <Sunny v-else />
    </el-icon>
  </el-button>
</template>
