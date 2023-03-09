import { IconTypeEnum } from '@/constants/enums'

export default [
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
