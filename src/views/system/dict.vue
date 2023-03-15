<script lang="ts" setup>
import { useDateFormat } from '@vueuse/core'
import { useCrud } from '@/hooks/use-crud'
import { useDict } from '@/hooks/use-dict'

const { t } = useI18n()

const { getDict, getDictItem } = useDict()

const { queryForm, tableData, query, reset } = useCrud({
  queryUrl: '/system/dict/list',
})
</script>

<template>
  <crud-card>
    <crud-table-query>
      <el-form-item :model="queryForm" @query="query" @reset="reset">
        <el-input v-model="queryForm.name" :placeholder="t('system.dict.dictName')" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="queryForm.type" clearable :placeholder="t('system.dict.dictType')">
          <el-option
            v-for="(item, index) in getDictItem(&quot;dictType&quot;).value" :key="index" :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <template #action>
        <el-button type="primary">
          {{ t('crud.btn.add') }}
        </el-button>
      </template>
    </crud-table-query>
    <crud-table :data="tableData">
      <el-table-column type="index" width="60" :label="t('crud.table.no')" />
      <el-table-column prop="key" :label="t('system.dict.dictName')" width="240" />
      <el-table-column prop="value" :label="t('system.dict.dictType')" width="240">
        <template #default="scope">
          <el-tag>
            {{ getDict('dictType', scope.row.type) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="t('system.dict.dictItem')" width="240">
        <template #default>
          <el-button type="primary" link>
            {{ t('system.dict.dictItem') }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="remark" min-width="340" :label="t('crud.table.remark')" />
      <el-table-column prop="createTime" :label="t('system.role.createTime')" width="240">
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
