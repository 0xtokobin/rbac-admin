<script lang="ts" setup>
import { useSystemStore } from '@/hooks/use-store/use-system-store'
import { SettingsValueEnum } from '@/constants/enums'

const systemStore = useSystemStore()
</script>

<template>
  <div h-full flex items-center justify-between box-border>
    <div h-full flex items-center>
      <layout-toolbar-mobile-menu v-if="systemStore.isMobile" />
      <layout-admin-logo
        v-if="
          !systemStore.isMobile
            && (systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP
              || systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP_LEAN)
        "
      />
      <layout-admin-menu
        v-if="
          !systemStore.isMobile
            && systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP_LEAN
        "
        mode="horizontal"
      />
    </div>
    <layout-toolbar />
  </div>
</template>
