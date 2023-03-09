<script lang="ts" setup>
import { useSystemStore } from '@/hooks/use-system-store'
import { SettingsValueEnum } from '@/constants/enums'

const systemStore = useSystemStore()

const changeColorScheme = () => {
  if (
    systemStore.settings.ColorScheme === SettingsValueEnum.COLOR_SCHEME_AUTO
  ) {
    systemStore.changeDarkOrLight(
      systemStore.colorScheme === SettingsValueEnum.COLOR_SCHEME_LIGHT,
    )
  }
  else {
    systemStore.settings.ColorScheme
      = systemStore.colorScheme === SettingsValueEnum.COLOR_SCHEME_DARK
        ? SettingsValueEnum.COLOR_SCHEME_LIGHT
        : SettingsValueEnum.COLOR_SCHEME_DARK
  }
}
</script>

<template>
  <el-button circle @click="changeColorScheme()">
    <el-icon>
      <Moon v-if="systemStore.colorScheme === SettingsValueEnum.COLOR_SCHEME_DARK" />
      <Sunny v-else />
    </el-icon>
  </el-button>
</template>
