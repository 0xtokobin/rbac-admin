<script setup lang="ts">
import pageHeader from '@/layout/page/header.vue'
import copyright from '@/layout/copyright/index.vue'
</script>

<template>
  <el-container>
    <el-header>
      <page-header />
    </el-header>
    <el-main>
      <slot name="router-view" />
    </el-main>
    <el-footer>
      <copyright />
    </el-footer>
  </el-container>
</template>
