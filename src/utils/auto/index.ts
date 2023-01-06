import type { App, FunctionalComponent, Plugin } from 'vue';
import type { Files } from './index.d';
import type { Mocks } from '@/plugins/mock/index.d';
import type { Stores } from '@/plugins/pinia/index.d';
import type { Routes } from '@/plugins/vue-router/index.d';
import type { Languages } from '@/plugins/vue-i18n/index.d';
import type { ViewComponents } from '@/types/global.d';
import { RouteEnum } from '@/constants/enums';
import { FILE_NAME } from '@kaivanwong/utils';

/**
 * @name autoImportRoutes
 * @description 自动导入静态路由文件
 * @param files
 * @return routes
 */
export const autoImportRoutes = (files: Files): Routes => {
  let _routes: Routes = [];
  Object.keys(files).forEach((key) => {
    _routes = _routes.concat(files[key]);
  });
  _routes.push({
    path: '/:pathMatch(.*)',
    redirect: RouteEnum.ROUTE_NO_FOUND,
  });
  return _routes;
};

/**
 * @name autoImportPiniaStore
 * @description 自动导入基于 Pinia 的状态管理文件
 * @param files
 * @return stores
 */
export const autoImportPiniaStore = (files: Files): Stores => {
  let stores: Stores = {};
  Object.keys(files).forEach((key) => {
    stores = { ...stores, ...files[key] };
  });
  return stores;
};

/**
 * @name autoImportLanguages
 * @description 自动导入国际化多语言翻译 Json 文件
 * @param files
 * @return languages
 */
export const autoImportLanguages = (files: Files): Languages => {
  const languages: Languages = {};
  Object.keys(files).forEach((key: string) => {
    const languageAlias = key.split('/')[2];
    const fileName = key.replace(FILE_NAME, '$2');
    const language = languages[languageAlias] || {};
    languages[languageAlias] = {
      ...language,
      [fileName]: files[key] || {},
    };
  });
  return languages;
};

/**
 * @name autoImportMocks
 * @description 自动导入模拟接口
 * @return mocks
 */
export const autoImportMocks = (files: Files): Mocks => {
  let mocks: Mocks = {};
  Object.keys(files).forEach((key) => {
    mocks = { ...mocks, ...files[key] };
  });
  return mocks;
};

/**
 * @name autoImportViewComponents
 * @description 自动导入视图组件
 * @return views
 */
export const autoImportViewComponents = (files: Files): ViewComponents => {
  let views: ViewComponents = {};
  Object.keys(files).forEach((key: string) => {
    const fileName = key.replace('.vue', '').replace('/src/views', '');
    views = {
      ...views,
      [fileName]: files[key] || {},
    };
  });
  return views;
};

/**
 * @name autoImportSvgs
 * @description 自动导入 svg 图标文件
 * @param files
 * @return svgs
 */
export const autoImportSvgs = (files: Files): Array<string> => {
  const svgs: Array<string> = [];
  Object.keys(files).forEach((key) => {
    svgs.push(
      key
        .replace('/src/assets/svgs/', '')
        .replace('/', '-')
        .replace(FILE_NAME, '$2')
    );
  });
  return svgs;
};

/**
 * @name componentAddInstall
 * @description 组件添加安装方法
 * @param component
 * @param alias
 * @return component
 */
export const componentAddInstall = <T>(
  component: T extends FunctionalComponent<any, any> ? any : any,
  alias?: string
): T & Plugin => {
  const _component = component as any;
  _component.install = (app: App) => {
    app.component(
      alias || _component.name || _component.displayName,
      component
    );
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as T & Plugin;
};

/**
 * @name pluginAddRegister
 * @description 插件添加注册方法
 * @param plugin
 * @return _plugin
 */
export const pluginAddRegister = <T>(plugin: Plugin): T & Plugin => {
  const _plugin = plugin as any;
  _plugin.register = (app: App) => {
    app.use(plugin);
  };
  return _plugin as T & Plugin;
};

/**
 * @name installComponents
 * @description 自动安装组件
 * @param app
 * @param components
 */
export const installComponents = (
  app: App,
  components: Record<string, any>
): void => {
  Object.entries(components).map(([, component]) => {
    if (component.install) {
      component.install(app);
    } else {
      componentAddInstall(component);
      component.install(app);
    }
  });
};
