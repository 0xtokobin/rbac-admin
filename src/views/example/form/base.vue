<script lang="ts" setup>
defineOptions({
  name: 'ExampleFormBase',
});

const { t } = useI18n();

const form = reactive({
  name: '',
  region: '',
  date: '',
  date1: '',
  date2: '',
  publish: false,
  type: '',
  tag: [],
  desc: '',
});

const onSubmit = () => {
  console.log('submit!');
};
</script>
<template>
  <crud-card>
    <crud-page-form action :model="form" label-width="120px">
      <el-form-item :label="t('example.form.base.activityName')">
        <el-input
          v-model="form.name"
          :placeholder="
            t('crud.placeholder.enter', {
              label: t('example.form.base.activityName'),
            })
          "
        />
      </el-form-item>
      <el-form-item :label="t('example.form.base.activityZone')">
        <el-select
          v-model="form.region"
          :placeholder="
            t('crud.placeholder.select', {
              label: t('example.form.base.activityZone'),
            })
          "
        >
          <el-option :label="t('example.form.base.zoneOne')" value="1" />
          <el-option :label="t('example.form.base.zoneTwo')" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('example.form.base.activityTime')">
        <el-col :span="11">
          <el-date-picker
            v-model="form.date"
            type="datetimerange"
            range-separator="-"
            :start-placeholder="t('crud.placeholder.startTime')"
            :end-placeholder="t('crud.placeholder.endTime')"
          />
        </el-col>
      </el-form-item>
      <el-form-item :label="t('example.form.base.publish')">
        <el-switch v-model="form.publish" />
      </el-form-item>
      <el-form-item :label="t('example.form.base.activityTag')">
        <el-checkbox-group v-model="form.tag">
          <el-checkbox :label="t('example.form.base.tagOne')" name="1" />
          <el-checkbox :label="t('example.form.base.tagTwo')" name="2" />
          <el-checkbox :label="t('example.form.base.tagThree')" name="3" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item :label="t('example.form.base.activityType')">
        <el-radio-group v-model="form.type">
          <el-radio :label="t('example.form.base.typeOne')" name="1" />
          <el-radio :label="t('example.form.base.typeTwo')" name="2" />
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="t('example.form.base.desc')">
        <el-input
          v-model="form.desc"
          type="textarea"
          :placeholder="
            t('crud.placeholder.enter', {
              label: t('example.form.base.desc'),
            })
          "
        />
      </el-form-item>
    </crud-page-form>
  </crud-card>
</template>
