import { defineStore } from 'pinia'
import type { IObject, SystemSettings } from '#/global.d'
import { SettingsValueEnum, StorageEnum } from '@/constants/enums'
import { getStorage, setStorage } from '@/utils/storage'
import { Settings } from '@/constants/settings'

export const useSystemStore = defineStore('system', () => {
  const loading = ref<boolean>(false)

  const collapse = ref<boolean>(false)

  const settings = ref<SystemSettings>(
    getStorage(StorageEnum.SETTINGS) || Settings,
  )

  const updateSettings = (data: SystemSettings): void => {
    settings.value = data
    setStorage(StorageEnum.SETTINGS, data)
  }

  const colorScheme = ref<string>(settings.value.ColorScheme)

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

  const browserTitle = ref<string>('')

  const keepAliveNames = ref<Array<string>>([])

  const keepAliveAddName = (name: string) => {
    !keepAliveNames.value.includes(name) && keepAliveNames.value.push(name)
  }

  const keepAliveRemoveName = (name: string) => {
    keepAliveNames.value = keepAliveNames.value.filter(item => item !== name)
  }

  const language = ref<string>(
    getStorage(StorageEnum.LANGUAGE) || Settings.Language,
  )

  const changeLanguage = (data: IObject): void => {
    language.value = data.alias
    setStorage(StorageEnum.LANGUAGE, data.alias)
  }

  const isMobile = ref<boolean>(false)

  const mobileMenu = ref<boolean>(false)

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
