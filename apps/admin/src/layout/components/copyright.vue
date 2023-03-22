<script lang="ts" setup>
import { useBaseStore } from '@/hooks/stores/use-base-store'

const props = defineProps({
  color: {
    type: String,
    default: 'var(--el-text-color-secondary)',
  },
  padding: {
    type: String,
    default: 'var(--wingscloud-main-padding)',
  },
})

const { t } = useI18n()

const baseStore = useBaseStore()
</script>

<template>
  <div
    text-center :style="{ padding: props.padding, color: props.color }"
    :class="baseStore.isMobile ? 'text-3.2' : 'text-3.8'"
  >
    {{ t('base.copyright') }}
  </div>
</template>
