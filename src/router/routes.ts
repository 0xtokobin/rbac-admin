import type { RouteRecordRaw } from 'vue-router'
import { IconTypeEnum } from '@/constants/enums'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    redirect: '/login',
    meta: { layout: '' },
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/403.vue'),
    meta: { layout: '' },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue'),
    meta: { layout: '' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
    meta: { layout: 'page' },
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home.vue'),
    meta: {
      layout: 'view',
      iconType: IconTypeEnum.ELEMENT_PLUS,
      icon: 'Workbench',
      i18nKey: 'home',
    },
  },
  {
    path: '/system/profile',
    name: 'system.profile',
    component: () => import('@/views/system/profile.vue'),
    meta: {
      layout: 'view',
      iconType: IconTypeEnum.ELEMENT_PLUS,
      icon: 'Postcard',
      i18nKey: 'system.profile',
    },
  },
  {
    path: '/system/notification',
    name: 'system.notification',
    component: () => import('@/views/system/notification.vue'),
    meta: {
      layout: 'view',
      iconType: IconTypeEnum.ELEMENT_PLUS,
      icon: 'ChatDotSquare',
      i18nKey: 'system.notification',
    },
  },
  {
    path: '/system/setting',
    name: 'system.setting',
    component: () => import('@/views/system/setting.vue'),
    meta: {
      layout: 'view',
      iconType: IconTypeEnum.ELEMENT_PLUS,
      icon: 'Setting',
      isI18n: true,
      i18nKey: 'system.setting',
    },
  },
]
