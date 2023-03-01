import type { SystemSettings } from '#/global.d'
import { LanguageEnum, RouteEnum, SettingsValueEnum } from '@/constants/enums'

export const SettingsDefault: SystemSettings = {
  Layout: SettingsValueEnum.LAYOUT_TOP,
  ThemeColor: '#3dabf5',
  ColorScheme: SettingsValueEnum.COLOR_SCHEME_AUTO,
  TabStyle: SettingsValueEnum.TAB_STYLE_SQUARE,
  MenuStyle: SettingsValueEnum.MENU_STYLE_ROUND,
  Toolbar: {
    Dark: true,
    Language: true,
    Refresh: true,
    Notification: true,
    Fullscreen: true,
    Setting: true,
    Avatar: true,
  },
  Footer: false,
  Tab: true,
  UniqueOpened: true,
  Copyright: SettingsValueEnum.COPYRIGHT_VIEW_BOTTOM,
  Breadcrumb: SettingsValueEnum.BREADCRUMB_VIEW_TOP,
  ElementPlus: {
    size: 'default',
    message: {
      max: 3,
    },
    button: {
      autoInsertSpace: true,
    },
    language: 'el-language',
  },
  Language: LanguageEnum.ZH_CN_ALIAS,
  FirstRoute: RouteEnum.ROUTE_FIRST,
  AdminFirstRoute: RouteEnum.ROUTE_ADMIN_FIRST,
  NetworkTimeout: 30000,
}
