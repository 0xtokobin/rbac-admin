<script lang="ts" setup>
import { LayoutEnum } from '@/enum'
import { useSystemStore } from '@/hooks/use-system-store'
import { useUserStore } from '@/hooks/use-user-store'

const systemStore = useSystemStore()

const userStore = useUserStore()
</script>

<template>
  <div
    class="wingscloud-layout-view" :class="[
      `wingscloud-${systemStore.darkMode}`,
      `wingscloud-${systemStore.layout}`,
    ]"
  >
    <el-container>
      <el-aside v-if="!systemStore.isMobile">
        <layout-view-aside v-if="systemStore.layout === LayoutEnum.LAYOUT_SIDE" />
      </el-aside>
      <el-header>
        <layout-view-header
          v-if="systemStore.layout === LayoutEnum.LAYOUT_MIX || systemStore.layout === LayoutEnum.LAYOUT_TOP"
        />
      </el-header>
      <el-container>
        <el-aside v-if="!systemStore.isMobile">
          <layout-view-aside v-if="systemStore.layout === LayoutEnum.LAYOUT_MIX" />
        </el-aside>
        <el-container>
          <el-header style="height: auto">
            <layout-view-header v-if="systemStore.layout === LayoutEnum.LAYOUT_SIDE" />
          </el-header>
          <el-main>
            <app-tab />
            <app-breadcrumb />
            <slot name="router-view" />
          </el-main>
          <el-footer>
            <app-copyright />
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
  <el-drawer
    v-model="systemStore.mobileMenu" :show-close="false" direction="ltr" :with-header="false"
    size="var(--wingscloud-aside-width)"
  >
    <layout-view-aside />
  </el-drawer>
</template>

<style lang="scss" scoped>
:deep(.el-header) {
  background-color: var(--wingscloud-header-bg-color);
  border-color: var(--wingscloud-header-border-color) !important;
  height: var(--wingscloud-header-height);
}

:deep(.el-container) {
  box-sizing: border-box;
  overflow: hidden;
  background-color: var(--wingscloud-menu-bg-color);
}

:deep(.el-aside) {
  box-sizing: border-box;
  overflow: hidden;
  border-right: 1px solid var(--wingscloud-aside-border-color);
}

:deep(.el-main) {
  background: var(--wingscloud-main-fill);
}

:deep(.el-footer) {
  background: var(--wingscloud-main-fill);
}

:deep(.el-drawer) {
  overflow-x: hidden;
  background-color: var(--wingscloud-menu-bg-color);
}
</style>
