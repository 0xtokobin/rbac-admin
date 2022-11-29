import { IconTypeEnum } from '@/constants/enums';

export default [
  {
    path: '/system/profile',
    name: 'system.profile',
    component: () => import('@/views/system/profile.vue'),
    meta: {
      layout: 'admin',
      isMenu: false,
      requiresAuth: false,
      iconType: IconTypeEnum.ELEMENT_PLUS,
      icon: 'Postcard',
      sort: 0,
      i18nKey: 'system.profile',
    },
  },
  {
    path: '/system/notification',
    name: 'system.notification',
    component: () => import('@/views/system/notification.vue'),
    meta: {
      layout: 'admin',
      isMenu: false,
      requiresAuth: false,
      iconType: IconTypeEnum.ELEMENT_PLUS,
      icon: 'ChatDotSquare',
      sort: 1,
      i18nKey: 'system.notification',
    },
  },

  {
    path: '/system/setting',
    name: 'system.setting',
    component: () => import('@/views/system/setting.vue'),
    meta: {
      layout: 'admin',
      isMenu: false,
      requiresAuth: false,
      iconType: IconTypeEnum.ELEMENT_PLUS,
      icon: 'Setting',
      sort: 6,
      isI18n: true,
      i18nKey: 'system.setting',
    },
  },
  {
    path: '/example',
    name: 'example',
    meta: {
      layout: 'admin',
      isMenu: true,
      requiresAuth: false,
      iconType: IconTypeEnum.ELEMENT_PLUS,
      icon: 'Guide',
      sort: 2,
      isI18n: true,
      i18nKey: 'example',
    },
    children: [
      {
        path: '/example/icon',
        name: 'example.icon',
        component: () => import('@/views/example/icon.vue'),
        meta: {
          layout: 'admin',
          isMenu: true,
          requiresAuth: false,
          iconType: IconTypeEnum.ELEMENT_PLUS,
          icon: 'MagicStick',
          sort: 1,
          i18nKey: 'example.icon',
        },
      },
      {
        path: '/example/editor',
        name: 'example.editor',
        component: () => import('@/views/example/editor.vue'),
        meta: {
          layout: 'admin',
          isMenu: true,
          requiresAuth: false,
          iconType: IconTypeEnum.ELEMENT_PLUS,
          icon: 'Document',
          sort: 2,
          i18nKey: 'example.editor',
        },
      },
      {
        path: '/example/charts',
        name: 'example.charts',
        component: () => import('@/views/example/charts.vue'),
        meta: {
          layout: 'admin',
          isMenu: true,
          requiresAuth: false,
          iconType: IconTypeEnum.ELEMENT_PLUS,
          icon: 'DataLine',
          sort: 3,
          i18nKey: 'example.charts',
        },
      },
      {
        path: '/example/map',
        name: 'example.map',
        component: () => import('@/views/example/map.vue'),
        meta: {
          layout: 'admin',
          isMenu: true,
          requiresAuth: false,
          iconType: IconTypeEnum.ELEMENT_PLUS,
          icon: 'MapLocation',
          sort: 4,
          i18nKey: 'example.map',
        },
      },
      {
        path: '/example/form',
        name: 'example.form',
        component: () => import('@/views/example/form.vue'),
        meta: {
          layout: 'admin',
          isMenu: true,
          requiresAuth: false,
          iconType: IconTypeEnum.ELEMENT_PLUS,
          icon: 'DocumentChecked',
          sort: 5,
          i18nKey: 'example.form',
        },
      },
      {
        path: '/example/form-step',
        name: 'example.formStep',
        component: () => import('@/views/example/form-step.vue'),
        meta: {
          layout: 'admin',
          isMenu: true,
          requiresAuth: false,
          iconType: IconTypeEnum.ELEMENT_PLUS,
          icon: 'DocumentChecked',
          sort: 6,
          i18nKey: 'example.formStep',
        },
      },
      {
        path: '/example/result',
        name: 'example.result',
        component: () => import('@/views/example/result.vue'),
        meta: {
          layout: 'admin',
          isMenu: true,
          requiresAuth: false,
          iconType: IconTypeEnum.ELEMENT_PLUS,
          icon: 'Warning',
          sort: 7,
          i18nKey: 'example.result',
        },
      },
    ],
  },
];
