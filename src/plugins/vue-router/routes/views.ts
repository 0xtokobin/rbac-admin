import { IconTypeEnum } from '@/constants/enums';

export default [
  {
    path: '/system/profile',
    name: 'system.profile',
    component: () => import('@/views/system/profile.vue'),
    meta: {
      layout: 'admin',
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
      layout: 'admin',
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
      layout: 'admin',
      iconType: IconTypeEnum.ELEMENT_PLUS,
      icon: 'Setting',
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
          iconType: IconTypeEnum.ELEMENT_PLUS,
          icon: 'MapLocation',
          sort: 4,
          i18nKey: 'example.map',
        },
      },
      {
        path: '/example/form',
        name: 'example.form',
        meta: {
          layout: 'admin',
          isMenu: true,
          iconType: IconTypeEnum.ELEMENT_PLUS,
          icon: 'DocumentChecked',
          sort: 5,
          i18nKey: 'example.form',
        },
        children: [
          {
            path: '/example/form/base',
            name: 'example.form.base',
            component: () => import('@/views/example/form/base.vue'),
            meta: {
              layout: 'admin',
              isMenu: true,
              sort: 1,
              i18nKey: 'example.form.base',
            },
          },
          {
            path: '/example/form/step',
            name: 'example.form.step',
            component: () => import('@/views/example/form/step.vue'),
            meta: {
              layout: 'admin',
              isMenu: true,
              sort: 2,
              i18nKey: 'example.form.step',
            },
          },
        ],
      },
      {
        path: '/example/result',
        name: 'example.result',
        meta: {
          layout: 'admin',
          isMenu: true,
          iconType: IconTypeEnum.ELEMENT_PLUS,
          icon: 'Warning',
          sort: 7,
          i18nKey: 'example.result',
        },
        children: [
          {
            path: '/example/result/success',
            name: 'example.result.success',
            component: () => import('@/views/example/result/success.vue'),
            meta: {
              layout: 'admin',
              isMenu: true,
              sort: 1,
              i18nKey: 'example.result.success',
            },
          },
          {
            path: '/example/result/warning',
            name: 'example.result.warning',
            component: () => import('@/views/example/result/warning.vue'),
            meta: {
              layout: 'admin',
              isMenu: true,
              sort: 2,
              i18nKey: 'example.result.warning',
            },
          },
          {
            path: '/example/result/error',
            name: 'example.result.error',
            component: () => import('@/views/example/result/error.vue'),
            meta: {
              layout: 'admin',
              isMenu: true,
              sort: 3,
              i18nKey: 'example.result.error',
            },
          },
          {
            path: '/example/result/info',
            name: 'example.result.info',
            component: () => import('@/views/example/result/info.vue'),
            meta: {
              layout: 'admin',
              isMenu: true,
              sort: 4,
              i18nKey: 'example.result.info',
            },
          },
        ],
      },
      {
        path: '/example/keep-alive',
        name: 'example.keepAlive',
        meta: {
          layout: 'admin',
          isMenu: true,
          iconType: IconTypeEnum.ELEMENT_PLUS,
          icon: 'CopyDocument',
          sort: 8,
          i18nKey: 'example.keepAlive',
          keepAlive: true,
        },
        children: [
          {
            path: '/example/keep-alive/open',
            name: 'example.keepAlive.open',
            component: () => import('@/views/example/keep-alive/open.vue'),
            meta: {
              layout: 'admin',
              isMenu: true,
              sort: 1,
              i18nKey: 'example.keepAlive.open',
              keepAlive: true,
            },
          },
          {
            path: '/example/keep-alive/close',
            name: 'example.keepAlive.close',
            component: () => import('@/views/example/keep-alive/close.vue'),
            meta: {
              layout: 'admin',
              isMenu: true,
              sort: 2,
              i18nKey: 'example.keepAlive.close',
              keepAlive: false,
            },
          },
        ],
      },
      {
        path: '/example/navigation-one',
        name: 'example.navigation.one',
        meta: {
          layout: 'admin',
          isMenu: true,
          iconType: IconTypeEnum.ELEMENT_PLUS,
          icon: 'Notification',
          sort: 9,
          i18nKey: 'example.navigation.one',
        },
        children: [
          {
            path: '/example/navigation-two',
            name: 'example.navigation.two',
            meta: {
              layout: 'admin',
              isMenu: true,
              sort: 1,
              i18nKey: 'example.navigation.two',
            },
            children: [
              {
                path: '/example/navigation-three',
                name: 'example.navigation.three',
                component: () => import('@/views/example/navigation.vue'),
                meta: {
                  layout: 'admin',
                  isMenu: true,
                  sort: 1,
                  i18nKey: 'example.navigation.three',
                },
              },
            ],
          },
        ],
      },
    ],
  },
];
