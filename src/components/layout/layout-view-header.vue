<script lang="ts" setup>
import { LayoutEnum } from '@/enum'
import { useSystemStore } from '@/hooks/use-system-store'

const systemStore = useSystemStore()
</script>

<template>
  <div h-full flex justify-between border-b-1>
    <div h-full flex items-center>
      <layout-toolbar-mobile-menu v-if="systemStore.isMobile" />
      <app-logo
        v-if="
          !systemStore.isMobile && systemStore.layout !== LayoutEnum.LAYOUT_SIDE "
      />
      <app-menu v-if="!systemStore.isMobile && systemStore.layout === LayoutEnum.LAYOUT_TOP" mode="horizontal" />
    </div>
    <div w-46 h-full flex justify-between items-center>
      <layout-toolbar-dark-mode />
      <layout-toolbar-refresh />
      <layout-toolbar-notification />
      <layout-toolbar-avatar />
    </div>
  </div>
</template>
