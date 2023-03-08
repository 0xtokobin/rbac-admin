<script lang="ts" setup>
const props = defineProps({
  color: {
    type: String,
    default: 'var(--wingscloud-header-text-color)',
  },
})

const reloadView: any = inject('reloadView')

const refresh = () => {
  reloadView.reload()
}
</script>

<template>
  <div cursor-pointer flex items-center>
    <svg-icon
      cursor-pointer
      size="1.2rem"
      name="base-arrow-sync"
      :color="props.color"
      @click="refresh"
    />
  </div>
</template>
