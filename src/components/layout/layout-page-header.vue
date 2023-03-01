<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div w-full h-20 flex items-center justify-between>
    <div text-5 font-600 flex flex-wrap items-center>
      <img mr-4 w-9 h-9 src="@/assets/logo.svg">
      <span>{{ t('app.name') }}</span>
    </div>
    <div flex items-center>
      <layout-toolbar-language only-icon mr-6 />
      <layout-toolbar-color-scheme />
    </div>
  </div>
</template>
