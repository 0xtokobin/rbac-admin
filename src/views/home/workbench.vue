<script lang="ts" setup>
import Welcome from './components/welcome.vue';
import Navigation from './components/navigation.vue';
import Calendar from './components/calendar.vue';
import Active from './components/active.vue';

defineOptions({
  name: 'HomeWorkbench',
});
</script>
<template>
  <div>
    <el-row>
      <el-col :span="24">
        <welcome mb="20px"></welcome>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <calendar mb="20px"></calendar>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <navigation mb="20px"></navigation>
        <active mb="20px"></active>
      </el-col>
    </el-row>
  </div>
</template>
