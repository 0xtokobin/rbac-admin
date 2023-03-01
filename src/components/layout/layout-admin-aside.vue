<script lang="ts" setup>
import { useSystemStore } from '@/hooks/use-store/use-system-store'
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
    <layout-admin-logo
      v-if="
        systemStore.isMobile
          || (!systemStore.isMobile
            && systemStore.settings.Layout !== SettingsValueEnum.LAYOUT_TOP
            && systemStore.settings.Layout !== SettingsValueEnum.LAYOUT_TOP_LEAN)
      "
      style="height: var(--wingscloud-admin-aside-logo-height)"
    />
    <layout-admin-menu />
    <layout-menu-collapse v-if="!systemStore.isMobile" />
  </div>
</template>
