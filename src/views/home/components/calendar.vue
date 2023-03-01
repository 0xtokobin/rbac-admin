<script lang="ts" setup>
const { t } = useI18n()
</script>

<template>
  <crud-card :title="t('home.workbench.calendar')">
    <el-calendar />
  </crud-card>
</template>
