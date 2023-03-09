import type { RouteRecordRaw, Router } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { addRouterGuard } from './guard'
import { autoImportRoutes } from '@/utils/common'

const routes: Array<RouteRecordRaw> = autoImportRoutes(
  import.meta.glob('./routes/**/*.ts', {
    import: 'default',
    eager: true,
  }),
)

const router: Router = addRouterGuard(createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
}))

export { routes, router }
