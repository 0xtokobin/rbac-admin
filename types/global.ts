import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

export interface ViewComponents {
  [Key: string]: Component
}

export type Callback = (data?: any) => void

export type SystemSettingsLayout =
  | 'top'
  | 'top-lean'
  | 'aside'
  | 'aside-dark'
  | 'aside-lean'
  | 'aside-lean-dark'

export type SystemSettingsColorScheme = 'auto' | 'theme' | 'light' | 'dark' | ''

export type SystemSettingsTabStyle = 'square' | 'round'

export type SystemSettingsMenuStyle = 'square' | 'round'

export interface IObject<T = any> {
  [key: string]: T
}

export interface IFunction<T = any> {
  (x?: any): T
}

export interface SystemSettings {
  Layout: SystemSettingsLayout
  ThemeColor: string
  ColorScheme: SystemSettingsColorScheme
  TabStyle: SystemSettingsTabStyle
  MenuStyle: SystemSettingsMenuStyle
  Toolbar: IObject<boolean>
  Footer: boolean
  Tab: boolean
  UniqueOpened: boolean
  Breadcrumb: string
  Copyright: string
  ElementPlus: IObject
  Language: string
  FirstRoute: string
  AdminFirstRoute: string
  NetworkTimeout: number
}

export interface Stores<T = any> {
  [key: string]: T
}

export interface Languages<T = any> {
  [key: string]: T
}

export interface Messages<T = any> {
  [key: string]: T
}

export type I18nT = (key: string, params?: IObject | Array<string>) => string

export type Routes = Array<RouteRecordRaw>

export interface Files<T = any> {
  [key: string]: T
}

export interface Mocks<T = any> {
  [key: string]: T
}

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
