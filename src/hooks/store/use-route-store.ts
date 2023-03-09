import { defineStore } from 'pinia'
import type { Routes, ViewComponents } from '#/global'
import {
  mergeAsyncRoutes,
  mergeMenuRoutes,
  registerRouter,
  routerInject,
} from '@/utils/router'
import { autoImportViewComponents } from '@/utils/auto'
import { router, routes } from '@/plugins/vue-router'
import { _t } from '@/i18n'
import { GET } from '@/utils/request'

export const useRouteStore = defineStore('route', () => {
  // 异步路由
  const asyncRoutes = ref<Routes>([])

  // 菜单路由
  const menuRoutes = ref<Routes>([])

  // 缓存异步路由
  const setAsyncRoutes = (data: Routes): void => {
    asyncRoutes.value = data
    registerRouter(data, router)
  }

  // 缓存菜单路由
  const setMenuRoutes = (data: Routes): void => {
    menuRoutes.value = data
    registerRouter(data, router)
  }

  // 获取异步路由
  const getAsyncRoutes = async (): Promise<Routes> => {
    const { data } = await GET('/system/user/route')
    const viewComponents: ViewComponents = autoImportViewComponents(
      import.meta.glob('/src/views/**/*.vue'),
    )
    const asyncRoutes: Routes = await mergeAsyncRoutes(
      routerInject(data, _t),
      viewComponents,
    )
    setAsyncRoutes(asyncRoutes)
    const menuRoutes: Routes = await mergeMenuRoutes(
      routerInject(routes, _t),
      asyncRoutes,
    )
    setMenuRoutes(menuRoutes)
    return asyncRoutes
  }

  return {
    menuRoutes,
    asyncRoutes,
    setMenuRoutes,
    setAsyncRoutes,
    getAsyncRoutes,
  }
})
