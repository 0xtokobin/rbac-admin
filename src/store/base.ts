import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { getStorage } from '@/utils/cache'
import { DarkModeEnum, LanguageEnum, LayoutEnum, SizeEnum, ThemeEnum } from '@/enums/base'
import { CacheKeyEnum } from '@/enums/cache'
import { GET } from '@/utils/request'
import { setEpThemeColor } from '@/utils/base'
import {
  autoImportViewComponents,
  registerRouter,
  routerInject,
} from '@/router/helper'
import { router } from '@/router'
import type { ViewComponents } from '#/global'

export const useBaseStore = defineStore('base', () => {
  const collapse = ref<boolean>(false)

  const browserTitle = ref<string>('')

  const keepAliveNames = ref<Array<string>>([])

  const keepAliveAddName = (name: string) => {
    !keepAliveNames.value.includes(name) && keepAliveNames.value.push(name)
  }

  const keepAliveRemoveName = (name: string) => {
    keepAliveNames.value = keepAliveNames.value.filter(item => item !== name)
  }

  const isMobile = ref<boolean>(false)

  const mobileMenu = ref<boolean>(false)

  const changeMobileLayout = () => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    )
      isMobile.value = true

    else
      isMobile.value = document.documentElement.clientWidth < 778

    if (!isMobile.value) {
      collapse.value = false
      if (mobileMenu.value)
        mobileMenu.value = false
    }
  }

  const menuRoutes = ref<Array<any>>([])

  const setMenuRoutes = (data: Array<RouteRecordRaw>): void => {
    menuRoutes.value = data
    registerRouter(data, router)
  }

  const getMenuRoutes = async (): Promise<Array<RouteRecordRaw>> => {
    const { data } = await GET('/system/menu/list')
    const viewComponents: ViewComponents = autoImportViewComponents(
      import.meta.glob('@/views/**/*.vue'),
    )
    const menu: Array<RouteRecordRaw> = routerInject(data, viewComponents)
    setMenuRoutes(menu)
    return menu
  }

  const language = ref<string>(getStorage(CacheKeyEnum.PROFILE)?.language || getStorage(CacheKeyEnum.LANGUAGE) || LanguageEnum.ZH_CN_ALIAS)

  const theme = ref<string>(getStorage(CacheKeyEnum.PROFILE)?.theme || ThemeEnum.BLUE)

  const layout = ref<string>(getStorage(CacheKeyEnum.PROFILE)?.layout || LayoutEnum.LAYOUT_MIX)

  const size = ref<string>(getStorage(CacheKeyEnum.PROFILE)?.size || SizeEnum.DEFAULT)

  const tab = ref<boolean>(getStorage(CacheKeyEnum.PROFILE)?.tab || true)

  const breadcrumb = ref<boolean>(getStorage(CacheKeyEnum.PROFILE)?.breadcrumb || true)

  const darkMode = ref<string>(getStorage(CacheKeyEnum.PROFILE)?.darkMode || DarkModeEnum.DARK_MODE_AUTO)

  const isDarkMode = ref<boolean>(darkMode.value === DarkModeEnum.DARK_MODE_AUTO ? window.matchMedia('(prefers-color-scheme: dark)').matches : darkMode.value === DarkModeEnum.DARK_MODE_DARK)

  const openDarkMode = (isDark: boolean) => {
    if (darkMode.value === DarkModeEnum.DARK_MODE_AUTO) {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (event) => {
          openDarkMode(event.matches)
        })
    }
    document.documentElement.classList.remove(darkMode.value)
    if (isDark) {
      document.documentElement.classList.add(
        DarkModeEnum.DARK_MODE_DARK,
      )
      isDarkMode.value = true
    }
    else {
      document.documentElement.classList.add(
        DarkModeEnum.DARK_MODE_LIGHT,
      )
      isDarkMode.value = false
    }
    setEpThemeColor(theme.value, isDarkMode.value)
  }

  return {
    collapse,
    browserTitle,
    keepAliveNames,
    keepAliveAddName,
    keepAliveRemoveName,
    isMobile,
    mobileMenu,
    changeMobileLayout,
    menuRoutes,
    setMenuRoutes,
    getMenuRoutes,
    language,
    theme,
    layout,
    size,
    tab,
    breadcrumb,
    darkMode,
    isDarkMode,
    openDarkMode,
  }
})
