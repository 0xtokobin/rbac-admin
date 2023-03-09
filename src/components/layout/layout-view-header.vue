<script lang="ts" setup>
import { SettingsValueEnum } from '@/constants/enums'
import { useSystemStore } from '@/hooks/use-system-store'

const systemStore = useSystemStore()
</script>

<template>
  <div h-full flex justify-between>
    <div h-full flex items-center>
      <layout-toolbar-mobile-menu v-if="systemStore.isMobile" />
      <app-logo
        v-if="
          !systemStore.isMobile
            && (systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP
              || systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP_LEAN)
        "
      />
      <app-menu
        v-if="
          !systemStore.isMobile
            && systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP_LEAN
        " mode="horizontal"
      />
    </div>
    <div w-74 h-full flex justify-between items-center>
      <layout-toolbar-language />
      <layout-toolbar-color-scheme />
      <layout-toolbar-refresh />
      <layout-toolbar-notification />
      <layout-toolbar-avatar />
    </div>
  </div>
</template>
