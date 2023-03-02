import { defineStore } from 'pinia'
import type { IObject, SystemSettings } from '#/global'
import { SettingsValueEnum, StorageEnum } from '@/constants/enums'
import { getStorage, setStorage } from '@/utils/storage'
import { Settings } from '@/constants/settings'

export const useSystemStore = defineStore('system', () => {
  // 全局 loading 状态
  const loading = ref<boolean>(false)

  // 系统菜单展开 / 折叠
  const collapse = ref<boolean>(false)

  // 系统配置
  const settings = ref<SystemSettings>(
    getStorage(StorageEnum.SETTINGS) || Settings,
  )

  // 缓存系统配置
  const updateSettings = (data: SystemSettings): void => {
    settings.value = data
    setStorage(StorageEnum.SETTINGS, data)
  }

  // 配色方案
  const colorScheme = ref<string>(settings.value.ColorScheme)

  // 切换黑暗模式 / 明亮模式
  const changeDarkOrLight = (value: boolean) => {
    document.documentElement.classList.remove(colorScheme.value)
    if (value) {
      document.documentElement.classList.add(
        SettingsValueEnum.COLOR_SCHEME_DARK,
      )
      colorScheme.value = SettingsValueEnum.COLOR_SCHEME_DARK
    }
    else {
      document.documentElement.classList.add(
        SettingsValueEnum.COLOR_SCHEME_LIGHT,
      )
      colorScheme.value = SettingsValueEnum.COLOR_SCHEME_LIGHT
    }
  }

  // 浏览器标题
  const browserTitle = ref<string>('')

  // Keep Alive 列表
  const keepAliveNames = ref<Array<string>>([])

  // 添加到 Keep Alive
  const keepAliveAddName = (name: string) => {
    !keepAliveNames.value.includes(name) && keepAliveNames.value.push(name)
  }

  // 从 Keep Alive 中移除
  const keepAliveRemoveName = (name: string) => {
    keepAliveNames.value = keepAliveNames.value.filter(item => item !== name)
  }

  // 当前语言环境
  const language = ref<string>(
    getStorage(StorageEnum.LANGUAGE) || Settings.Language,
  )

  // 切换当前语言环境
  const changeLanguage = (data: IObject): void => {
    language.value = data.alias
    setStorage(StorageEnum.LANGUAGE, data.alias)
  }

  // 是否移动端
  const isMobile = ref<boolean>(false)

  // 移动端菜单展开状态
  const mobileMenu = ref<boolean>(false)

  // 切换移动端布局方案
  const changeMobile = () => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    )
      isMobile.value = true

    else
      isMobile.value = document.documentElement.clientWidth < 992

    if (!isMobile.value) {
      collapse.value = false
      if (mobileMenu.value)
        mobileMenu.value = false
    }
  }

  return {
    loading,
    collapse,
    settings,
    updateSettings,
    colorScheme,
    changeDarkOrLight,
    browserTitle,
    keepAliveNames,
    keepAliveAddName,
    keepAliveRemoveName,
    language,
    changeLanguage,
    isMobile,
    mobileMenu,
    changeMobile,
  }
})
