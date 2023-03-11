/**
 * @name RouteEnum
 * @description 路由枚举
 */
export enum RouteEnum {
  ROUTE_FIRST = '/',
  ROUTE_NO_PERMISSION = '/403',
  ROUTE_NO_FOUND = '/404',
  ROUTE_LOGIN = '/login',
}

/**
 * @name LanguageEnum
 * @description 多语言枚举
 */
export enum LanguageEnum {
  ELEMENT_PLUS_LANGUAGE = 'el-language',
  EN_US_ALIAS = 'en-US',
  EN_US_NAME = 'English',
  ZH_CN_ALIAS = 'zh-CN',
  ZH_CN_NAME = '简体中文',
}

/**
 * @name IconTypeEnum
 * @description 图标类型枚举
 */
export enum IconTypeEnum {
  ELEMENT_PLUS = 'ep',
  APP = 'app',
}

/**
 * @name RequestHeaderEnum
 * @description 网络请求头枚举
 */
export enum RequestHeaderEnum {
  HEADER_TOKEN = 'Authorization',
  HEADER_TIME = '_t',
  CONTENT_TYPE_JSON = 'application/json;charset=UTF-8',
  CONTENT_TYPE_BODY = 'application/x-www-form-urlencoded',
  CONTENT_TYPE_FORMDATA = 'multipart/form-data',
}

/**
 * @name StorageKeyEnum
 * @description 缓存 Key 枚举
 */
export enum StorageKeyEnum {
  WINGSCLOUD = 'wingscloud',
  LANGUAGE = 'language',
  STAY_LOGIN = 'stay-login',
  TOKEN = 'token',
  DARK_MODE = 'dark-mode',
  MOBILE_AREA_CODE = 'mobile-area-code',
  PROFILE = 'profile',
  ROLES = 'roles',
  MENU_ROUTES = 'menu',
  SETTING = 'setting',
  DICT = 'dict',
}

/**
 * @name LayoutEnum
 * @description 布局模式枚举
 */
export enum LayoutEnum {
  LAYOUT_MIX = 'mix',
  LAYOUT_TOP = 'top',
  LAYOUT_SIDE = 'side',
}

/**
 * @name DarkModeEnum
 * @description 布局模式枚举
 */
export enum DarkModeEnum {
  DARK_MODE_AUTO = 'auto',
  DARK_MODE_LIGHT = 'light',
  DARK_MODE_DARK = 'dark',
}

/**
 * @name ThemeEnum
 * @description 主题颜色枚举
 */
export enum ThemeEnum {
  BLUE = '#0d6efd',
  GREEN = '#42b983',
  RED = '#ea3a72',
  ORANGE = '#fe7300',
  CYAN = '#1c9399',
  PINK = '#f56c6c',
  VIOLET = '#839aff',
}

/**
 * @name SizeEnum
 * @description 组件大小枚举
 */
export enum SizeEnum {
  LARGE = 'large',
  DEFAULT = 'default',
  SMALL = 'small',
}
