import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import type { ViewComponents } from '#/global'
import { DarkModeEnum, LanguageEnum, LayoutEnum, SizeEnum, StorageKeyEnum, ThemeEnum } from '@/enum'
import {
  autoImportViewComponents,
  registerRouter,
  routerInject,
} from '@/router/helper'
import { router } from '@/router'
import { GET } from '@/utils/request'
import { getStorage } from '@/utils/storage'

/**
 * @name useBaseStore
 * @description 基础状态钩子函数
 * @returns
 */
export const useBaseStore = defineStore('base', () => {
  // 当前菜单展开/折叠状态
  const collapse = ref<boolean>(false)

  // 当前黑暗模式
  const darkMode = ref<string>(getStorage(StorageKeyEnum.PROFILE)?.darkMode || DarkModeEnum.DARK_MODE_AUTO)

  // 切换黑暗模式
  const changeDarkMode = (value: boolean) => {
    document.documentElement.classList.remove(darkMode.value)
    if (value) {
      document.documentElement.classList.add(
        DarkModeEnum.DARK_MODE_DARK,
      )
      darkMode.value = DarkModeEnum.DARK_MODE_DARK
    }
    else {
      document.documentElement.classList.add(
        DarkModeEnum.DARK_MODE_LIGHT,
      )
      darkMode.value = DarkModeEnum.DARK_MODE_LIGHT
    }
  }

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
  const changeMobile = () => {
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
  const language = ref<string>(getStorage(StorageKeyEnum.PROFILE)?.language || getStorage(StorageKeyEnum.LANGUAGE) || LanguageEnum.ZH_CN_ALIAS)

  // 当前主题颜色
  const theme = ref<string>(getStorage(StorageKeyEnum.PROFILE)?.theme || ThemeEnum.BLUE)

  // 当前布局
  const layout = ref<string>(getStorage(StorageKeyEnum.PROFILE)?.layout || LayoutEnum.LAYOUT_MIX)

  // 当前组件大小
  const size = ref<string>(getStorage(StorageKeyEnum.PROFILE)?.size || SizeEnum.DEFAULT)

  return {
    collapse,
    darkMode,
    changeDarkMode,
    browserTitle,
    keepAliveNames,
    keepAliveAddName,
    keepAliveRemoveName,
    isMobile,
    mobileMenu,
    changeMobile,
    menuRoutes,
    setMenuRoutes,
    getMenuRoutes,
    language,
    theme,
    layout,
    size,
  }
})
