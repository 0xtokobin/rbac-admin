<script lang="ts" setup>
import { LayoutEnum } from '@/enum'
import { useSystemStore } from '@/hooks/use-system-store'
import layoutTab from '@/layout/components/tab.vue'
import layoutBreadcrumb from '@/layout/components/breadcrumb.vue'
import layoutCopyright from '@/layout/components/copyright.vue'
import layoutLogo from '@/layout/components/logo.vue'
import layoutMenu from '@/layout/components/menu.vue'
import layoutCollapse from '@/layout/components/collapse.vue'

import layoutDarkMode from '@/layout/components/dark-mode.vue'
import layoutRefresh from '@/layout/components/refresh.vue'
import layoutNotification from '@/layout/components/notification.vue'
import layoutAvatar from '@/layout/components/avatar.vue'

const systemStore = useSystemStore()
</script>

<template>
  <el-container w-screen h-screen>
    <el-aside v-if="!systemStore.isMobile">
      <layout-logo v-if="systemStore.layout === LayoutEnum.LAYOUT_SIDE" h-22 flex-initial />
      <layout-menu v-if="systemStore.layout === LayoutEnum.LAYOUT_SIDE" flex-auto overflow-auto />
      <layout-collapse v-if="systemStore.layout === LayoutEnum.LAYOUT_SIDE" />
    </el-aside>
    <el-container>
      <el-header flex justify-between border-b-1>
        <div flex items-center>
          <svg-icon
            v-if="systemStore.isMobile" size="26" name="app" cursor-pointer
            @click="systemStore.mobileMenu = !systemStore.mobileMenu"
          />
          <layout-logo
            v-if="
              !systemStore.isMobile && systemStore.layout !== LayoutEnum.LAYOUT_SIDE"
          />
          <layout-menu v-if="!systemStore.isMobile && systemStore.layout === LayoutEnum.LAYOUT_TOP" />
        </div>
        <div w-46 flex justify-between items-center>
          <layout-dark-mode />
          <layout-refresh />
          <layout-notification />
          <layout-avatar />
        </div>
      </el-header>
      <el-container>
        <el-aside v-if="!systemStore.isMobile">
          <div h-4 flex-initial />
          <layout-menu v-if="systemStore.layout === LayoutEnum.LAYOUT_MIX" flex-auto overflow-auto />
          <layout-collapse v-if="systemStore.layout === LayoutEnum.LAYOUT_MIX" flex-initial />
        </el-aside>
        <el-container>
          <layout-tab />
          <el-main>
            <layout-breadcrumb />
            <slot name="router-view" />
          </el-main>
          <el-footer>
            <layout-copyright />
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </el-container>
  <el-drawer v-model="systemStore.mobileMenu" :show-close="false" direction="ltr" :size="208" :with-header="false">
    <layout-logo />
    <layout-menu />
  </el-drawer>
</template>

<style lang="scss" scoped>
:deep(.el-aside) {
  --at-apply: w-auto h-full flex flex-col items-stretch;
}
</style>
