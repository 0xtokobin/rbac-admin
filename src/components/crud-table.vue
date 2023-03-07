<script lang="ts" setup>
const props = defineProps({
  data: {
    type: Array,
    default: () => {
      return []
    },
  },
  actionLabel: {
    type: String,
    default: '',
  },
  actionWidth: {
    type: String,
    default: '120',
  },
})

const { t } = useI18n()
</script>

<template>
  <div class="wingscloud-admin-crud-table">
    <el-table
      v-bind="$attrs"
      :data="props.data"
      :empty-text="t('crud.table.noData')"
      row-class-name="wingscloud-admin-crud-table-row"
      cell-class-name="wingscloud-admin-crud-table-cell"
      header-row-class-name="wingscloud-admin-crud-table-header-row"
      header-cell-class-name="wingscloud-admin-crud-table-header-cell"
    >
      <slot />
    </el-table>
  </div>
</template>

<style lang="scss">
:root {
  --wingscloud-admin-table-table-row-height: 3.2rem;
}

.wingscloud-admin-crud-table-row {
  height: var(--wingscloud-admin-table-table-row-height);
}

.wingscloud-admin-crud-table-header-row {
  &:first-child {
    height: var(--wingscloud-admin-table-table-row-height);
  }
}
</style>
