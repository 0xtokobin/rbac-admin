<script lang="ts" setup>
import { useDateFormat } from '@vueuse/core'
import { useCrud } from '@/hooks/use-crud'

const { t } = useI18n()

const { queryForm, tableData, query, reset } = useCrud({
  queryUrl: '/system/user/list',
})
</script>

<template>
  <crud-card>
    <crud-table-query>
      <el-form-item :model="queryForm" @query="query" @reset="reset">
        <el-input
          v-model="queryForm.roleName"
          :placeholder="t('system.role.roleName')"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="queryForm.nickname"
          :placeholder="t('system.user.nickname')"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="queryForm.username"
          :placeholder="t('system.user.username')"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="queryForm.mobile"
          :placeholder="t('system.user.mobile')"
        />
      </el-form-item>
      <template #action>
        <el-button type="primary">
          {{ t('base.btn.add') }}
        </el-button>
      </template>
    </crud-table-query>
    <crud-table :data="tableData">
      <el-table-column
        type="index"
        width="60"
        :label="t('base.table.no')"
      />
      <el-table-column
        prop="avatar"
        :label="t('system.user.avatar')"
        width="140"
      />
      <el-table-column
        prop="nickname"
        :label="t('system.user.nickname')"
        width="140"
      />
      <el-table-column
        prop="username"
        :label="t('system.user.username')"
        width="140"
      />
      <el-table-column
        prop="mobile"
        :label="t('system.user.mobile')"
        width="140"
      />
      <el-table-column
        prop="roleName"
        :label="t('system.role.role')"
        width="140"
      >
        <template #default="scope">
          <el-tag>
            {{ scope.row.roleName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        :label="t('base.table.createTime')"
        min-width="240"
      >
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
