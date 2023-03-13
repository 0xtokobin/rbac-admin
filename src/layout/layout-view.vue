<script lang="ts" setup>
import { LayoutEnum } from '@/enum'
import { useSystemStore } from '@/hooks/use-system-store'
import layoutViewSide from '@/layout/layout-view-side.vue'
import layoutViewHeader from '@/layout/layout-view-header.vue'
import layoutTab from '@/layout/components/tab.vue'
import layoutBreadcrumb from '@/layout/components/breadcrumb.vue'
import layoutCopyright from '@/layout/components/copyright.vue'

const systemStore = useSystemStore()
</script>

<template>
  <el-container>
    <el-aside v-if="!systemStore.isMobile" w-auto>
      <layout-view-side v-if="systemStore.layout === LayoutEnum.LAYOUT_SIDE" />
    </el-aside>
    <el-container>
      <el-header>
        <layout-view-header />
      </el-header>
      <el-container>
        <el-aside v-if="!systemStore.isMobile" w-auto>
          <layout-view-side v-if="systemStore.layout === LayoutEnum.LAYOUT_MIX" />
        </el-aside>
        <el-container>
          <layout-tab />
          <el-main>
            <layout-breadcrumb />
            <slot name="router-view" />
          </el-main>
          <el-footer>
            <layout-copyright />
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </el-container>
  <el-drawer v-model="systemStore.mobileMenu" :show-close="false" direction="ltr" :with-header="false">
    <layout-view-side />
  </el-drawer>
</template>
