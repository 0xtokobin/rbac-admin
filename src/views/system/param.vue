<script lang="ts" setup>
import { useDateFormat } from '@vueuse/core'
import { useDict } from '@/hooks/use-dict'
import { useCrud } from '@/hooks/use-crud'

const { t } = useI18n()

const { getDict, getDictItem } = useDict()

const { queryForm, tableData, query, reset } = useCrud({
  queryUrl: '/system/param/list',
})
</script>

<template>
  <crud-card>
    <crud-table-query>
      <el-form-item :model="queryForm" @query="query" @reset="reset">
        <el-input v-model="queryForm.name" :placeholder="t('system.param.paramName')" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="queryForm.type" clearable :placeholder="t('system.param.paramType')">
          <el-option
            v-for="(item, index) in getDictItem(&quot;paramType&quot;).value" :key="index" :label="item.label"
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
      <el-table-column prop="name" :label="t('system.param.paramName')" width="240" />
      <el-table-column prop="value" :label="t('system.param.paramValue')" width="240" />
      <el-table-column prop="type" :label="t('system.param.paramType')" width="240">
        <template #default="scope">
          <el-tag>
            {{ getDict('paramType', scope.row.type) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="remark" min-width="340" :label="t('base.table.remark')" />
      <el-table-column prop="createTime" :label="t('system.role.createTime')" width="240">
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
