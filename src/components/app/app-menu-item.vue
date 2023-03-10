<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router'
import { IconTypeEnum } from '@/enum'
import { useSystemStore } from '@/hooks/use-system-store'

const props = defineProps({
  routes: {
    type: Array<RouteRecordRaw>,
    default: () => {
      return []
    },
  },
})

const systemStore = useSystemStore()
</script>

<template>
  <template v-for="(route, index) in props.routes" :key="index">
    <el-menu-item v-if="!route.children || route.children.length === 0" :index="route.path">
      <a
        v-if="route.meta?.externalPage" target="_blank" :href="route.meta.externalPageUrl" text-2
        class="single-line-omitted" :style="systemStore.collapse ? '' : 'width: 100%'"
      >
        {{ route.meta?.menuName }}
      </a>
      <template v-else>
        <svg-icon
          v-if="route.meta?.icon && route.meta?.iconType === IconTypeEnum.APP" show-el-width size="18px"
          :name="route.meta?.icon as string" color=""
          :custom-style="systemStore.collapse ? {} : { marginRight: '5px' }"
        />
        <el-icon
          v-if="
            route.meta?.icon
              && route.meta?.iconType === IconTypeEnum.ELEMENT_PLUS
          " width="1rem" height="1rem"
        >
          <component :is="route.meta?.icon" />
        </el-icon>
        <span text="3.4" class="single-line-omitted" :style="systemStore.collapse ? '' : 'width: 100%'">
          {{ route.meta?.menuName }}
        </span>
      </template>
    </el-menu-item>
    <el-sub-menu
      v-else :index="route.path"
      :popper-class="`wingscloud-${systemStore.darkMode} wingscloud-${systemStore.setting.layout} wingscloud-layout-admin-menu`"
    >
      <template #title>
        <svg-icon
          v-if="route.meta?.icon && route.meta?.iconType === IconTypeEnum.APP" show-el-width size="18px"
          :name="route.meta?.icon as string" color=""
          :custom-style="systemStore.collapse ? {} : { marginRight: '5px' }"
        />
        <el-icon
          v-if="
            route.meta?.icon
              && route.meta?.iconType === IconTypeEnum.ELEMENT_PLUS
          " width="1rem" height="1rem"
        >
          <component :is="route.meta?.icon" />
        </el-icon>
        <span text="3.4" class="single-line-omitted" :style="systemStore.collapse ? '' : 'width: 68%'">
          {{ route.meta?.menuName }}
        </span>
      </template>
      <app-menu-item :routes="route.children" />
    </el-sub-menu>
  </template>
</template>
