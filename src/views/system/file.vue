<script lang="ts" setup name="my-notifications">
import { useDateFormat } from '@vueuse/core'
import { useCrud } from '@/hooks/use-crud'

const { t } = useI18n()

const { tableData } = useCrud({
  queryUrl: '/system/file/list',
})
</script>

<template>
  <crud-card>
    <crud-table-query :query="false" :reset="false">
      <template #action>
        <el-button type="primary">
          {{ t('crud.btn.upload') }}
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
        prop="username"
        :label="t('system.file.fileUrl')"
        min-width="340"
      />
      <el-table-column
        prop="createTime"
        :label="t('crud.table.uploadTime')"
        width="240"
      >
        <template #default="scope">
          {{ useDateFormat(scope.row.createTime, 'YYYY-MM-DD HH:mm:ss').value }}
        </template>
      </el-table-column>
      <el-table-column :label="t('crud.btn.action')" fixed="right" width="120">
        <el-button type="primary" link>
          {{ t('crud.btn.delete') }}
        </el-button>
      </el-table-column>
    </crud-table>
  </crud-card>
</template>
