<script lang="ts" setup>
import { useSystemStore } from '@/hooks/use-store/use-system-store'

const { t } = useI18n()

const systemStore = useSystemStore()
</script>

<template>
  <div>
    <div v-if="systemStore.isMobile" w-screen h-screen overflow-hidden>
      <div w-full h-full box-border p-6 flex flex-wrap content-between>
        <div w-full flex items-center justify-between>
          <div text-5 font-600 flex flex-wrap items-center>
            <img mr-4 w-9 h-9 src="@/assets/logo.svg">
            <span>{{ t('app.name') }}</span>
          </div>
          <div flex items-center>
            <layout-toolbar-language only-icon mr-6 />
            <layout-toolbar-color-scheme />
          </div>
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
    <div v-else w-screen h-screen flex items-center justify-between>
      <div
        w="70%" h-full relative p-16 box-border flex flex-wrap content-between color-white
        style="background-color: var(--el-color-primary)"
      >
        <div>
          <div mb-14 text-7 font-600 flex flex-wrap items-center>
            <img mr-4 w-9 h-9 src="@/assets/logo-white.svg">
            <span>{{ t('app.name') }}</span>
          </div>
          <div text-8 font-400>
            {{ t('app.description') }}
          </div>
        </div>
        <div style="font-size: 14px" font-300>
          {{ t('app.copyright') }}
        </div>
      </div>
      <div w="30%" h-full flex items-center justify-center relative>
        <div absolute top-8 left-10>
          <div text-7 font-600 flex flex-wrap items-center>
            <img mr-4 w-9 h-9 src="@/assets/logo-white.svg">
            <span>{{ t('app.name') }}</span>
          </div>
        </div>
        <div absolute top-8 right-10>
          <layout-toolbar-language only-icon mr-6 />
          <layout-toolbar-color-scheme />
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
  </div>
</template>
