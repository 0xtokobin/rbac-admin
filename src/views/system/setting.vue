<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import SettingColorScheme from './components/setting-color-scheme.vue'
import SettingThemeColor from './components/setting-theme-color.vue'
import SettingLayout from './components/setting-layout.vue'
import {
  SystemSettingsColorScheme,
  SystemSettingsLayout,
} from '#/global'
import { useLanguage } from '@/hooks/language/use-language'
import { useSystemStore } from '@/hooks/store/use-system-store'
import {
  PredefineBreadcrumbPosition,
  PredefineColorSchemes,
  PredefineCopyrightPosition,
  PredefineLayouts,
  PredefineMenuStyle,
  PredefineTabStyle,
  PredefineToolbar,
  SettingsDefault,
} from '@/constants/settings'

const { t } = useI18n()

const systemStore = useSystemStore()

const changeLayout = (val: SystemSettingsLayout) => {
  systemStore.settings.Layout = val
}

const changeColorScheme = (val: SystemSettingsColorScheme): void => {
  systemStore.settings.ColorScheme = val
}

const changeThemeColor = (val: string): void => {
  systemStore.settings.ThemeColor = val
}

const toolbarChange = (key: string): void => {
  systemStore.settings.Toolbar[key] = !systemStore.settings.Toolbar[key]
}

const { languages } = useLanguage()

const updateSettings = () => {
  systemStore.updateSettings(systemStore.settings)
  ElMessage.success(t('system.setting.updateSuccess'))
}

const { copy } = useClipboard({
  source: JSON.stringify(systemStore.settings),
})

const copySettings = () => {
  copy()
  ElMessage.success(t('system.setting.copySuccess'))
}

const backSettings = () => {
  systemStore.updateSettings(SettingsDefault)
  ElMessage.success(t('system.setting.backSuccess'))
}
</script>

<template>
  <crud-card action>
    <div text-4 m-b-4>
      {{ t('system.setting.layout') }}
    </div>
    <div flex items-center flex-wrap m-b-2>
      <div v-for="(item, index) in PredefineLayouts" :key="index">
        <el-tooltip :show-after="300" effect="dark" :content="t(item.label)" placement="top">
          <SettingLayout
            :mode="item.value" :name="item.label" :active="systemStore.settings.Layout === item.value"
            @click="changeLayout(item.value as SystemSettingsLayout)"
          />
        </el-tooltip>
      </div>
    </div>
    <div text-4 m-b-4>
      {{ t('system.setting.colorScheme') }}
    </div>
    <div flex items-center flex-wrap m-b-2>
      <div v-for="(item, index) in PredefineColorSchemes" :key="index">
        <el-tooltip :show-after="300" effect="dark" :content="t(item.label)" placement="top">
          <SettingColorScheme
            :mode="item.value" :name="item.label"
            :active="systemStore.settings.ColorScheme === item.value"
            @click="changeColorScheme(item.value as SystemSettingsColorScheme)"
          />
        </el-tooltip>
      </div>
    </div>
    <div text-4 m-b-4>
      {{ t('system.setting.themeColor') }}
    </div>
    <div flex items-center flex-wrap m-b-6>
      <SettingThemeColor @change="changeThemeColor" />
    </div>
    <div text-4 m-b-4>
      {{ t('system.setting.toolbar') }}
    </div>
    <div flex items-center flex-wrap m-b-6>
      <el-check-tag
        v-for="(item, index) in PredefineToolbar" :key="index" mr-6 mb-2
        :checked="systemStore.settings.Toolbar[item.value]" @change="toolbarChange(item.value)"
      >
        {{ t(item.label) }}
      </el-check-tag>
    </div>
    <div text-4 m-b-4>
      {{ t('system.setting.component') }}
    </div>
    <el-form :style="{ width: '100%' }" label-width="160px" label-position="left" m-b-6>
      <el-form-item :label="t('system.setting.componentSize')">
        <el-select v-model="systemStore.settings.ElementPlus.size" style="width: 260px">
          <el-option :label="t('system.setting.componentLarge')" value="large" />
          <el-option :label="t('system.setting.componentDefault')" value="default" />
          <el-option :label="t('system.setting.componentSmall')" value="small" />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('system.setting.menuStyle')">
        <el-select v-model="systemStore.settings.MenuStyle" style="width: 260px">
          <el-option
            v-for="(item, index) in PredefineMenuStyle" :key="index" :label="t(item.label)"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('system.setting.uniqueOpened')">
        <el-switch v-model="systemStore.settings.UniqueOpened" />
      </el-form-item>
      <el-form-item :label="t('system.setting.tab')">
        <el-switch v-model="systemStore.settings.Tab" />
      </el-form-item>
      <el-form-item :label="t('system.setting.tabStyle')">
        <el-select v-model="systemStore.settings.TabStyle" style="width: 260px">
          <el-option v-for="(item, index) in PredefineTabStyle" :key="index" :label="t(item.label)" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('system.setting.breadcrumb')">
        <el-select v-model="systemStore.settings.Breadcrumb" style="width: 260px">
          <el-option
            v-for="(item, index) in PredefineBreadcrumbPosition" :key="index" :label="t(item.label)"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('system.setting.copyright')">
        <el-select v-model="systemStore.settings.Copyright" style="width: 260px">
          <el-option
            v-for="(item, index) in PredefineCopyrightPosition" :key="index" :label="t(item.label)"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div :style="systemStore.isMobile ? 'width: 100%' : 'width: 420px'" mb-4>
      <el-alert
        show-icon :closable="false" :title="t('system.setting.other')"
        :description="t('system.setting.otherDescription')" type="warning"
      />
    </div>
    <el-form :style="{ width: '100%' }" label-width="160px" label-position="left" m-b-6>
      <el-form-item :label="t('system.setting.language')">
        <el-select v-model="systemStore.settings.Language" style="width: 260px">
          <el-option v-for="(value, key) in languages" :key="key" :label="value.name as string" :value="key" />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('system.setting.firstRoute')">
        <el-input v-model="systemStore.settings.FirstRoute" style="width: 260px" />
      </el-form-item>
      <el-form-item :label="t('system.setting.adminFirstRoute')">
        <el-input v-model="systemStore.settings.AdminFirstRoute" style="width: 260px" />
      </el-form-item>
      <el-form-item :label="t('system.setting.requestTimeout')">
        <el-input-number v-model="systemStore.settings.NetworkTimeout" :step="1" :min="1000" style="width: 132px" />
        <span style="width: 100px; margin-left: 20px">
          {{ t('system.setting.requestTimeoutUnit') }}
        </span>
      </el-form-item>
    </el-form>
    <template #action>
      <el-button type="primary" @click="updateSettings">
        {{ t('crud.btn.update') }}
      </el-button>
      <el-button @click="copySettings">
        {{ t('system.setting.copy') }}
      </el-button>
      <el-button @click="backSettings">
        {{ t('system.setting.back') }}
      </el-button>
    </template>
  </crud-card>
</template>
