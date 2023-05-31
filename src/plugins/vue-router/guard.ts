import type {
  NavigationGuardNext,
  RouteLocationNormalized,
  Router,
} from 'vue-router'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import { getStorage } from '@/utils/storage'
import { useBaseStore } from '@/hooks/use-store'
import { useUserStore } from '@/hooks/use-store'
import { AdminRouteEnum, StorageKeyEnum } from '@/constants/enums'

import { getLoginStorageType } from '@/utils/base'
import '@/assets/style/nprogress.scss'

const { isLoading } = useNProgress()

export function addRouterGuard(router: Router): Router {
  router.beforeEach(
    async (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext,
    ) => {
      isLoading.value = true

      const userRoles: Array<string> = getStorage(StorageKeyEnum.ROLES, {
        type: getLoginStorageType(),
      })
      const requiresAuth: boolean = to.matched.some(
        (item: any) => item.meta.requiresAuth,
      )

      const baseStore = useBaseStore()
      const userStore = useUserStore()

      if (requiresAuth && !userStore.isLogin) {
        next({
          path: AdminRouteEnum.ROUTE_LOGIN,
        })
        return
      }

      if (
        userStore.isLogin
        && to.path === AdminRouteEnum.ROUTE_LOGIN
      ) {
        next({
          path: AdminRouteEnum.ROUTE_FIRST,
        })
        return
      }

      if (userStore.isLogin && baseStore.menuRoutes.length === 0) {
        await userStore.getProfile()
        await userStore.getRoles()
        await baseStore.getMenuRoutes()
        if (to.redirectedFrom)
          next({ path: to.redirectedFrom.fullPath, replace: true })
        else
          next({ ...to, replace: true })

        return
      }

      if (userStore.isLogin && requiresAuth && !userRoles.includes(to.path)) {
        next({
          path: AdminRouteEnum.ROUTE_ERROR,
          params: { type: '403' },
        })
        return
      }

      next()
    },
  )

  router.afterEach(
    (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      isLoading.value = false

      const baseStore = useBaseStore()
      const toName
        = to.matched[to.matched.length - 1]?.components?.default.name
      const fromName
        = from.matched[to.matched.length - 1]?.components?.default.name

      if (to.meta.keepAlive && toName)
        baseStore.keepAliveAddName(toName)

      if (
        !from.meta.keepAlive
        && fromName
        && baseStore.keepAliveNames.includes(fromName)
      )
        baseStore.keepAliveRemoveName(fromName)
    },
  )

  return router
}
