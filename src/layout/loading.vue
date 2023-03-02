<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div
    v-loading="true" class="global-loading" fixed top-0 left-0 z-9999 w-screen h-screen
    :element-loading-fullscreen="true" :element-loading-lock="true" :element-loading-text="t('app.loading')"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  />
</template>
