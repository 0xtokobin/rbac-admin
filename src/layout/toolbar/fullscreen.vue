<script lang="ts" setup>
import { useFullscreen } from '@vueuse/core'

const props = defineProps({
  color: {
    type: String,
    default: 'var(--wingscloud-header-text-color)',
  },
})

const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <div flex items-center justify-center>
    <svg-icon
      size="1.22rem" cursor-pointer :color="props.color"
      :name="isFullscreen ? 'base-exit-fullscreen' : 'base-fullscreen'" @click="toggle"
    />
  </div>
</template>
