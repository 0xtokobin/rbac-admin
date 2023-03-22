import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { getStorage } from '@libs/common/utils/cache'
import { CacheKeyEnum, DarkModeEnum, LanguageEnum, LayoutEnum, SizeEnum, ThemeEnum } from '@libs/common/enums/base'
import { GET } from '@libs/common/utils/request.axios'
import { setEpThemeColor } from '@libs/common/utils/base'
import type { ViewComponents } from '#/global'
import {
  autoImportViewComponents,
  registerRouter,
  routerInject,
} from '@/router/helper'
import { router } from '@/router'

/**
 * @name useBaseStore
 * @description 基础状态钩子函数
 * @returns
 */
export const useBaseStore = defineStore('base', () => {
  // 当前菜单展开/折叠状态
  const collapse = ref<boolean>(false)

  // 当前浏览器标题
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

  // 是否移动端
  const isMobile = ref<boolean>(false)

  // 移动端菜单展开状态
  const mobileMenu = ref<boolean>(false)

  // 切换移动端布局方案
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

  // 菜单路由
  const menuRoutes = ref<Array<any>>([])

  // 缓存菜单路由
  const setMenuRoutes = (data: Array<RouteRecordRaw>): void => {
    menuRoutes.value = data
    registerRouter(data, router)
  }

  // 获取菜单路由，并且进行菜单组装
  const getMenuRoutes = async (): Promise<Array<RouteRecordRaw>> => {
    const { data } = await GET('/system/menu/list')
    const viewComponents: ViewComponents = autoImportViewComponents(
      import.meta.glob('@/views/**/*.vue'),
    )
    const menu: Array<RouteRecordRaw> = routerInject(data, viewComponents)
    setMenuRoutes(menu)
    return menu
  }

  // 当前语言环境
  const language = ref<string>(getStorage(CacheKeyEnum.PROFILE)?.language || getStorage(CacheKeyEnum.LANGUAGE) || LanguageEnum.ZH_CN_ALIAS)

  // 当前主题颜色
  const theme = ref<string>(getStorage(CacheKeyEnum.PROFILE)?.theme || ThemeEnum.BLUE)

  // 当前布局
  const layout = ref<string>(getStorage(CacheKeyEnum.PROFILE)?.layout || LayoutEnum.LAYOUT_MIX)

  // 当前组件大小
  const size = ref<string>(getStorage(CacheKeyEnum.PROFILE)?.size || SizeEnum.DEFAULT)

  // 是否显示标签栏
  const tab = ref<boolean>(getStorage(CacheKeyEnum.PROFILE)?.tab || true)

  // 是否显示面包屑
  const breadcrumb = ref<boolean>(getStorage(CacheKeyEnum.PROFILE)?.breadcrumb || true)

  // 当前黑暗模式
  const darkMode = ref<string>(getStorage(CacheKeyEnum.PROFILE)?.darkMode || DarkModeEnum.DARK_MODE_AUTO)

  // 当前黑暗模式开启状态
  const isDarkMode = ref<boolean>(darkMode.value === DarkModeEnum.DARK_MODE_AUTO ? window.matchMedia('(prefers-color-scheme: dark)').matches : darkMode.value === DarkModeEnum.DARK_MODE_DARK)

  // 切换黑暗模式开启状态
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
