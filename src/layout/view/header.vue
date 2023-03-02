<script lang="ts" setup>
import mobileMenu from './toolbar/mobile-menu.vue'
import viewMenu from './menu.vue'
import viewToolbar from './toolbar.vue'
import viewLogo from './logo.vue'
import { SettingsValueEnum } from '@/constants/enums'
import { useSystemStore } from '@/hooks/use-store/use-system-store'

const systemStore = useSystemStore()
</script>

<template>
  <div h-full flex items-center justify-between box-border>
    <div h-full flex items-center>
      <mobile-menu v-if="systemStore.isMobile" />
      <view-logo
        v-if="
          !systemStore.isMobile
            && (systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP
              || systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP_LEAN)
        "
      />
      <view-menu
        v-if="
          !systemStore.isMobile
            && systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP_LEAN
        "
        mode="horizontal"
      />
    </div>
    <view-toolbar />
  </div>
</template>
