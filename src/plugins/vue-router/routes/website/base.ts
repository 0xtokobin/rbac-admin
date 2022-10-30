import { DefaultSettings } from '../../../../settings';

export default [
  {
    path: '/website',
    name: 'website',
    redirect: DefaultSettings.FirstRoute,
    component: () => import('@/views/website/index.vue'),
    meta: { requiresAuth: false, layout: '', isAdmin: false },
  },
  {
    path: '/website/home',
    name: 'website.home',
    component: () => import('@/views/website/home/index.vue'),
    meta: { requiresAuth: false, layout: 'website', isAdmin: false },
  },
  {
    path: '/website/usage',
    name: 'website.usage',
    component: () => import('@/views/website/usage/index.vue'),
    meta: { requiresAuth: false, layout: 'website', isAdmin: false },
  },
];
