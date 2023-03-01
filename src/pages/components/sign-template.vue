<script lang="ts" setup>
import { useSystemStore } from '@/hooks/use-store/use-system-store'

const systemStore = useSystemStore()
</script>

<template>
  <div>
    <div v-if="systemStore.isMobile" w-screen h-screen overflow-hidden>
      <div w-full h-full box-border p-6 flex flex-wrap content-between>
        <div w-full flex items-center justify-between>
          <div flex items-center>
            <layout-toolbar-language only-icon mr-6 />
            <layout-toolbar-color-scheme />
          </div>
          <slot name="top-right" />
        </div>
        <div w-full flex flex-wrap items-center content-center box-border>
          <div w-full p-b-8>
            <slot name="title" />
          </div>
          <div w-full>
            <slot name="form" />
          </div>
        </div>
        <slot name="bottom-center" />
      </div>
    </div>
    <div v-else w-screen h-screen flex items-center justify-center relative>
      <div absolute top-8 left-10>
        <layout-toolbar-language only-icon mr-6 />
        <layout-toolbar-color-scheme />
      </div>
      <div absolute top-8 right-10>
        <slot name="top-right" />
      </div>
      <div w-sm>
        <div m-b-8>
          <slot name="title" />
        </div>
        <slot name="form" />
      </div>
      <div absolute bottom-8 right="50%" translate-x="50%">
        <slot name="bottom-center" />
      </div>
    </div>
  </div>
</template>
