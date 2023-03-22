<script lang="ts" setup name="my-notifications">
import { useDateFormat } from '@vueuse/core'
import { useCrud } from '@/hooks/use-crud'
import { useDict } from '@/hooks/use-dict'

const { t } = useI18n()

const { getDict, getDictItem } = useDict()

const { queryForm, tableData, query, reset } = useCrud({
  queryUrl: '/system/log/list',
})
</script>

<template>
  <crud-card>
    <crud-table-query>
      <el-form-item :model="queryForm" @query="query" @reset="reset">
        <el-input v-model="queryForm.username" :placeholder="t('system.user.username')" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="queryForm.type" clearable :placeholder="t('system.log.status')">
          <el-option
            v-for="(item, index) in getDictItem(&quot;logStatus&quot;).value" :key="index" :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <template #action>
        <el-button type="primary">
          {{ t('base.btn.add') }}
        </el-button>
      </template>
    </crud-table-query>
    <crud-table :data="tableData">
      <el-table-column type="index" width="60" :label="t('base.table.no')" />
      <el-table-column prop="username" :label="t('system.user.username')" width="240" />
      <el-table-column prop="action" :label="t('system.log.action')" width="240" />
      <el-table-column prop="ip" :label="t('system.log.ip')" width="240" />
      <el-table-column prop="status" :label="t('system.log.status')" width="240">
        <template #default="scope">
          <el-tag>
            {{ getDict('logStatus', scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" :label="t('base.table.actionTime')" min-width="240">
        <template #default="scope">
          {{ useDateFormat(scope.row.createTime, 'YYYY-MM-DD HH:mm:ss').value }}
        </template>
      </el-table-column>
      <el-table-column :label="t('base.btn.action')" fixed="right" width="120">
        <el-button type="primary" link>
          {{ t('system.log.api') }}
        </el-button>
      </el-table-column>
    </crud-table>
  </crud-card>
</template>
