<script lang="ts" setup>
const { t } = useI18n()
</script>

<template>
  <crud-card>
    <el-result
      icon="error"
      :title="t('example.result.error.title')"
      :sub-title="t('example.result.error.subTitle')"
    >
      <template #extra>
        <el-button type="primary">
          {{ t('crud.btn.confirm') }}
        </el-button>
      </template>
    </el-result>
  </crud-card>
</template>
