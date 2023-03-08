<script lang="ts" setup>
import { useSystemStore } from '@/hooks/store/use-system-store'

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

const systemStore = useSystemStore()
</script>

<template>
  <div
    text-center :style="{ padding: props.padding, color: props.color }"
    :class="systemStore.isMobile ? 'text-3.2' : 'text-3.8'"
  >
    {{ t('app.copyright') }}
  </div>
</template>
