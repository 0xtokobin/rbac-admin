import type { Component } from 'vue';
import { SettingsValueEnum } from './enums';

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
declare module 'element-plus/dist/locale/en.mjs';
declare module 'element-plus/dist/locale/zh-cn.mjs';

interface ViewComponents {
  [Key: string]: Component;
}

type Callback = (data?: any) => void;

type DefaultSettingsLayout =
  | 'top'
  | 'top-lean'
  | 'aside'
  | 'aside-dark'
  | 'aside-lean'
  | 'aside-lean-dark';

type DefaultSettingsColorScheme = 'auto' | 'theme' | 'light' | 'dark' | '';

type DefaultSettingsTabStyle = 'square' | 'round';

type DefaultSettingsMenuStyle = 'square' | 'round';

interface IObject<T = any> {
  [key: string]: T;
}

interface IFunction<T = any> {
  (x?: any): T;
}

interface DefaultSettingsTypes {
  Layout: DefaultSettingsLayout;
  ThemeColor: string;
  ColorScheme: DefaultSettingsColorScheme;
  TabStyle: DefaultSettingsTabStyle;
  MenuStyle: DefaultSettingsMenuStyle;
  Toolbar: IObject<boolean>;
  Footer: boolean;
  Tab: boolean;
  UniqueOpened: boolean;
  Breadcrumb: string;
  Copyright: string;
  ElementPlus: IObject;
  Language: string;
  FirstRoute: string;
  AdminFirstRoute: string;
}

declare module 'vue-router' {
  interface RouteMeta {
    component?: string | Component;
    isI18n?: boolean;
    i18nKey?: string;
    layout?: string | null;
    isMenu: boolean;
    requiresAuth?: boolean;
    iconType?: string;
    icon?: string;
    menuName?: string;
    sort?: number | string;
    externalPage?: boolean;
    externalPageUrl?: string;
    breadcrumb?: Array[IObject];
  }
}
