import 'vue-router'
import type { Component } from 'vue'
import type { IObject } from './global'

declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module '*.gif';
declare module 'tsparticles';
declare module 'unplugin-vue-define-options/vite';
declare module '@element-plus/icons-vue'
declare module 'vue-router' {
  interface RouteMeta {
    layout: string
    component?: string | Component
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
    breadcrumb?: IObject[]
    keepAlive?: boolean
  }
}
