<script lang="ts" setup>
import { useSystemStore } from '@/hooks/use-store/use-system-store'
import { SettingsValueEnum } from '@/constants/enums'

const systemStore = useSystemStore()

const route = useRoute()
</script>

<template>
  <div
    flex
    items-center
    justify-start
    :style="
      systemStore.settings.Breadcrumb === SettingsValueEnum.BREADCRUMB_VIEW_TOP
        ? 'padding-bottom: var(--wingscloud-admin-main-padding)'
        : ''
    "
  >
    <el-breadcrumb>
      <el-breadcrumb-item
        v-for="(item, index) in route.meta.breadcrumb"
        :key="index"
      >
        {{ item.label }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
