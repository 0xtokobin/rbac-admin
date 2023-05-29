<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router'
import { useBaseStore } from '@/hooks/use-base-store'
import { IconTypeEnum } from '@/constants/enums'
import layoutMenuItem from '@/layout/components/menu-item.vue'

const props = defineProps({
  routes: {
    type: Array<RouteRecordRaw>,
    default: () => {
      return []
    },
  },
})

const { locale } = useI18n()

const baseStore = useBaseStore()
</script>

<template>
  <template v-for="route, index in props.routes" :key="index">
    <el-menu-item v-if="!route.children || route.children.length === 0" :index="route.path">
      <a
        v-if="route.meta?.externalPage" target="_blank" :href="route.meta.externalPageUrl" text-2 single-line-omitted
        w-full
      >
        {{ route.meta?.i18n[locale] }}
      </a>
      <template v-else>
        <svg-icon
          v-if="route.meta?.icon && route.meta?.iconType === IconTypeEnum.APP" show-el-width size="18px"
          :name="route.meta?.icon as string"
        />
        <el-icon v-if="route.meta?.icon && route.meta?.iconType === IconTypeEnum.ELEMENT_PLUS" width="1rem" height="1rem">
          <component :is="route.meta?.icon" />
        </el-icon>
        <span text="3.4" class="single-line-omitted" :style="baseStore.collapse ? '' : 'width: 100%'">
          {{ route.meta?.i18n[locale] }}
        </span>
      </template>
    </el-menu-item>
    <el-sub-menu v-else :index="route.path">
      <template #title>
        <svg-icon
          v-if="route.meta?.icon && route.meta?.iconType === IconTypeEnum.APP" show-el-width size="18px"
          :name="route.meta?.icon as string"
        />
        <el-icon v-if="route.meta?.icon && route.meta?.iconType === IconTypeEnum.ELEMENT_PLUS" width="1rem" height="1rem">
          <component :is="route.meta?.icon" />
        </el-icon>
        <span text="3.4" single-line-omitted :style="baseStore.collapse ? '' : 'width: 68%'">
          {{ route.meta?.i18n[locale] }}
        </span>
      </template>
      <layout-menu-item :routes="route.children" />
    </el-sub-menu>
  </template>
</template>
