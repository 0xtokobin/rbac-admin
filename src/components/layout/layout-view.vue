<script lang="ts" setup>
import { useSystemStore } from '@/hooks/use-system-store'
import { SettingsValueEnum } from '@/constants/enums'

const systemStore = useSystemStore()

const height = computed(() => {
  let _height = '100vh'
  if (
    systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP
    || systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP_LEAN
    || systemStore.settings.Layout === SettingsValueEnum.LAYOUT_ASIDE
    || systemStore.settings.Layout === SettingsValueEnum.LAYOUT_ASIDE_DARK
  ) {
    _height
      = 'calc(100vh - var(--wingscloud-header-height) - var(--wingscloud-tab-height))'
  }
  else {
    _height = 'calc(100vh - var(--wingscloud-tab-height))'
  }
  if (!systemStore.settings.Tab)
    _height = `calc(${_height} + var(--wingscloud-tab-height))`

  return `height: ${_height}`
})
</script>

<template>
  <div
    class="wingscloud-admin-layout-admin" :class="[
      `wingscloud-admin-${systemStore.colorScheme}`,
      `wingscloud-admin-${systemStore.settings.Layout}`,
    ]"
  >
    <el-container>
      <el-header
        :style="
          systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP
            || systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP_LEAN
            ? 'height: var(--wingscloud-header-height); border-bottom: 1px solid'
            : 'height: 0; border-bottom: none;'
        "
      >
        <layout-view-header
          v-if="
            systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP
              || systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP_LEAN
          "
        />
      </el-header>
      <el-container>
        <el-aside
          :style="[
            !systemStore.isMobile
              && systemStore.settings.Layout !== SettingsValueEnum.LAYOUT_TOP_LEAN
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
                && systemStore.settings.Layout !== SettingsValueEnum.LAYOUT_TOP_LEAN
            "
          />
        </el-aside>
        <el-main
          :style="
            systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP
              || systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP_LEAN
              ? 'height: calc(100vh - var(--wingscloud-header-height));'
              : 'height: calc(100vh);'
          "
        >
          <el-header
            :style="
              systemStore.settings.Layout === SettingsValueEnum.LAYOUT_ASIDE
                || systemStore.settings.Layout
                  === SettingsValueEnum.LAYOUT_ASIDE_DARK
                ? 'height: var(--wingscloud-header-height); border-bottom: 1px solid'
                : 'height: 0; border-bottom: none'
            "
          >
            <layout-view-header
              v-if="
                systemStore.settings.Layout
                  === SettingsValueEnum.LAYOUT_ASIDE
                  || systemStore.settings.Layout
                    === SettingsValueEnum.LAYOUT_ASIDE_DARK
              "
            />
          </el-header>
          <app-tab v-if="systemStore.settings.Tab" />
          <div
            style="
                  box-sizing: border-box;
                  padding: var(--wingscloud-main-padding);
                  background: var(--wingscloud-main-fill);
                  transition: all var(--el-transition-duration)
                    var(--el-transition-function-ease-in-out-bezier);
                " :style="height"
          >
            <app-breadcrumb
              v-if="
                systemStore.settings.Breadcrumb
                  === SettingsValueEnum.BREADCRUMB_VIEW_TOP
              "
            />
            <div style="padding-bottom: var(--wingscloud-main-padding)">
              <slot name="router-view" />
            </div>
          </div>
          <el-footer v-if="systemStore.settings.Footer">
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
