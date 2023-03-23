import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

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
