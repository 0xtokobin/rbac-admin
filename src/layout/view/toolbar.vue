<script lang="ts" setup>
import toolbarFullscreen from '@/layout/toolbar/fullscreen.vue'
import toolbarLanguage from '@/layout/toolbar/language.vue'
import toolbarNotification from '@/layout/toolbar/notification.vue'
import toolbarRefresh from '@/layout/toolbar/refresh.vue'
import toolbarSetting from '@/layout/toolbar/setting.vue'
import toolbarAvatar from '@/layout/toolbar/avatar.vue'
import toolbarColorScheme from '@/layout/toolbar/color-scheme.vue'
import { SettingsValueEnum } from '@/constants/enums'
import { useSystemStore } from '@/hooks/store/use-system-store'

const props = defineProps({
  fixed: {
    type: Boolean,
    default: false,
  },
})

const systemStore = useSystemStore()

const iconColor = () => {
  return props.fixed ? '#fff' : 'var(--wingscloud-admin-header-text-color)'
}

const collapse = ref<boolean>(true)

const changeToolbar = () => {
  if (!props.fixed)
    return
  collapse.value = !collapse.value
}
</script>

<template>
  <div
    h-full flex items-center justify-end p-x-6 box-border style="width: var(--wingscloud-admin-header-toobar-width)"
    :class="[
      props.fixed ? 'wingscloud-admin-fixed' : '',
      systemStore.isMobile ? 'wingscloud-admin-small' : 'wingscloud-admin-normal',
      systemStore.colorScheme === SettingsValueEnum.COLOR_SCHEME_DARK
        ? 'wingscloud-admin-dark'
        : '',
    ]"
  >
    <el-icon
      v-if="props.fixed" cursor-pointer color="#fff" m-r-4
      :style="collapse ? 'transform:rotate(180deg)' : 'transform:rotate(0deg)'" @click="changeToolbar()"
    >
      <ArrowRight />
    </el-icon>
    <div
      h-full flex items-center justify-end
      :class="systemStore.isMobile ? 'wingscloud-admin-mobile' : 'wingscloud-admin-pc'"
      :style="collapse ? 'width:0' : 'width:auto'"
    >
      <toolbar-color-scheme
        v-if="systemStore.settings.Toolbar.Dark" class="wingscloud-admin-toolbar"
        :color="iconColor()"
      />
      <toolbar-language
        v-if="systemStore.settings.Toolbar.Language" only-icon class="wingscloud-admin-toolbar"
        :color="iconColor()"
      />
      <toolbar-refresh
        v-if="systemStore.settings.Toolbar.Refresh" class="wingscloud-admin-toolbar"
        :color="iconColor()"
      />
      <toolbar-notification
        v-if="systemStore.settings.Toolbar.Notification" class="wingscloud-admin-toolbar"
        :color="iconColor()"
      />
      <toolbar-fullscreen
        v-if="systemStore.settings.Toolbar.Fullscreen && !systemStore.isMobile"
        class="wingscloud-admin-toolbar" :color="iconColor()"
      />
      <toolbar-setting
        v-if="systemStore.settings.Toolbar.Setting" class="wingscloud-admin-toolbar"
        :color="iconColor()"
      />
    </div>
    <toolbar-avatar
      v-if="systemStore.settings.Toolbar.Avatar" :color="iconColor()"
      :avatar-size="systemStore.isMobile ? 28 : 38" @click="changeToolbar"
    />
  </div>
</template>

<style lang="scss" scoped>
.wingscloud-admin-mobile .wingscloud-admin-toolbar {
  margin-right: 1.4rem;
}

.wingscloud-admin-pc .wingscloud-admin-toolbar {
  margin-right: 2rem;
}

.wingscloud-admin-fixed {
  position: fixed;
  top: 20%;
  right: 0;
  width: auto !important;
  background-color: var(--el-color-primary);
  border-radius: 10px 0 0 10px;
  box-shadow: var(--el-box-shadow);
  transform: translateY(-50%);

  &.wingscloud-admin-dark {
    background-color: var(--el-color-primary);
  }

  &.wingscloud-admin-normal {
    height: 4rem;
    padding: 0.8rem;
  }

  &.wingscloud-admin-small {
    height: 2.8rem;
    padding: 0 0.8rem 0 0.4rem;
  }

  .wingscloud-admin-mobile,
  .wingscloud-admin-pc {
    overflow: hidden;
  }
}
</style>
