<script lang="ts" setup>
import { SettingsValueEnum } from '@/constants/enums'
import { useSystemStore } from '@/hooks/use-system-store'

const systemStore = useSystemStore()
</script>

<template>
  <div h-full flex items-center justify-between box-border>
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
    <div h-full flex justify-end items-center>
      <layout-toolbar-color-scheme mr-7 />
      <layout-toolbar-language only-icon mr-7 />
      <layout-toolbar-refresh mr-7 />
      <layout-toolbar-fullscreen v-if="!systemStore.isMobile" mr-7 />
      <layout-toolbar-notification mr-7 />
      <layout-toolbar-avatar />
    </div>
  </div>
</template>
