<script lang="ts" setup>
import { useSystemStore } from '@/hooks/use-system-store'
import { SettingsValueEnum } from '@/constants/enums'

const props = defineProps({
  color: {
    type: String,
    default: 'var(--wingscloud-header-text-color)',
  },
})

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
  <el-icon
    cursor-pointer
    :style="{ color: props.color }"
    size="1.2rem"
    inline-flex
    @click="changeColorScheme()"
  >
    <Moon
      v-if="systemStore.colorScheme === SettingsValueEnum.COLOR_SCHEME_DARK"
    />
    <Sunny v-else />
  </el-icon>
</template>
