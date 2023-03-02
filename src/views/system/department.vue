<script lang="ts" setup>
import { useCrud } from '@/hooks/crud/use-crud'
import { useSystemStore } from '@/hooks/store/use-system-store'

const { t } = useI18n()

const { tableData } = useCrud({
  queryUrl: '/system/department/list',
})

const systemStore = useSystemStore()
</script>

<template>
  <crud-card>
    <crud-table-query :query="false" :reset="false">
      <template #action>
        <el-button type="primary">
          {{ t('crud.btn.add') }}
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
      <el-table-column prop="sort" :label="t('crud.table.sort')" width="140" />
      <el-table-column
        min-width="340"
        prop="remark"
        :label="t('crud.table.remark')"
      />
      <el-table-column
        :label="t('crud.btn.action')"
        fixed="right"
        :width="systemStore.isMobile ? '120' : '300'"
      >
        <template #default="scope">
          <el-button type="primary" link>
            {{ t('system.department.subDepartment') }}
          </el-button>
          <el-button type="primary" link>
            {{ t('crud.btn.edit') }}
          </el-button>
          <el-button
            v-if="!scope.row.children || scope.row.children.length === 0"
            type="primary"
            link
          >
            {{ t('crud.btn.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </crud-table>
  </crud-card>
</template>
