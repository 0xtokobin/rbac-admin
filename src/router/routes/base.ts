import { RouteEnum } from '@/enum'

export default [
  {
    path: '/',
    name: 'index',
    redirect: RouteEnum.ROUTE_LOGIN,
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('@/views/error.vue'),
    meta: {
      layout: 'page',
      i18n: { 'zh-CN': '页面找不到', 'en-US': 'Page Not Found' },
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
    meta: {
      layout: 'page',
      i18n: { 'zh-CN': '登录', 'en-US': 'Login' },
    },
  },
]
