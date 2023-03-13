<script lang="ts" setup>
import { UserFilled } from '@element-plus/icons-vue'
import { useUserStore } from '@/hooks/use-user-store'
import { LayoutEnum, SizeEnum, ThemeEnum } from '@/enum'

const { t, locale, messages } = useI18n()

const userStore = useUserStore()

const changeLanguage = (
  value: string | number | Record<string, any> | undefined,
) => {
  locale.value = value as string
}

const personalDrawerVisible = ref<boolean>(false)

const openPersonalDrawer = () => {
  personalDrawerVisible.value = true
}
</script>

<template>
  <el-avatar :size="32" cursor-pointer :src="userStore.profile.avatar" :icon="UserFilled" @click="openPersonalDrawer" />
  <el-drawer v-model="personalDrawerVisible" :title="t('app.personal')" :size="300">
    <div p-2 flex items-center>
      <el-avatar mr-6 :size="82" :src="userStore.profile.avatar" :icon="UserFilled" />
      <div>
        <div text-6 mb-4>
          名字
        </div>
        <div text-4>
          描述信息...
        </div>
      </div>
    </div>
    <el-form p-2 label-position="top">
      <el-form-item :label="t('app.language')">
        <el-select :model-value="locale" important-w-full @change="changeLanguage">
          <el-option v-for="(value, key) in messages" :key="key" :label="value.name" :value="key" />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('app.layout')">
        <el-select v-model="userStore.profile.layout" important-w-full @change="changeLanguage">
          <el-option :label="t('app.layoutMix')" :value="LayoutEnum.LAYOUT_MIX" />
          <el-option :label="t('app.layoutTop')" :value="LayoutEnum.LAYOUT_TOP" />
          <el-option :label="t('app.layoutSide')" :value="LayoutEnum.LAYOUT_SIDE" />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('app.theme')">
        <div w-full flex flex-wrap items-center justify-between>
          <div
            v-for="(key, value) in ThemeEnum" :key="key" :class="userStore.profile.theme === key ? 'active ' : ''" w-6
            h-6 cursor-pointer rd-1 :style="{ backgroundColor: value }"
          />
        </div>
      </el-form-item>
      <el-form-item :label="t('app.size')">
        <el-select v-model="userStore.profile.size" important-w-full>
          <el-option :label="t('system.setting.componentLarge')" :value="SizeEnum.LARGE" />
          <el-option :label="t('system.setting.componentDefault')" :value="SizeEnum.DEFAULT" />
          <el-option :label="t('system.setting.componentSmall')" :value="SizeEnum.SMALL" />
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
    width: 0.5rem;
    height: 0.5rem;
    background-color: #42b983;
    position: absolute;
    left: 50%;
    bottom: -1rem;
    transform: translateX(-50%);
    border-radius: 50%;
  }
}
</style>
