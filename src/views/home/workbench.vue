<script lang="ts" setup>
import Welcome from './components/welcome.vue'
import Navigation from './components/navigation.vue'
import Calendar from './components/calendar.vue'
import Team from './components/team.vue'
</script>

<template>
  <div>
    <el-row>
      <el-col :span="24">
        <Welcome mb="20px" />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
        <Calendar mb="20px" />
      </el-col>
      <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
        <Navigation mb="20px" />
        <Team mb="20px" />
      </el-col>
    </el-row>
  </div>
</template>
