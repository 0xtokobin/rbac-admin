<script setup lang="ts">
import provider from '@/layout/provider.vue'
import loading from '@/layout/loading.vue'
import { useSystemStore } from '@/hooks/store/use-system-store'

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
  <provider>
    <template #index>
      <router-view v-slot="{ Component, route }">
        <Suspense>
          <transition name="wingscloud-admin-page" mode="out-in" appear>
            <keep-alive :include="systemStore.keepAliveNames">
              <component :is="Component" v-if="reload" :key="route.fullPath" />
            </keep-alive>
          </transition>
          <template #fallback>
            <loading />
          </template>
        </Suspense>
      </router-view>
    </template>
  </provider>
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
