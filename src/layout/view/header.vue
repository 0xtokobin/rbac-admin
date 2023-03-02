<script lang="ts" setup>
import toolbarMobileMenu from '@/layout/toolbar/mobile-menu.vue'
import viewMenu from '@/layout/view/menu.vue'
import viewToolbar from '@/layout/view/toolbar.vue'
import viewLogo from '@/layout/view/logo.vue'
import { SettingsValueEnum } from '@/constants/enums'
import { useSystemStore } from '@/hooks/store/use-system-store'

const systemStore = useSystemStore()
</script>

<template>
  <div h-full flex items-center justify-between box-border>
    <div h-full flex items-center>
      <toolbar-mobile-menu v-if="systemStore.isMobile" />
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
