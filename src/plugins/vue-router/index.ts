import type { RouteRecordRaw, Router } from 'vue-router'
import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoImportRoutes, pluginAddRegister } from '../../utils/auto'
import { addRouterGuard } from './guard'

const routes: Array<RouteRecordRaw> = autoImportRoutes(
  import.meta.glob('./routes/**/*.ts', {
    import: 'default',
    eager: true,
  }),
)

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
})

const useRouter = (app: App<Element>): void => {
  app.use(addRouterGuard(router))
}

export { routes, router, useRouter }

export default pluginAddRegister(addRouterGuard(router))
