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
</script>

<template>
  <el-avatar :size="32" cursor-pointer :src="userStore.profile.avatar" :icon="UserFilled" @click="openPersonalDrawer" />
  <el-drawer v-model="personalDrawerVisible" :title="t('app.personal')" :size="300">
    <template #header="{ titleId, titleClass }">
      <div :id="titleId" h-full flex items-center :class="titleClass">
        <el-avatar mr-3 :src="userStore.profile.avatar" :icon="UserFilled" />
        <div text="4.6">
          {{ userStore.profile.nickname }}
        </div>
      </div>
    </template>
    <el-form label-position="top">
      <el-form-item :label="t('app.language')">
        <el-select v-model="locale" important-w-full>
          <el-option v-for="(value, key) in messages" :key="key" :label="value.name" :value="key" />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('app.layout')">
        <el-select v-model="baseStore.layout" important-w-full>
          <el-option :label="t('app.layoutMix')" :value="LayoutEnum.LAYOUT_MIX" />
          <el-option :label="t('app.layoutTop')" :value="LayoutEnum.LAYOUT_TOP" />
          <el-option :label="t('app.layoutSide')" :value="LayoutEnum.LAYOUT_SIDE" />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('app.theme')">
        <div w-full flex flex-wrap items-center justify-between>
          <div
            v-for="(value, key) in ThemeEnum" :key="key" :class="baseStore.theme === value ? 'active ' : ''" w-6 h-6
            mb-4 cursor-pointer rd-1 :style="{ backgroundColor: value }"
            @click="setEpThemeColor(value, baseStore.darkMode === DarkModeEnum.DARK_MODE_DARK), baseStore.theme = value"
          />
        </div>
      </el-form-item>
      <el-form-item :label="t('app.size')">
        <el-select v-model="baseStore.size" important-w-full>
          <el-option :label="t('app.sizeLarge')" :value="SizeEnum.LARGE" />
          <el-option :label="t('app.sizeDefault')" :value="SizeEnum.DEFAULT" />
          <el-option :label="t('app.sizeSmall')" :value="SizeEnum.SMALL" />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('app.action')">
        <el-button type="primary">
          <el-icon>
            <Check />
          </el-icon>
          <span>{{ t('app.save') }}</span>
        </el-button>
        <el-button type="danger" @click="userStore.logout()">
          <el-icon>
            <SwitchButton />
          </el-icon>
          <span>{{ t('app.logout') }}</span>
        </el-button>
      </el-form-item>
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
</style>
