<script lang="ts" setup>
import { useBaseStore } from '@/store/base'
import { useCrud } from '@/hooks/use-crud'

const { t } = useI18n()

const { tableData } = useCrud({
  queryUrl: '/system/department/list',
})

const baseStore = useBaseStore()
</script>

<template>
  <crud-card>
    <crud-table-query :query="false" :reset="false">
      <template #action>
        <el-button type="primary">
          {{ t('base.btn.add') }}
        </el-button>
      </template>
    </crud-table-query>
    <crud-table :data="tableData" action-width="300" row-key="id">
      <el-table-column
        :label="t('system.department.departmentName')"
        width="240"
        prop="name"
      />
      <el-table-column
        :label="t('system.department.parentDepartmentName')"
        width="240"
        prop="parentName"
      />
      <el-table-column prop="sort" :label="t('base.table.sort')" width="140" />
      <el-table-column
        min-width="340"
        prop="remark"
        :label="t('base.table.remark')"
      />
      <el-table-column
        :label="t('base.btn.action')"
        fixed="right"
        :width="baseStore.isMobile ? '120' : '300'"
      >
        <template #default="scope">
          <el-button type="primary" link>
            {{ t('system.department.subDepartment') }}
          </el-button>
          <el-button type="primary" link>
            {{ t('base.btn.edit') }}
          </el-button>
          <el-button
            v-if="!scope.row.children || scope.row.children.length === 0"
            type="primary"
            link
          >
            {{ t('base.btn.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </crud-table>
  </crud-card>
</template>
