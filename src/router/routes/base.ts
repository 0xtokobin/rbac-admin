import { RouteEnum } from '@/enum'

export default [
  {
    path: '/',
    name: 'index',
    redirect: RouteEnum.ROUTE_FIRST,
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/403.vue'),
    meta: {
      layout: 'page',
      i18n: { 'zh-CN': '没有权限', 'en-US': 'Permission Denied' },
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue'),
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
