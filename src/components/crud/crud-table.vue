<script lang="ts" setup>
import type { ComponentInternalInstance } from 'vue';

defineOptions({
  name: 'CrudTable',
});

const { slots } = getCurrentInstance() as ComponentInternalInstance;

const { t } = useI18n();

const props = defineProps({
  data: {
    type: Array,
    default: () => {
      return [];
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
});
</script>
<template>
  <div class="wings-cloud-crud-table">
    <el-table
      v-bind="$attrs"
      :data="props.data"
      :empty-text="t('crud.table.noData')"
      row-class-name="wings-cloud-crud-table-row"
      cell-class-name="wings-cloud-crud-table-cell"
      header-row-class-name="wings-cloud-crud-table-header-row"
      header-cell-class-name="wings-cloud-crud-table-header-cell"
    >
      <slot></slot>
    </el-table>
  </div>
</template>

<style lang="scss">
:root {
  --wings-cloud-table-table-row-height: 3.2rem;
}

.wings-cloud-crud-table-row {
  height: var(--wings-cloud-table-table-row-height);
}

.wings-cloud-crud-table-header-row {
  &:first-child {
    height: var(--wings-cloud-table-table-row-height);
  }
}
</style>
