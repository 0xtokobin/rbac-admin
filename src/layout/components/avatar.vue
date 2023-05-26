<script lang="ts" setup>
import { useUserStore } from '@/store/user'
import { useBaseStore } from '@/store/base'
import { DarkModeEnum, LayoutEnum, SizeEnum, ThemeEnum } from '@/enums/base'
import { setEpThemeColor } from '@/utils/base'
import avatar from '@/assets/image/logo-black.png'

const { t, locale, messages } = useI18n()

const userStore = useUserStore()

const baseStore = useBaseStore()

const personalDrawerVisible = ref<boolean>(false)

function openPersonalDrawer() {
  personalDrawerVisible.value = true
}

const active = ref(['general', 'personal', 'ui'])

function changeDarkMode(e: string) {
  if (e === DarkModeEnum.DARK_MODE_AUTO)
    baseStore.openDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
  else
    baseStore.openDarkMode(e === DarkModeEnum.DARK_MODE_DARK)
}
</script>

<template>
  <el-avatar :size="32" cursor-pointer :src="userStore.profile.avatar || avatar" @click="openPersonalDrawer" />
  <el-drawer v-model="personalDrawerVisible" :size="300">
    <template #header="{ titleId, titleClass }">
      <div :id="titleId" h-full flex items-center :class="titleClass">
        <el-avatar mr-3 :src="userStore.profile.avatar || avatar" />
        <div text="4.6">
          {{ userStore.profile.nickname }}
        </div>
      </div>
    </template>
    <el-form label-position="left" label-width="100px" h-full flex flex-col items-stretch>
      <el-collapse v-model="active" flex-auto overflow-auto>
        <el-scrollbar>
          <el-collapse-item :title="t('base.avatar.generalSettings')" name="general">
            <el-form-item :label="t('base.avatar.language')">
              <el-select v-model="locale" important-w-full>
                <el-option v-for="(value, key) in messages" :key="key" :label="value.name" :value="key" />
              </el-select>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item :title="t('base.avatar.personalSettings')" name="personal">
            <el-form-item :label="t('base.avatar.avatar')">
              <avatar-upload />
            </el-form-item>
            <el-form-item :label="t('base.avatar.username')">
              <el-input v-model="userStore.profile.username" disabled />
            </el-form-item>
            <el-form-item :label="t('base.avatar.nickname')">
              <el-input v-model="userStore.profile.nickname" />
            </el-form-item>
            <el-form-item :label="t('base.avatar.mobile')">
              <span mr-2 style="color:var(--el-text-color-secondary);">
                {{ userStore.profile.mobile || t('base.avatar.empty') }}
              </span>
              <el-button v-if="!userStore.profile.mobile" type="primary" link>
                {{ t('base.avatar.bind') }}
              </el-button>
              <el-button v-else type="primary" link>
                {{ t('base.avatar.change') }}
              </el-button>
            </el-form-item>
            <el-form-item :label="t('base.avatar.dept')">
              <span mr-2 style="color:var(--el-text-color-secondary);">
                {{ userStore.profile.deptName || t('base.avatar.empty') }}
              </span>
            </el-form-item>
            <el-form-item :label="t('base.avatar.role')">
              <span mr-2 style="color:var(--el-text-color-secondary);">
                {{ userStore.profile.roleName || t('base.avatar.empty') }}
              </span>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item :title="t('base.avatar.uiSettings')" name="ui">
            <el-form-item :label="t('base.avatar.tab')">
              <el-switch v-model="baseStore.tab" />
            </el-form-item>
            <el-form-item :label="t('base.avatar.breadcrumb')">
              <el-switch v-model="baseStore.breadcrumb" />
            </el-form-item>
            <el-form-item :label="t('base.avatar.layout')">
              <el-select v-model="baseStore.layout" important-w-full>
                <el-option :label="t('base.avatar.layoutMix')" :value="LayoutEnum.LAYOUT_MIX" />
                <el-option :label="t('base.avatar.layoutTop')" :value="LayoutEnum.LAYOUT_TOP" />
                <el-option :label="t('base.avatar.layoutSide')" :value="LayoutEnum.LAYOUT_SIDE" />
              </el-select>
            </el-form-item>
            <el-form-item :label="t('base.avatar.size')">
              <el-select v-model="baseStore.size" important-w-full>
                <el-option :label="t('base.avatar.sizeLarge')" :value="SizeEnum.LARGE" />
                <el-option :label="t('base.avatar.sizeDefault')" :value="SizeEnum.DEFAULT" />
                <el-option :label="t('base.avatar.sizeSmall')" :value="SizeEnum.SMALL" />
              </el-select>
            </el-form-item>
            <el-form-item :label="t('base.avatar.darkMode')">
              <el-select v-model="baseStore.darkMode" important-w-full @change="changeDarkMode">
                <el-option :label="t('base.avatar.auto')" :value="DarkModeEnum.DARK_MODE_AUTO" />
                <el-option :label="t('base.avatar.open')" :value="DarkModeEnum.DARK_MODE_DARK" />
                <el-option :label="t('base.avatar.close')" :value="DarkModeEnum.DARK_MODE_LIGHT" />
              </el-select>
            </el-form-item>
            <el-form-item :label="t('base.avatar.theme')">
              <div w-full flex flex-wrap items-center justify-start>
                <div
                  v-for="(value, key) in ThemeEnum" :key="key" :class="baseStore.theme === value ? 'active ' : ''" w-6
                  h-6 mb-4 mr-2 cursor-pointer rd-1 :style="{ backgroundColor: value }"
                  @click="setEpThemeColor(value, baseStore.darkMode === DarkModeEnum.DARK_MODE_DARK), baseStore.theme = value"
                />
              </div>
            </el-form-item>
          </el-collapse-item>
        </el-scrollbar>
      </el-collapse>
      <div p-t="20px">
        <el-button type="primary">
          <el-icon>
            <Check />
          </el-icon>
          <span>{{ t('base.btn.save') }}</span>
        </el-button>
        <el-button type="danger" @click="userStore.logout()">
          <el-icon>
            <SwitchButton />
          </el-icon>
          <span>{{ t('base.btn.logout') }}</span>
        </el-button>
      </div>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.active {
  position: relative;

  &::after {
    content: "";
    width: 0.36rem;
    height: 0.36rem;
    background-color: var(--el-color-primary);
    position: absolute;
    left: 50%;
    bottom: -0.7rem;
    transform: translateX(-50%);
    border-radius: 50%;
  }
}

:deep(.el-collapse),
:deep(.el-collapse-item__header),
:deep(.el-collapse-item__wrap) {
  border: none;
}
</style>
