<script lang="ts" setup>
import { useSystemStore } from '@/hooks/use-system-store'
import { DarkModeEnum } from '@/enum'

const systemStore = useSystemStore()

const changeColorScheme = () => {
  if (
    userStore.profile.darkMode === DarkModeEnum.DARK_MODE_DARK
  ) {
    systemStore.changeDarkMode(
      systemStore.darkMode === DarkModeEnum.DARK_MODE_LIGHT,
    )
  }
  else {
    userStore.profile.darkMode
      = systemStore.darkMode === DarkModeEnum.DARK_MODE_DARK
        ? DarkModeEnum.DARK_MODE_LIGHT
        : DarkModeEnum.DARK_MODE_DARK
  }
}
</script>

<template>
  <el-button circle @click="changeColorScheme()">
    <el-icon>
      <Moon v-if="systemStore.darkMode === DarkModeEnum.DARK_MODE_DARK" />
      <Sunny v-else />
    </el-icon>
  </el-button>
</template>
