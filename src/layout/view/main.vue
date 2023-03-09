<script lang="ts" setup>
import viewBreadcrumb from '@/layout/view/breadcrumb.vue'
import copyright from '@/layout/copyright/index.vue'
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
  <el-scrollbar
    :wrap-style="[height, { 'box-sizing': 'border-box' }]" view-style="
            height: 100%;box-sizing: border-box;
            transition: all var(--el-transition-duration)
              var(--el-transition-function-ease-in-out-bezier);"
  >
    <div
      style="
            box-sizing: border-box;
            height: 100%;
            padding: var(--wingscloud-main-padding);
            background: var(--wingscloud-main-fill);
            transition: all var(--el-transition-duration)
              var(--el-transition-function-ease-in-out-bezier);
          "
    >
      <view-breadcrumb
        v-if="
          systemStore.settings.Breadcrumb
            === SettingsValueEnum.BREADCRUMB_VIEW_TOP
        "
      />
      <div style="padding-bottom: var(--wingscloud-main-padding)">
        <slot name="main-router-view" />
      </div>
      <copyright
        v-if="
          systemStore.settings.Copyright
            === SettingsValueEnum.COPYRIGHT_VIEW_BOTTOM
        "
      />
    </div>
  </el-scrollbar>
</template>
