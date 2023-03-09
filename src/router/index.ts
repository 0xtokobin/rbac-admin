import type { Router } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { addRouterGuard } from './guard'

const router: Router = addRouterGuard(createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
}))

export { routes, router }
