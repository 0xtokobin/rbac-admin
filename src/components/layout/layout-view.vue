<script lang="ts" setup>
import { LayoutEnum } from '@/enum'
import { useSystemStore } from '@/hooks/use-system-store'

const systemStore = useSystemStore()
</script>

<template>
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
        <app-tab />
        <el-main>
          <app-breadcrumb />
          <slot name="router-view" />
        </el-main>
        <el-footer>
          <app-copyright />
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
  <el-drawer v-model="systemStore.mobileMenu" :show-close="false" direction="ltr" :with-header="false">
    <layout-view-aside />
  </el-drawer>
</template>
