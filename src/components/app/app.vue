<script setup lang="ts">
import { useSystemStore } from '@/hooks/use-store/use-system-store'

const systemStore = useSystemStore()

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
  <app-provider>
    <template #app>
      <router-view v-slot="{ Component, route }">
        <Suspense>
          <transition name="wingscloud-admin-page" mode="out-in" appear>
            <keep-alive :include="systemStore.keepAliveNames">
              <component :is="Component" v-if="reload" :key="route.fullPath" />
            </keep-alive>
          </transition>
          <template #fallback>
            <app-loading />
          </template>
        </Suspense>
      </router-view>
    </template>
  </app-provider>
</template>

<style lang="scss" scoped>
.wingscloud-admin-page-enter-active {
  transition: 0.2s;
}

.wingscloud-admin-page-leave-active {
  transition: 0.15s;
}

.wingscloud-admin-page-enter-from {
  transform: translateX(-20px);
  opacity: 0;
}

.wingscloud-admin-page-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
