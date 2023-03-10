<script lang="ts" setup>
const route = useRoute()
</script>

<template>
  <div flex items-center justify-start>
    <el-breadcrumb>
      <el-breadcrumb-item v-for="(item, index) in route.meta.breadcrumb" :key="index">
        {{ item.label }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
