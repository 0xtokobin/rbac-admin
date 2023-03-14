<script setup lang="ts">
import provider from '@/components/app/app-provider.vue'
import { useBaseStore } from '@/hooks/stores/use-base-store'

const { t } = useI18n()

const baseStore = useBaseStore()

const reload = ref<boolean>(true)

const reloadView = () => {
  reload.value = false
  nextTick(() => {
    reload.value = true
  })
}

provide('reloadView', { reload: reloadView })
</script>

<template>
  <provider>
    <template #app>
      <router-view v-slot="{ Component, route }">
        <Suspense>
          <transition name="wingscloud" mode="out-in" appear>
            <keep-alive :include="baseStore.keepAliveNames">
              <component :is="Component" v-if="reload" :key="route.fullPath" />
            </keep-alive>
          </transition>
          <template #fallback>
            <div
              v-loading="true" class="global-loading" fixed top-0 left-0 z-9999 w-screen h-screen
              :element-loading-fullscreen="true" :element-loading-lock="true" :element-loading-text="t('app.loading')"
              element-loading-background="rgba(0, 0, 0, 0.8)"
            />
          </template>
        </Suspense>
      </router-view>
    </template>
  </provider>
</template>

<style lang="scss" scoped>
.wingscloud-enter-active {
  transition: 0.2s;
}

.wingscloud-leave-active {
  transition: 0.15s;
}

.wingscloud-enter-from {
  transform: translateX(-20px);
  opacity: 0;
}

.wingscloud-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
