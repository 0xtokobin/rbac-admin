<script lang="ts" setup>
import viewMenu from '@/layout/view/menu.vue'
import viewLogo from '@/layout/view/logo.vue'
import menuCollapse from '@/layout/menu/collapse.vue'
import { useSystemStore } from '@/hooks/use-system-store'
import { SettingsValueEnum } from '@/constants/enums'

const systemStore = useSystemStore()
</script>

<template>
  <div
    class="wingscloud-admin-layout-admin-aside" :class="[
      `wingscloud-admin-${systemStore.colorScheme}`,
      `wingscloud-admin-${systemStore.settings.Layout}`,
    ]"
  >
    <view-logo
      v-if="
        systemStore.isMobile
          || (!systemStore.isMobile
            && systemStore.settings.Layout !== SettingsValueEnum.LAYOUT_TOP
            && systemStore.settings.Layout !== SettingsValueEnum.LAYOUT_TOP_LEAN)
      " style="height: var(--wingscloud-aside-logo-height)"
    />
    <view-menu />
    <menu-collapse v-if="!systemStore.isMobile" />
  </div>
</template>
