<script lang="ts" setup>
import { UserFilled } from '@element-plus/icons-vue'
import { useUserStore } from '@/hooks/stores/use-user-store'
import { DarkModeEnum, LayoutEnum, SizeEnum, ThemeEnum } from '@/enum'
import { useBaseStore } from '@/hooks/stores/use-base-store'
import { setEpThemeColor } from '@/utils/common'

const { t, locale, messages } = useI18n()

const userStore = useUserStore()

const baseStore = useBaseStore()

const personalDrawerVisible = ref<boolean>(false)

const openPersonalDrawer = () => {
  personalDrawerVisible.value = true
}

const active = ref(['general', 'personal', 'ui'])
</script>

<template>
  <el-avatar :size="32" cursor-pointer :src="userStore.profile.avatar" :icon="UserFilled" @click="openPersonalDrawer" />
  <el-drawer v-model="personalDrawerVisible" :size="300">
    <template #header="{ titleId, titleClass }">
      <div :id="titleId" h-full flex items-center :class="titleClass">
        <el-avatar mr-3 :src="userStore.profile.avatar" :icon="UserFilled" />
        <div text="4.6">
          {{ userStore.profile.nickname }}
        </div>
      </div>
    </template>
    <el-form label-position="left" label-width="100px" h-full flex flex-col items-stretch>
      <el-collapse v-model="active" flex-auto overflow-auto>
        <el-scrollbar>
          <el-collapse-item :title="t('app.avatar.generalSettings')" name="general">
            <el-form-item :label="t('app.avatar.language')">
              <el-select v-model="locale" important-w-full>
                <el-option v-for="(value, key) in messages" :key="key" :label="value.name" :value="key" />
              </el-select>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item :title="t('app.avatar.personalSettings')" name="personal">
            <el-form-item :label="t('app.avatar.username')">
              <el-input v-model="userStore.profile.username" disabled />
            </el-form-item>
            <el-form-item :label="t('app.avatar.nickname')">
              <el-input v-model="userStore.profile.nickname" />
            </el-form-item>
            <el-form-item :label="t('app.avatar.mobile')">
              <span mr-2 style="color:var(--el-text-color-secondary);">
                {{ userStore.profile.mobile || t('app.avatar.empty') }}
              </span>
              <el-button v-if="!userStore.profile.mobile" type="primary" link>
                {{ t('app.avatar.bind') }}
              </el-button>
              <el-button v-else type="primary" link>
                {{ t('app.avatar.change') }}
              </el-button>
            </el-form-item>
            <el-form-item :label="t('app.avatar.dept')">
              <span mr-2 style="color:var(--el-text-color-secondary);">
                {{ userStore.profile.deptName || t('app.avatar.empty') }}
              </span>
            </el-form-item>
            <el-form-item :label="t('app.avatar.role')">
              <span mr-2 style="color:var(--el-text-color-secondary);">
                {{ userStore.profile.roleName || t('app.avatar.empty') }}
              </span>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item :title="t('app.avatar.uiSettings')" name="ui">
            <el-form-item :label="t('app.avatar.tab')">
              <el-switch v-model="baseStore.tab" />
            </el-form-item>
            <el-form-item :label="t('app.avatar.breadcrumb')">
              <el-switch v-model="baseStore.breadcrumb" />
            </el-form-item>
            <el-form-item :label="t('app.avatar.layout')">
              <el-select v-model="baseStore.layout" important-w-full>
                <el-option :label="t('app.avatar.layoutMix')" :value="LayoutEnum.LAYOUT_MIX" />
                <el-option :label="t('app.avatar.layoutTop')" :value="LayoutEnum.LAYOUT_TOP" />
                <el-option :label="t('app.avatar.layoutSide')" :value="LayoutEnum.LAYOUT_SIDE" />
              </el-select>
            </el-form-item>
            <el-form-item :label="t('app.avatar.size')">
              <el-select v-model="baseStore.size" important-w-full>
                <el-option :label="t('app.avatar.sizeLarge')" :value="SizeEnum.LARGE" />
                <el-option :label="t('app.avatar.sizeDefault')" :value="SizeEnum.DEFAULT" />
                <el-option :label="t('app.avatar.sizeSmall')" :value="SizeEnum.SMALL" />
              </el-select>
            </el-form-item>
            <el-form-item :label="t('app.avatar.darkMode')">
              <el-select v-model="baseStore.darkMode" important-w-full>
                <el-option :label="t('app.avatar.auto')" :value="DarkModeEnum.DARK_MODE_AUTO" />
                <el-option :label="t('app.avatar.open')" :value="DarkModeEnum.DARK_MODE_DARK" />
                <el-option :label="t('app.avatar.close')" :value="DarkModeEnum.DARK_MODE_LIGHT" />
              </el-select>
            </el-form-item>
            <el-form-item :label="t('app.avatar.theme')">
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
          <span>{{ t('app.btn.saveUpdate') }}</span>
        </el-button>
        <el-button type="danger" @click="userStore.logout()">
          <el-icon>
            <SwitchButton />
          </el-icon>
          <span>{{ t('app.avatar.logout') }}</span>
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
