<script lang="ts" setup>
import type { Component, PropType } from 'vue'

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    required: true,
  },
  component: {
    type: Object as PropType<Component>,
    default: () => {
      return {}
    },
  },
})

const symbolId = computed(
  () => `#${props.prefix}-${props.name.replace('icon-', '')}`,
)
</script>

<template>
  <el-icon v-bind="$attrs">
    <svg v-if="props.name" aria-hidden="true">
      <use :xlink:href="symbolId" />
    </svg>
    <component :is="props.component" v-else />
  </el-icon>
</template>
