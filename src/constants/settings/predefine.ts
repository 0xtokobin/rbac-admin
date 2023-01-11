import { SettingsValueEnum } from '@/constants/enums';

/**
 * @name PredefineToolbar
 * @description 管理系统工具栏预置按钮
 */
export const PredefineToolbar = [
  {
    label: 'system.setting.toolbarDark',
    value: 'Dark',
  },
  {
    label: 'system.setting.toolbarLanguage',
    value: 'Language',
  },
  {
    label: 'system.setting.toolbarRefresh',
    value: 'Refresh',
  },
  {
    label: 'system.setting.toolbarNotification',
    value: 'Notification',
  },
  {
    label: 'system.setting.toolbarFullscreen',
    value: 'Fullscreen',
  },
  {
    label: 'system.setting.toolbarSetting',
    value: 'Setting',
  },
  {
    label: 'system.setting.toolbarAvatar',
    value: 'Avatar',
  },
];

/**
 * @name PredefineLayouts
 * @description 管理系统预置布局方式
 */
export const PredefineLayouts = [
  {
    label: 'system.setting.layoutTop',
    value: SettingsValueEnum.LAYOUT_TOP,
  },
  {
    label: 'system.setting.layoutTopLean',
    value: SettingsValueEnum.LAYOUT_TOP_LEAN,
  },
  {
    label: 'system.setting.layoutAside',
    value: SettingsValueEnum.LAYOUT_ASIDE,
  },
  {
    label: 'system.setting.layoutAsideDark',
    value: SettingsValueEnum.LAYOUT_ASIDE_DARK,
  },
  {
    label: 'system.setting.layoutAsideLean',
    value: SettingsValueEnum.LAYOUT_ASIDE_LEAN,
  },
  {
    label: 'system.setting.layoutAsideLeanDark',
    value: SettingsValueEnum.LAYOUT_ASIDE_LEAN_DARK,
  },
];

/**
 * @name PredefineColorSchemes
 * @description 预置配色方案
 */
export const PredefineColorSchemes = [
  {
    label: 'system.setting.colorSchemeAuto',
    value: SettingsValueEnum.COLOR_SCHEME_AUTO,
  },
  {
    label: 'system.setting.colorSchemeTheme',
    value: SettingsValueEnum.COLOR_SCHEME_THEME,
  },
  {
    label: 'system.setting.colorSchemeLight',
    value: SettingsValueEnum.COLOR_SCHEME_LIGHT,
  },
  {
    label: 'system.setting.colorSchemeDark',
    value: SettingsValueEnum.COLOR_SCHEME_DARK,
  },
];

/**
 * @name PredefineThemeColors
 * @description 预置主题颜色
 */
export const PredefineThemeColors = [
  '#3dabf5',
  '#0d6efd',
  '#42b983',
  '#ea3a72',
  '#fe7300',
  '#1C9399',
  '#F56C6C',
  '#839aff',
];

/**
 * @name PredefineTabStyle
 * @description 预置标签风格
 */
export const PredefineTabStyle = [
  {
    label: 'system.setting.tabStyleSquare',
    value: SettingsValueEnum.TAB_STYLE_SQUARE,
  },
  {
    label: 'system.setting.tabStyleRound',
    value: SettingsValueEnum.TAB_STYLE_ROUND,
  },
];

/**
 * @name PredefineMenuStyle
 * @description 预置管理菜单风格
 */
export const PredefineMenuStyle = [
  {
    label: 'system.setting.menuStyleSquare',
    value: SettingsValueEnum.MENU_STYLE_SQUARE,
  },
  {
    label: 'system.setting.menuStyleRound',
    value: SettingsValueEnum.MENU_STYLE_ROUND,
  },
];

/**
 * @name PredefineBreadcrumbPosition
 * @description 预置面包屑位置
 */
export const PredefineBreadcrumbPosition = [
  {
    label: 'system.setting.breadcrumbViewTop',
    value: SettingsValueEnum.BREADCRUMB_VIEW_TOP,
  },
  {
    label: 'system.setting.breadcrumbHidden',
    value: SettingsValueEnum.BREADCRUMB_HIDDEN,
  },
];

/**
 * @name PredefineCopyrightPosition
 * @description 预置版权信息位置
 */
export const PredefineCopyrightPosition = [
  {
    label: 'system.setting.copyrightBottom',
    value: SettingsValueEnum.COPYRIGHT_VIEW_BOTTOM,
  },
  {
    label: 'system.setting.copyrightHidden',
    value: SettingsValueEnum.COPYRIGHT_HIDDEN,
  },
];
