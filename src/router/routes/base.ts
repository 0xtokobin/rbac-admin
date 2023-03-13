import Index from '@/views/index.vue'

export default [
  {
    path: '/',
    name: 'index',
    component: Index,
    meta: { layout: 'view', requiresAuth: true },
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/403.vue'),
    meta: { layout: 'page' },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue'),
    meta: { layout: 'page' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
    meta: { layout: 'page' },
  },
]
