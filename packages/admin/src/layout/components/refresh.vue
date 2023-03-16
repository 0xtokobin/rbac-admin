<script lang="ts" setup>
import {
  Refresh,
} from '@element-plus/icons-vue'

const reloadView: any = inject('reloadView')

const refresh = () => {
  reloadView.reload()
}
</script>

<template>
  <el-button important-m-0 circle :icon="Refresh" @click="refresh" />
</template>
