<script lang="ts" setup>
import viewHeader from './header.vue'
import viewFooter from './footer.vue'
import viewMain from './main.vue'
import viewAside from './aside.vue'
import viewTab from './tab.vue'
import viewToolbar from './toolbar.vue'
import mobileMenu from './toolbar/view-tab.vue'

import { useSystemStore } from '@/hooks/use-store/use-system-store'
import { SettingsValueEnum } from '@/constants/enums'

const systemStore = useSystemStore()
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
            ? 'height: var(--wingscloud-admin-header-height); border-bottom: 1px solid'
            : 'height: 0; border-bottom: none;'
        "
      >
        <view-header
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
                ? 'width: var(--wingscloud-admin-aside-width-fold)'
                : 'width: var(--wingscloud-admin-aside-width)'
              : 'width: 0',
            systemStore.isMobile ? 'border:none' : '',
          ]"
        >
          <view-aside
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
              ? 'height: calc(100vh - var(--wingscloud-admin-header-height));'
              : 'height: calc(100vh);'
          "
        >
          <el-header
            :style="
              systemStore.settings.Layout === SettingsValueEnum.LAYOUT_ASIDE
                || systemStore.settings.Layout
                  === SettingsValueEnum.LAYOUT_ASIDE_DARK
                ? 'height: var(--wingscloud-admin-header-height); border-bottom: 1px solid'
                : 'height: 0; border-bottom: none'
            "
          >
            <view-header
              v-if="
                systemStore.settings.Layout
                  === SettingsValueEnum.LAYOUT_ASIDE
                  || systemStore.settings.Layout
                    === SettingsValueEnum.LAYOUT_ASIDE_DARK
              "
            />
          </el-header>
          <view-tab v-if="systemStore.settings.Tab" />
          <view-main>
            <template #main-router-view>
              <slot name="router-view" />
            </template>
          </view-main>
          <el-footer v-if="systemStore.settings.Footer">
            <view-footer />
          </el-footer>
        </el-main>
      </el-container>
    </el-container>
    <mobile-menu
      v-if="
        systemStore.isMobile
          && (systemStore.settings.Layout === SettingsValueEnum.LAYOUT_ASIDE_LEAN
            || systemStore.settings.Layout
              === SettingsValueEnum.LAYOUT_ASIDE_LEAN_DARK)
      "
      :fixed="true"
    />
    <el-drawer
      v-model="systemStore.mobileMenu"
      :show-close="false"
      direction="ltr"
      :with-header="false"
      size="var(--wingscloud-admin-aside-width)"
    >
      <view-aside />
    </el-drawer>
    <view-toolbar
      v-if="
        systemStore.settings.Layout === SettingsValueEnum.LAYOUT_ASIDE_LEAN
          || systemStore.settings.Layout === SettingsValueEnum.LAYOUT_ASIDE_LEAN_DARK
      "
      :fixed="true"
    />
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-header) {
  box-sizing: border-box;
  padding: 0 !important;
  overflow: hidden;
  background-color: var(--wingscloud-admin-header-bg-color);
  border-color: var(--wingscloud-admin-header-border-color) !important;
  transition: all var(--el-transition-duration)
    var(--el-transition-function-ease-in-out-bezier);
}

:deep(.el-container) {
  box-sizing: border-box;
  overflow: hidden;
  background-color: var(--wingscloud-admin-menu-bg-color);
  transition: all var(--el-transition-duration)
    var(--el-transition-function-ease-in-out-bezier);
}

:deep(.el-aside) {
  box-sizing: border-box;
  overflow: hidden;
  border-right: 1px solid var(--wingscloud-admin-aside-border-color);
  transition: all var(--el-transition-duration)
    var(--el-transition-function-ease-in-out-bezier);
}

:deep(.el-main) {
  box-sizing: border-box;
  padding: 0;
  overflow: hidden;
  background: var(--wingscloud-admin-main-fill);
  transition: all var(--el-transition-duration)
    var(--el-transition-function-ease-in-out-bezier);
}

:deep(.el-drawer) {
  overflow-x: hidden;
  background-color: var(--wingscloud-admin-menu-bg-color);
}
</style>
