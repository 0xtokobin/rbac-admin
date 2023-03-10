<script lang="ts" setup>
import { useSystemStore } from '@/hooks/use-system-store'
import { LayoutEnum } from '@/enum'

const systemStore = useSystemStore()

const height = computed(() => {
  let _height = '100vh'
  if (
    systemStore.setting.layout === LayoutEnum.LAYOUT_TOP
    || systemStore.setting.layout === LayoutEnum.LAYOUT_SIDE
    || systemStore.setting.layout === LayoutEnum.LAYOUT_DARK_SIDE
  ) {
    _height
      = 'calc(100vh - var(--wingscloud-header-height) - var(--wingscloud-tab-height))'
  }
  else {
    _height = 'calc(100vh - var(--wingscloud-tab-height))'
  }
  return `height: ${_height}`
})
</script>

<template>
  <div
    class="wingscloud-admin-layout-admin" :class="[
      `wingscloud-admin-${systemStore.darkMode}`,
      `wingscloud-admin-${systemStore.setting.layout}`,
    ]"
  >
    <el-container>
      <el-header
        :style="
          systemStore.setting.layout === LayoutEnum.LAYOUT_TOP
            ? 'height: var(--wingscloud-header-height); border-bottom: 1px solid'
            : 'height: 0; border-bottom: none;'
        "
      >
        <layout-view-header
          v-if="
            systemStore.setting.layout === LayoutEnum.LAYOUT_TOP
          "
        />
      </el-header>
      <el-container>
        <el-aside
          :style="[
            !systemStore.isMobile
              ? systemStore.collapse
                ? 'width: var(--wingscloud-aside-width-fold)'
                : 'width: var(--wingscloud-aside-width)'
              : 'width: 0',
            systemStore.isMobile ? 'border:none' : '',
          ]"
        >
          <layout-view-aside
            v-if="
              !systemStore.isMobile
            "
          />
        </el-aside>
        <el-main
          :style="
            systemStore.setting.layout === LayoutEnum.LAYOUT_TOP
              ? 'height: calc(100vh - var(--wingscloud-header-height));'
              : 'height: calc(100vh);'
          "
        >
          <el-header
            :style="
              systemStore.setting.layout === LayoutEnum.LAYOUT_SIDE
                || systemStore.setting.layout
                  === LayoutEnum.LAYOUT_DARK_SIDE
                ? 'height: var(--wingscloud-header-height); border-bottom: 1px solid'
                : 'height: 0; border-bottom: none'
            "
          >
            <layout-view-header
              v-if="
                systemStore.setting.layout
                  === LayoutEnum.LAYOUT_SIDE
                  || systemStore.setting.layout
                    === LayoutEnum.LAYOUT_DARK_SIDE
              "
            />
          </el-header>
          <app-tab />
          <div
            style="
                    box-sizing: border-box;
                    padding: var(--wingscloud-main-padding);
                    background: var(--wingscloud-main-fill);
                    transition: all var(--el-transition-duration)
                      var(--el-transition-function-ease-in-out-bezier);
                  " :style="height"
          >
            <app-breadcrumb />
            <div style="padding-bottom: var(--wingscloud-main-padding)">
              <slot name="router-view" />
            </div>
          </div>
          <el-footer>
            <layout-view-footer />
          </el-footer>
        </el-main>
      </el-container>
    </el-container>
    <el-drawer
      v-model="systemStore.mobileMenu" :show-close="false" direction="ltr" :with-header="false"
      size="var(--wingscloud-aside-width)"
    >
      <layout-view-aside />
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-header) {
  background-color: var(--wingscloud-header-bg-color);
  border-color: var(--wingscloud-header-border-color) !important;
  transition: all var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);
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
