export enum RouteEnum {
  ROUTE_FIRST = '/login',
  ROUTE_ADMIN_FIRST = '/home/workbench',
  ROUTE_NO_PERMISSION = '/403',
  ROUTE_NO_FOUND = '/404',
  ROUTE_LOGIN = '/login',
  ROUTE_SIGNUP = '/signup',
  ROUTE_PASSWORD_FORGET = '/password',
  ROUTE_SYSTEM_PROFILE = '/system/profile',
  ROUTE_SYSTEM_NOTIFICATION = '/system/notification',
  ROUTE_SYSTEM_SETTINGS = '/system/setting',
}

export enum LanguageEnum {
  EN_US_ALIAS = 'en-US',
  EN_US_NAME = 'English',
  ZH_CN_ALIAS = 'zh-CN',
  ZH_CN_NAME = '简体中文',
}

export enum IconTypeEnum {
  ELEMENT_PLUS = 'ep',
  APP = 'app',
}

export enum RequestHeaderEnum {
  HEADER_TOKEN = 'Authorization',
  HEADER_TIME = '_t',
  CONTENT_TYPE_JSON = 'application/json;charset=UTF-8',
  CONTENT_TYPE_BODY = 'application/x-www-form-urlencoded',
  CONTENT_TYPE_FORMDATA = 'multipart/form-data',
}

export enum MobileCodeTypeEnum {
  LOGIN = 0,
  SIGNUP = 1,
  FORGET_PASSWORDS = 2,
  UPDATE_PASSWORD = 3,
}

export enum StorageEnum {
  KEY = 'wingscloud-admin',
  LANGUAGE = 'language',
  STAY_LOGIN = 'stay-login',
  TOKEN = 'token',
  COLOR_SCHEME = 'color-scheme',
  MOBILE_AREA_CODE = 'mobile-area-code',
  USER_INFO = 'user-info',
  USER_ROLES = 'user-roles',
  STATIC_ROUTES = 'static-routes',
  ADMIN_ROUTES = 'admin-routes',
  ROLE_ROUTES = 'role-routes',
  ALL_ROUTES = 'all-routes',
  COLLAPSE = 'collapse',
  UNIQUE_OPENED = 'unique-opened',
  TOOLBAR_SETTINGS = 'toolbar-settings',
  THEME_SETTINGS = 'theme-settings',
  SHOW_FOOTER = 'show-footer',
  LAYOUT = 'layout',
  ELEMENT_PLUS_SIZE = 'element-plus-size',
  SHOW_TAB = 'show-tab',
  SHOW_COLLAPSE = 'show-collapse',
  TAB_STYLE = 'tab-stlye',
  MENU_STYLE = 'menu-style',
  SETTINGS = 'settings',
  DICTIONARY = 'dictionary',
}

export enum SettingsValueEnum {
  LAYOUT_TOP = 'top',
  LAYOUT_TOP_LEAN = 'top-lean',
  LAYOUT_ASIDE = 'aside',
  LAYOUT_ASIDE_DARK = 'aside-dark',
  LAYOUT_ASIDE_LEAN = 'aside-lean',
  LAYOUT_ASIDE_LEAN_DARK = 'aside-lean-dark',
  COLOR_SCHEME_AUTO = 'auto',
  COLOR_SCHEME_THEME = 'theme',
  COLOR_SCHEME_LIGHT = 'light',
  COLOR_SCHEME_DARK = 'dark',
  TAB_STYLE_SQUARE = 'square',
  TAB_STYLE_ROUND = 'round',
  MENU_STYLE_SQUARE = 'square',
  MENU_STYLE_ROUND = 'round',
  BREADCRUMB_VIEW_TOP = 'view-top',
  BREADCRUMB_HIDDEN = 'hidden',
  COPYRIGHT_VIEW_BOTTOM = 'view-bottom',
  COPYRIGHT_HIDDEN = 'hidden',
  LANGUAGE = 'en-US',
}
