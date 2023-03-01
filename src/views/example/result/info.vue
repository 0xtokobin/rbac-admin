<script lang="ts" setup>
const { t } = useI18n()
</script>

<template>
  <crud-card>
    <el-result
      icon="info"
      :title="t('example.result.info.title')"
      :sub-title="t('example.result.info.subTitle')"
    >
      <template #extra>
        <el-button type="primary">
          {{ t('crud.btn.confirm') }}
        </el-button>
      </template>
    </el-result>
  </crud-card>
</template>
