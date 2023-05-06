import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

export interface IObject<T = any> {
  [key: string]: T
}

export interface IFunction<T = any> {
  (x?: any): T
}

export interface Files<T = any> {
  [key: string]: T
}

export type Callback = (data?: any) => void

export interface ViewComponents {
  [Key: string]: Component
}

export type SystemSettingsLayout =
  | 'mix'
  | 'top'
  | 'side'

export interface SystemSettings {
  layout: SystemSettingsLayout
  theme: string
  darkMode: string
  tab: boolean
  navigation: string
  size: string
  language: string
}

export type Routes = Array<RouteRecordRaw>

export interface Languages<T = any> {
  [key: string]: T
}

export interface Messages<T = any> {
  [key: string]: T
}

export type I18nT = (key: string, params?: IObject | Array<string>) => string
