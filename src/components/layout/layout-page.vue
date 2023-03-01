<template>
  <el-container style="background: var(--el-bg-color)">
    <el-header>
      <layout-page-header />
    </el-header>
    <el-main>
      <slot name="router-view" />
      <layout-page-footer />
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
:deep(.el-header) {
  box-sizing: border-box;
  overflow: hidden;
  background-color: var(--wingscloud-admin-header-bg-color);
  border-color: var(--wingscloud-admin-header-border-color) !important;
  transition: all var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);
  height: var(--wingscloud-admin-header-height);
}

:deep(.el-container) {
  box-sizing: border-box;
  overflow: hidden;
  background-color: var(--wingscloud-admin-menu-bg-color);
  transition: all var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);
}

:deep(.el-aside) {
  box-sizing: border-box;
  overflow: hidden;
  border-right: 1px solid var(--wingscloud-admin-aside-border-color);
  transition: all var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);
}

:deep(.el-main) {
  box-sizing: border-box;
  padding: 0;
  overflow: hidden;
  background: var(--wingscloud-admin-main-fill);
  transition: all var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);
  height: calc(100vh - var(--wingscloud-admin-header-height));
}

:deep(.el-drawer) {
  overflow-x: hidden;
  background-color: var(--wingscloud-admin-menu-bg-color);
}
</style>
