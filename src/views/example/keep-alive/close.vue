<script lang="ts" setup>
const num = ref<number>(6)
</script>

<template>
  <crud-card>
    <el-input-number v-model="num" />
  </crud-card>
</template>
