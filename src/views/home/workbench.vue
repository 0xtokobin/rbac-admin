<script lang="ts" setup>
import Welcome from './components/welcome.vue';
import Navigation from './components/navigation.vue';
import Calendar from './components/calendar.vue';
import Active from './components/active.vue';
import Team from './components/team.vue';

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
      <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
        <calendar mb="20px"></calendar>
      </el-col>
      <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
        <navigation mb="20px"></navigation>
        <team mb="20px"></team>
      </el-col>
    </el-row>
  </div>
</template>
