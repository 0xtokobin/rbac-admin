<script lang="ts" setup>
const route = useRoute()

const { locale } = useI18n()
</script>

<template>
  <el-breadcrumb mb="20px">
    <el-breadcrumb-item v-for="(item, index) in route.meta.breadcrumb" :key="index">
      {{ item.label[locale] }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
