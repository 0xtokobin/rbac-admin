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
  className: {
    type: String,
    default: '',
  },
  size: { type: String, default: '1.2rem' },
  color: {
    type: String,
    default: 'var(--el-text-color-primary)',
  },
  customStyle: {
    type: Object,
    default: () => {
      return {}
    },
  },
  showElWidth: {
    type: Boolean,
    default: false,
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
  <i
    class="el-icon"
    inline-flex
    items-center
    justify-center
    style="height: 1em; text-align: center; vertical-align: middle"
    :style="[
      { width: props.showElWidth ? 'var(--el-menu-icon-width)' : '1em' },
      { fontSize: props.size },
      props.customStyle,
    ]"
  >
    <svg
      v-if="props.name"
      aria-hidden="true"
      :class="`wingscloud-admin-icon ${props.className}`"
      :style="`width:1em;height:1em;line-height:1em;color:${props.color};`"
    >
      <use :xlink:href="symbolId" />
    </svg>
    <component :is="props.component" v-else />
  </i>
</template>
