<script lang="ts" setup>
const { t } = useI18n()

const shortCuts = ref<Array<any>>([
  {
    value: 'user',
    path: '/system/user',
    icon: '',
    i18nKey: 'home.workbench.shortcutsUser',
  },
  {
    value: 'profile',
    path: '/system/profile',
    icon: '',
    i18nKey: 'home.workbench.shortcutsProfile',
  },
  {
    value: 'department',
    path: '/system/department',
    icon: '',
    i18nKey: 'home.workbench.shortcutsDeparment',
  },
  {
    value: 'role',
    path: '/system/role',
    icon: '',
    i18nKey: 'home.workbench.shortcutsRole',
  },
  {
    value: 'menu',
    path: '/system/menu',
    icon: '',
    i18nKey: 'home.workbench.shortcutsMenu',
  },
])
</script>

<template>
  <crud-card :title="t('home.workbench.shortcuts')">
    <div>
      <el-button
        v-for="item in shortCuts"
        :key="item.value"
        type="info"
        text
        bg
        mb-4
      >
        {{ t(item.i18nKey) }}
      </el-button>
    </div>
  </crud-card>
</template>

<style lang="scss" scoped>
:deep(.el-button) {
  margin: 0.4rem !important;
}
</style>
