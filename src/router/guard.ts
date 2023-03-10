import type {
  NavigationGuardNext,
  RouteLocationNormalized,
  Router,
} from 'vue-router'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import { RouteEnum, StorageKeyEnum } from '@/enum'
import { useSystemStore } from '@/hooks/use-system-store'
import { useUserStore } from '@/hooks/use-user-store'
import { getStorage } from '@/utils/storage'
import { getLoginStorageType } from '@/utils/common'
import '@/assets/style/nprogress.scss'

const { isLoading } = useNProgress()

/**
 * @name addRouterGuard
 * @description 路由注入拦截器
 * @returns
 */
export const addRouterGuard = (router: Router): Router => {
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

      const systemStore = useSystemStore()
      const userStore = useUserStore()

      if (requiresAuth && !userStore.isLogin) {
        next({
          path: RouteEnum.ROUTE_LOGIN,
        })
        return
      }

      if (
        userStore.isLogin
        && to.path === RouteEnum.ROUTE_LOGIN
      ) {
        next({
          path: RouteEnum.ROUTE_FIRST,
        })
        return
      }

      if (userStore.isLogin && systemStore.menuRoutes.length === 0) {
        await userStore.getProfile()
        await userStore.getRoles()
        await systemStore.getMenuRoutes()
        if (to.redirectedFrom)
          next({ path: to.redirectedFrom.fullPath, replace: true })
        else
          next({ ...to, replace: true })

        return
      }

      if (userStore.isLogin && requiresAuth && !userRoles.includes(to.path)) {
        next({
          path: RouteEnum.ROUTE_NO_PERMISSION,
        })
        return
      }

      next()
    },
  )

  router.afterEach(
    (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      isLoading.value = false

      const systemStore = useSystemStore()
      const toName
        = to.matched[to.matched.length - 1]?.components?.default.name
      const fromName
        = from.matched[to.matched.length - 1]?.components?.default.name

      if (to.meta.keepAlive && toName)
        systemStore.keepAliveAddName(toName)

      if (
        !from.meta.keepAlive
        && fromName
        && systemStore.keepAliveNames.includes(fromName)
      )
        systemStore.keepAliveRemoveName(fromName)

      if (to.meta.menuName)
        systemStore.browserTitle = to.meta.menuName
    },
  )

  return router
}
