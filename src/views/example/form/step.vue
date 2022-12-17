<script lang="ts" setup>
defineOptions({
  name: 'ExampleFormStep',
});

const { t } = useI18n();

const form = reactive({
  payAccount: '',
});
</script>
<template>
  <crud-card>
    <crud-page-form action :model="form" label-width="120px">
      <el-form-item :label="t('example.form.base.activityName')">
        <el-input
          v-model="form.payAccount"
          :placeholder="
            t('crud.placeholder.enter', {
              label: t('example.form.base.activityName'),
            })
          "
        />
      </el-form-item>
    </crud-page-form>
  </crud-card>
</template>
