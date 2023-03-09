<script setup lang="ts">
import { useSystemStore } from '@/hooks/use-system-store'
import { SettingsValueEnum } from '@/constants/enums'

const systemStore = useSystemStore()
</script>

<template>
  <div>
    <app-copyright
      v-if="
        systemStore.settings.Copyright
          === SettingsValueEnum.COPYRIGHT_VIEW_BOTTOM
      "
    />
  </div>
</template>
