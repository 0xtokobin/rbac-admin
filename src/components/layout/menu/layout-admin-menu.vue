<script lang="ts" setup>
import { useSystemStore } from '@/hooks/use-store/use-system-store';
import { useRouteStore } from '@/hooks/use-store/use-route-store';
import { SettingsValueEnum } from '@/constants/enums';

defineOptions({
  name: 'LayoutAdminMenu',
});

const route = useRoute();

const systemStore = useSystemStore();
const routeStore = useRouteStore();

const props = defineProps({
  mode: {
    type: String,
    default: 'vertical',
  },
});

const wrapStyle = computed(() => {
  if (props.mode == 'vertical') {
    let _height = '100vh';
    if (
      systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP ||
      systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP_LEAN
    ) {
      _height =
        'calc(100vh - var(--wings-cloud-header-height) - var(--wings-cloud-collapse-height))';
    } else {
      _height =
        'calc(100vh - var(--wings-cloud-aside-logo-height) - var(--wings-cloud-collapse-height))';
    }
    if (systemStore.isMobile) {
      _height = 'calc(100vh - var(--wings-cloud-aside-logo-height)';
    }
    return 'height:' + _height + ';';
  } else {
    let _width =
      'calc(100vw - var(--wings-cloud-header-toobar-width) - var(--wings-cloud-header-logo-width))';
    return 'width:' + _width + ';height:100%;display:flex;align-items:center;';
  }
});
</script>

<template>
  <el-scrollbar :wrap-style="wrapStyle">
    <div
      :class="[
        'wings-cloud-' + systemStore.settings.MenuStyle,
        'wings-cloud-' + systemStore.colorScheme,
        'wings-cloud-' + systemStore.settings.Layout,
        'wings-cloud-layout-admin-menu',
      ]"
      h-full
    >
      <el-menu
        router
        collapse-transition
        :mode="(props.mode as any)"
        :collapse="props.mode == 'vertical' ? systemStore.collapse : false"
        :unique-opened="systemStore.settings.UniqueOpened"
        :default-active="route.path"
        important="h-full border-none"
      >
        <layout-admin-menu-item
          :routes="routeStore.menuRoutes"
        ></layout-admin-menu-item>
      </el-menu>
    </div>
  </el-scrollbar>
</template>
