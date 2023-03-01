<script lang="ts" setup>
import { useDateFormat } from '@vueuse/core'
import { useCrud } from '@/hooks/use-crud/use-crud'

const { t } = useI18n()

const { queryForm, tableData, query, reset } = useCrud({
  queryUrl: '/system/role/list',
})
</script>

<template>
  <crud-card>
    <crud-table-query
      :inline="true"
      :model="queryForm"
      label-width="120px"
      @query="query"
      @reset="reset"
    >
      <el-form-item>
        <el-input
          v-model="queryForm.roleName"
          :placeholder="t('system.role.roleName')"
        />
      </el-form-item>
      <template #action>
        <el-button type="primary">
          {{ t('crud.btn.add') }}
        </el-button>
      </template>
    </crud-table-query>
    <crud-table :data="tableData">
      <el-table-column
        type="index"
        width="60"
        :label="t('crud.table.no')"
      />
      <el-table-column
        prop="name"
        width="240"
        :label="t('system.role.roleName')"
      />
      <el-table-column
        prop="remark"
        min-width="340"
        :label="t('crud.table.remark')"
      />
      <el-table-column
        prop="createTime"
        :label="t('crud.table.createTime')"
        width="240"
      >
        <template #default="scope">
          {{ useDateFormat(scope.row.createTime, 'YYYY-MM-DD HH:mm:ss').value }}
        </template>
      </el-table-column>
      <el-table-column :label="t('crud.btn.action')" fixed="right" width="120">
        <el-button type="primary" link>
          {{ t('crud.btn.edit') }}
        </el-button>
        <el-button type="primary" link>
          {{ t('crud.btn.delete') }}
        </el-button>
      </el-table-column>
    </crud-table>
  </crud-card>
</template>
