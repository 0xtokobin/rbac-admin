<script lang="ts" setup>
import { useSystemStore } from '@/hooks/use-store/use-system-store';

defineOptions({
  name: 'SignTemplate',
});

const { t } = useI18n();

const systemStore = useSystemStore();
</script>
<template>
  <div>
    <div w-screen h-screen overflow-hidden v-if="systemStore.isMobile">
      <div w-full h-full box-border p-6 flex flex-wrap content-between>
        <div w-full flex items-center justify-between>
          <div flex items-center>
            <layout-toolbar-language only-icon mr-6></layout-toolbar-language>
            <layout-toolbar-color-scheme></layout-toolbar-color-scheme>
          </div>
          <slot name="top-right"></slot>
        </div>
        <div w-full flex flex-wrap items-center content-center box-border>
          <div w-full p-b-8>
            <slot name="title"></slot>
          </div>
          <div w-full>
            <slot name="form"></slot>
          </div>
        </div>
        <slot name="bottom-center"></slot>
      </div>
    </div>
    <div v-else w-screen h-screen flex items-center justify-between>
      <div
        w="30%"
        h-full
        relative
        p-16
        box-border
        flex
        flex-wrap
        content-between
        color-white
        style="background-color: var(--el-color-primary)"
      >
        <div>
          <div mb-14 text-7 font-600 flex flex-wrap items-center>
            <img mr-4 w-9 h-9 src="@/assets/logo-white.svg" />
            <span>{{ t('app.name') }}</span>
          </div>
          <div text-8 font-400>{{ t('app.description') }}</div>
        </div>
        <div style="font-size: 14px" font-300>{{ t('app.copyright') }}</div>
      </div>
      <div w="70%" h-full flex items-center justify-center relative>
        <div absolute top-8 left-10>
          <layout-toolbar-language only-icon mr-6></layout-toolbar-language>
          <layout-toolbar-color-scheme></layout-toolbar-color-scheme>
        </div>
        <div absolute top-8 right-10>
          <slot name="top-right"></slot>
        </div>
        <div w-sm>
          <div m-b-8>
            <slot name="title"></slot>
          </div>
          <slot name="form"></slot>
        </div>
        <div absolute bottom-8 right="50%" translate-x="50%">
          <slot name="bottom-center"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
