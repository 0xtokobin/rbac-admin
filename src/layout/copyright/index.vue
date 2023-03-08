<script lang="ts" setup>
import { useSystemStore } from '@/hooks/store/use-system-store'

const { t } = useI18n()

const systemStore = useSystemStore()
</script>

<template>
  <div
    text-center style="padding: var(--wingscloud-main-padding) 0;color: var(--el-text-color-secondary)"
    :class="systemStore.isMobile ? 'text-3' : 'text-4'"
  >
    {{ t('app.copyright') }}
  </div>
</template>
