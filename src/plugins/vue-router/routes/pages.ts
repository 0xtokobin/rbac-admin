import Index from '@/pages/index.vue'
import { Settings } from '@/constants/settings'

export default [
  {
    path: '/',
    component: Index,
    redirect: Settings.FirstRoute,
    meta: { layout: '' },
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/pages/403.vue'),
    meta: { layout: '' },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/404.vue'),
    meta: { layout: '' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login.vue'),
    meta: { layout: 'page' },
  },
  {
    path: '/password',
    name: 'password',
    component: () => import('@/pages/password.vue'),
    meta: { layout: 'page' },
  },
]
