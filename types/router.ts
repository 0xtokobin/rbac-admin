import 'vue-router'
import type { Component } from 'vue'
import type { IObject } from './global'

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
