<script lang="ts" setup>
import { useBaseStore } from '@apps/admin/stores/use-base-store'
import { LayoutEnum } from '@libs/common/enums/base'
import layoutTab from '@apps/admin/layout/components/tab.vue'
import layoutBreadcrumb from '@apps/admin/layout/components/breadcrumb.vue'
import layoutCopyright from '@apps/admin/layout/components/copyright.vue'
import layoutLogo from '@apps/admin/layout/components/logo.vue'
import layoutMenu from '@apps/admin/layout/components/menu.vue'
import layoutCollapse from '@apps/admin/layout/components/collapse.vue'

import layoutDarkMode from '@apps/admin/layout/components/dark-mode.vue'
import layoutRefresh from '@apps/admin/layout/components/refresh.vue'
import layoutNotification from '@apps/admin/layout/components/notification.vue'
import layoutAvatar from '@apps/admin/layout/components/avatar.vue'

const baseStore = useBaseStore()
</script>

<template>
  <el-container w-screen h-screen>
    <el-aside v-if="!baseStore.isMobile" w-auto :class="baseStore.layout !== LayoutEnum.LAYOUT_SIDE ? 'important-border-0' : ''">
      <layout-logo v-if="baseStore.layout === LayoutEnum.LAYOUT_SIDE" h-26 flex-initial />
      <layout-menu v-if="baseStore.layout === LayoutEnum.LAYOUT_SIDE" flex-auto overflow-auto />
      <layout-collapse v-if="baseStore.layout === LayoutEnum.LAYOUT_SIDE" />
    </el-aside>
    <el-container h-full flex flex-col items-stretch>
      <el-header>
        <svg-icon
          v-if="baseStore.isMobile" size="26" name="app" cursor-pointer
          @click="baseStore.mobileMenu = !baseStore.mobileMenu"
        />
        <layout-logo
          v-if="
            !baseStore.isMobile && baseStore.layout !== LayoutEnum.LAYOUT_SIDE" mr="20px"
        />
        <layout-menu v-if="!baseStore.isMobile && baseStore.layout === LayoutEnum.LAYOUT_TOP" flex-1 />
        <div v-else flex-1 />
        <div w-46 flex justify-between items-center style="height: var(--el-header-height);">
          <layout-dark-mode />
          <layout-refresh />
          <layout-notification />
          <layout-avatar />
        </div>
      </el-header>
      <el-container flex-auto overflow-auto>
        <el-aside v-if="!baseStore.isMobile">
          <layout-menu v-if="baseStore.layout === LayoutEnum.LAYOUT_MIX" flex-auto overflow-auto />
          <layout-collapse v-if="baseStore.layout === LayoutEnum.LAYOUT_MIX" flex-initial />
        </el-aside>
        <el-container direction="vertical">
          <layout-tab v-if="baseStore.tab" />
          <el-scrollbar style="background-color: var(--el-bg-color-page);">
            <el-main>
              <layout-breadcrumb v-if="baseStore.breadcrumb" />
              <slot name="router-view" />

              <el-footer flex items-center justify-center>
                <layout-copyright />
              </el-footer>
            </el-main>
          </el-scrollbar>
        </el-container>
      </el-container>
    </el-container>
  </el-container>
  <el-drawer v-model="baseStore.mobileMenu" :show-close="false" direction="ltr" size="auto" :with-header="false">
    <div h-full flex flex-col items-stretch>
      <layout-logo h-12 mb-4 mx--4 />
      <layout-menu flex-auto overflow-auto mx--4 />
    </div>
  </el-drawer>
</template>

<style lang="scss" scoped>
:deep(.el-header) {
  --at-apply: flex justify-between items-center border-b-1 flex-initial;
  border-bottom: 1px solid var(--el-border-color-light);
}

:deep(.el-aside) {
  --at-apply: w-auto h-full flex flex-col items-stretch;
  border-right: 1px solid var(--el-border-color-lighter);
}
</style>
