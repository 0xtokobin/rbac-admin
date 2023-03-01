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
    component: () => import('@/pages/error/403.vue'),
    meta: { layout: '' },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/error/404.vue'),
    meta: { layout: '' },
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('@/pages/signin.vue'),
    meta: { layout: '' },
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/pages/signup.vue'),
    meta: { layout: '' },
  },
  {
    path: '/password/forget',
    name: 'password.forget',
    component: () => import('@/pages/password/forget.vue'),
    meta: { layout: '' },
  },
]
