<script lang="ts" setup>
import { LayoutEnum } from '@/enum'
import { useSystemStore } from '@/hooks/use-system-store'
import layoutDarkMode from '@/layout/components/dark-mode.vue'
import layoutRefresh from '@/layout/components/refresh.vue'
import layoutNotification from '@/layout/components/notification.vue'
import layoutAvatar from '@/layout/components/avatar.vue'
import layoutLogo from '@/layout/components/logo.vue'
import layoutMenu from '@/layout/components/menu.vue'
import layoutMobileMenu from '@/layout/components/mobile-menu.vue'

const systemStore = useSystemStore()
</script>

<template>
  <div h-full flex justify-between border-b-1>
    <div h-full flex items-center>
      <layout-mobile-menu v-if="systemStore.isMobile" />
      <layout-logo
        v-if="
          !systemStore.isMobile && systemStore.layout !== LayoutEnum.LAYOUT_SIDE "
      />
      <layout-menu v-if="!systemStore.isMobile && systemStore.layout === LayoutEnum.LAYOUT_TOP" mode="horizontal" />
    </div>
    <div w-46 h-full flex justify-between items-center>
      <layout-dark-mode />
      <layout-refresh />
      <layout-notification />
      <layout-avatar />
    </div>
  </div>
</template>
