import type { Router } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { addRouterGuard } from './guard'
import { routes } from './routes'

const router: Router = addRouterGuard(createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
}))

export { router }
