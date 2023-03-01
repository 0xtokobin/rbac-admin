import { defineStore } from 'pinia'
import type { Routes } from '@/plugins/vue-router/index.d'
import type { ViewComponents } from '#/global.d'
import {
  mergeAsyncRoutes,
  mergeMenuRoutes,
  registerRouter,
  routerInject,
} from '@/utils/router'
import { autoImportViewComponents } from '@/utils/auto'
import { router, routes } from '@/plugins/vue-router'
import { _t } from '@/plugins/vue-i18n'
import { getRouteAsync } from '@/apis/system/user'

export const useRouteStore = defineStore('route', () => {
  const asyncRoutes = ref<Routes>([])

  const menuRoutes = ref<Routes>([])

  const setAsyncRoutes = (data: Routes): void => {
    asyncRoutes.value = data
    registerRouter(data, router)
  }

  const setMenuRoutes = (data: Routes): void => {
    menuRoutes.value = data
    registerRouter(data, router)
  }

  const getAsyncRoutes = async (): Promise<Routes> => {
    const { code, data } = await getRouteAsync()
    if (code === 0) {
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
    else {
      return []
    }
  }

  return {
    menuRoutes,
    asyncRoutes,
    setMenuRoutes,
    setAsyncRoutes,
    getAsyncRoutes,
  }
})
