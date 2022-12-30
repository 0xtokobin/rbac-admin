<script setup lang="ts">
import { useSystemStore } from '@/hooks/use-store/use-system-store';

defineOptions({
  name: 'App',
});

const systemStore = useSystemStore();

const reload = ref<boolean>(true);

const reloadView = () => {
  reload.value = false;
  nextTick(() => {
    reload.value = true;
  });
};

provide('reloadView', { reload: reloadView });
</script>

<template>
  <app-provider>
    <template #app>
      <router-view v-slot="{ Component, route }">
        <Suspense>
          <transition name="wings-cloud-page" mode="out-in" appear>
            <keep-alive :include="systemStore.keepAliveNames">
              <component :is="Component" :key="route.fullPath" v-if="reload" />
            </keep-alive>
          </transition>
          <template #fallback>
            <app-loading></app-loading>
          </template>
        </Suspense>
      </router-view>
    </template>
  </app-provider>
</template>

<style lang="scss" scoped>
.wings-cloud-page-enter-active {
  transition: 0.2s;
}

.wings-cloud-page-leave-active {
  transition: 0.15s;
}

.wings-cloud-page-enter-from {
  transform: translateX(-20px);
  opacity: 0;
}

.wings-cloud-page-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
