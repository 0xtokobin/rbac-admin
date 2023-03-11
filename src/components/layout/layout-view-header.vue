<script lang="ts" setup>
import { LayoutEnum } from '@/enum'
import { useSystemStore } from '@/hooks/use-system-store'
import { useUserStore } from '@/hooks/use-user-store'

const systemStore = useSystemStore()

const userStore = useUserStore()
</script>

<template>
  <div h-full flex justify-between>
    <div h-full flex items-center>
      <layout-toolbar-mobile-menu v-if="systemStore.isMobile" />
      <app-logo
        v-if="
          !systemStore.isMobile && userStore.profile.layout === LayoutEnum.LAYOUT_TOP"
      />
      <app-menu v-if="!systemStore.isMobile && userStore.profile.layout === LayoutEnum.LAYOUT_TOP" mode="horizontal" />
    </div>
    <div w-50 h-full flex justify-between items-center>
      <layout-toolbar-language />
      <layout-toolbar-dark-mode />
      <layout-toolbar-refresh />
      <layout-toolbar-notification />
      <layout-toolbar-avatar />
    </div>
  </div>
</template>
