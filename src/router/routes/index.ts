import Index from '@/views/index.vue'
import { Settings } from '@/constants/settings'
import { IconTypeEnum } from '@/constants/enums'

export default [
  {
    path: '/',
    component: Index,
    redirect: Settings.FirstRoute,
    meta: { layout: '' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
    meta: { layout: 'page' },
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
]
