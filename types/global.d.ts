import type { Component } from 'vue';
import { SettingsValueEnum } from '@/constants/enums';

interface ViewComponents {
  [Key: string]: Component;
}

type Callback = (data?: any) => void;

type SystemSettingsLayout =
  | 'top'
  | 'top-lean'
  | 'aside'
  | 'aside-dark'
  | 'aside-lean'
  | 'aside-lean-dark';

type SystemSettingsColorScheme = 'auto' | 'theme' | 'light' | 'dark' | '';

type SystemSettingsTabStyle = 'square' | 'round';

type SystemSettingsMenuStyle = 'square' | 'round';

interface IObject<T = any> {
  [key: string]: T;
}

interface IFunction<T = any> {
  (x?: any): T;
}

interface SystemSettings {
  Layout: SystemSettingsLayout;
  ThemeColor: string;
  ColorScheme: SystemSettingsColorScheme;
  TabStyle: SettingsTabStyle;
  MenuStyle: SettingsMenuStyle;
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
  NetworkTimeout: number;
}

declare module 'vue-router' {
  interface RouteMeta {
    component?: string | Component;
    layout: string;
    isI18n?: boolean;
    i18nKey?: string;
    isMenu?: boolean;
    requiresAuth?: boolean;
    iconType?: string;
    icon?: string;
    menuName?: string;
    sort?: number | string;
    externalPage?: boolean;
    externalPageUrl?: string;
    breadcrumb?: Array[IObject];
    keepAlive?: boolean;
  }
}

interface Stores<T = any> {
  [key: string]: T;
}

interface Languages<T = any> {
  [key: string]: T;
}

interface Messages<T = any> {
  [key: string]: T;
}

type I18nT = (key: string, params?: IObject | Array<string>) => string;

type Routes = Array<RouteRecordRaw>;

interface Files<T = any> {
  [key: string]: T;
}
