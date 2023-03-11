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
      `wingscloud-${userStore.profile.layout}`,
    ]"
  >
    <el-container>
      <el-aside v-if="!systemStore.isMobile">
        <layout-view-aside
          v-if="systemStore.layout === LayoutEnum.LAYOUT_SIDE "
        />
      </el-aside>
      <el-header>
        <layout-view-header v-if="systemStore.layout === LayoutEnum.LAYOUT_MIX || systemStore.layout === LayoutEnum.LAYOUT_TOP" />
      </el-header>
      <el-container>
        <el-aside v-if="!systemStore.isMobile">
          <layout-view-aside
            v-if="systemStore.layout === LayoutEnum.LAYOUT_MIX"
          />
        </el-aside>
        <el-container>
          <el-header>
            <layout-view-header v-if="systemStore.layout === LayoutEnum.LAYOUT_SIDE" />
          </el-header>
          <el-main>
            <app-tab />
            <app-breadcrumb />
            <slot name="router-view" />
          </el-main>
        </el-container>
        <el-footer>
          <layout-view-footer />
        </el-footer>
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
  transition: all var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);
  height: var(--wingscloud-header-height);
  border-bottom: 1px solid;
}

:deep(.el-container) {
  box-sizing: border-box;
  overflow: hidden;
  background-color: var(--wingscloud-menu-bg-color);
  transition: all var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);
}

:deep(.el-aside) {
  box-sizing: border-box;
  overflow: hidden;
  border-right: 1px solid var(--wingscloud-aside-border-color);
  transition: all var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);
}

:deep(.el-main) {
  box-sizing: border-box;
  padding: 0;
  overflow: hidden;
  background: var(--wingscloud-main-fill);
  transition: all var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);
}

:deep(.el-drawer) {
  overflow-x: hidden;
  background-color: var(--wingscloud-menu-bg-color);
}
</style>
