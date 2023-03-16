<script lang="ts" setup>
const props = defineProps({
  query: {
    type: Boolean,
    default: true,
  },
  reset: {
    type: Boolean,
    default: true,
  },
  queryLabel: {
    type: String,
    default: '',
  },
  resetLabel: {
    type: String,
    default: '',
  },
})

const { t } = useI18n()
</script>

<template>
  <div class="wingscloud-admin-crud-table-query">
    <el-form v-bind="$attrs" inline>
      <slot />
      <el-form-item>
        <el-button v-if="props.query" @click="$attrs.onQuery">
          {{ props.queryLabel || t('base.btn.query') }}
        </el-button>
        <el-button v-if="props.reset" @click="$attrs.onReset">
          {{ props.resetLabel || t('base.btn.reset') }}
        </el-button>
        <slot name="action" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss">
.wingscloud-admin-crud-table-query {
  .el-form-item {
    width: 200px !important;
    margin-right: 20px !important;

    &:last-child {
      width: auto !important;
      margin-right: 0 !important;
    }
  }
}
</style>
