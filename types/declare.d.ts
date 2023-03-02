declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module '*.gif';
declare module 'qs';
declare module 'mockjs';
declare module 'unplugin-vue-define-options/vite';
declare module 'element-plus/dist/locale/en.mjs';
declare module 'element-plus/dist/locale/zh-cn.mjs';
declare module '@element-plus/icons-vue'
declare module 'vue-router' {
  interface RouteMeta {
    component?: string | Component
    layout: string
    isI18n?: boolean
    i18nKey?: string
    isMenu?: boolean
    requiresAuth?: boolean
    iconType?: string
    icon?: string
    menuName?: string
    sort?: number | string
    externalPage?: boolean
    externalPageUrl?: string
    breadcrumb?: Array[IObject]
    keepAlive?: boolean
  }
}
