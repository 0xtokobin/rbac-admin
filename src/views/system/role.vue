<script lang="ts" setup>
import { useDateFormat } from '@vueuse/core'
import { useCrud } from '@/hooks/use-crud'

const { t } = useI18n()

const { queryForm, tableData, query, reset } = useCrud({
  queryUrl: '/system/role/list',
})
</script>

<template>
  <crud-card>
    <crud-table-query :inline="true" :model="queryForm" label-width="120px" @query="query" @reset="reset">
      <el-form-item>
        <el-input v-model="queryForm.roleName" :placeholder="t('system.role.roleName')" />
      </el-form-item>
      <template #action>
        <el-button type="primary">
          {{ t('base.btn.add') }}
        </el-button>
      </template>
    </crud-table-query>
    <crud-table :data="tableData">
      <el-table-column type="index" width="60" :label="t('base.table.no')" />
      <el-table-column prop="name" width="240" :label="t('system.role.roleName')" />
      <el-table-column prop="remark" min-width="340" :label="t('base.table.remark')" />
      <el-table-column prop="createTime" :label="t('base.table.createTime')" width="240">
        <template #default="scope">
          {{ useDateFormat(scope.row.createTime, 'YYYY-MM-DD HH:mm:ss').value }}
        </template>
      </el-table-column>
      <el-table-column :label="t('base.btn.action')" fixed="right" width="120">
        <el-button type="primary" link>
          {{ t('base.btn.edit') }}
        </el-button>
        <el-button type="primary" link>
          {{ t('base.btn.delete') }}
        </el-button>
      </el-table-column>
    </crud-table>
  </crud-card>
</template>
