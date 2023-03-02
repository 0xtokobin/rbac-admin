<script lang="ts" setup>
const { t } = useI18n()
</script>

<template>
  <div
    flex
    items-center
    justify-center
    style="padding: var(--wingscloud-admin-main-padding) 0"
  >
    <div
      text-3
      style="color: var(--el-text-color-secondary)"
    >
      {{ t('app.copyright') }}
    </div>
  </div>
</template>
