<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div w-full m-y-4>
    <div text-center text-3 style="color: var(--el-color-info-light-3)">
      {{ t('app.copyright') }}
    </div>
  </div>
</template>
