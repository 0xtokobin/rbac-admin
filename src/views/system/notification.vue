<script lang="ts" setup>
import { useDateFormat } from '@vueuse/core'
import { useCrud } from '@/hooks/use-crud'
import { useDictionary } from '@/hooks/use-dictionary'

const { t } = useI18n()

const { getDictionary, getDictionaryData } = useDictionary()

const { queryForm, tableData, query, reset } = useCrud({
  queryUrl: '/system/user/notification',
})
</script>

<template>
  <crud-card>
    <crud-table-query :model="queryForm" @query="query" @reset="reset">
      <el-form-item>
        <el-select
          v-model="queryForm.type"
          clearable
          :placeholder="t('system.notification.notificationType')"
        >
          <el-option
            v-for="(item, index) in getDictionaryData('notificationType').value"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="queryForm.content"
          :placeholder="t('system.notification.notificationContent')"
        />
      </el-form-item>
    </crud-table-query>
    <crud-table :data="tableData">
      <el-table-column
        type="index"
        width="60"
        :label="t('crud.table.no')"
      />
      <el-table-column
        prop="type"
        :label="t('system.notification.notificationType')"
        width="140"
      >
        <template #default="scope">
          {{ getDictionary('notificationType', scope.row.type) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        :label="t('system.notification.notificationContent')"
        min-width="340"
      />
      <el-table-column
        prop="source"
        :label="t('system.notification.source')"
        width="140"
      >
        <template #default="scope">
          {{ getDictionary('notificationSource', scope.row.type) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        :label="t('system.notification.time')"
        width="240"
      >
        <template #default="scope">
          {{ useDateFormat(scope.row.createTime, 'YYYY-MM-DD HH:mm:ss').value }}
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        :label="t('system.notification.isRead')"
        width="140"
      >
        <template #default="scope">
          {{ getDictionary('notificationIsRead', scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column :label="t('crud.btn.action')" width="120">
        <template #default="scope">
          <el-button v-if="scope.row.status === 0" type="primary" link>
            {{ t('system.notification.read') }}
          </el-button>
        </template>
      </el-table-column>
    </crud-table>
  </crud-card>
</template>
