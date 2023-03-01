import type { App, FunctionalComponent, Plugin } from 'vue'
import { FILE_NAME } from '@kaivanwong/utils'
import type { Files, Languages, Mocks, Routes, Stores, ViewComponents } from '#/global'

import { RouteEnum } from '@/constants/enums'

export const autoImportRoutes = (files: Files): Routes => {
  let _routes: Routes = []
  Object.keys(files).forEach((key) => {
    _routes = _routes.concat(files[key])
  })
  _routes.push({
    path: '/:pathMatch(.*)',
    redirect: RouteEnum.ROUTE_NO_FOUND,
  })
  return _routes
}

export const autoImportPiniaStore = (files: Files): Stores => {
  let stores: Stores = {}
  Object.keys(files).forEach((key) => {
    stores = { ...stores, ...files[key] }
  })
  return stores
}

export const autoImportLanguages = (files: Files): Languages => {
  const languages: Languages = {}
  Object.keys(files).forEach((key: string) => {
    const languageAlias = key.split('/')[2]
    const fileName = key.replace(FILE_NAME, '$2')
    const language = languages[languageAlias] || {}
    languages[languageAlias] = {
      ...language,
      [fileName]: files[key] || {},
    }
  })
  return languages
}

export const autoImportMocks = (files: Files): Mocks => {
  let mocks: Mocks = {}
  Object.keys(files).forEach((key) => {
    mocks = { ...mocks, ...files[key] }
  })
  return mocks
}

export const autoImportViewComponents = (files: Files): ViewComponents => {
  let views: ViewComponents = {}
  Object.keys(files).forEach((key: string) => {
    const fileName = key.replace('.vue', '').replace('/src/views', '')
    views = {
      ...views,
      [fileName]: files[key] || {},
    }
  })
  return views
}

export const autoImportSvg = (files: Files): Array<string> => {
  const svg: Array<string> = []
  Object.keys(files).forEach((key) => {
    svg.push(
      key
        .replace('/src/assets/svg/', '')
        .replace('/', '-')
        .replace(FILE_NAME, '$2'),
    )
  })
  return svg
}

export const componentAddInstall = <T>(
  component: T extends FunctionalComponent<any, any> ? any : any,
  alias?: string,
): T & Plugin => {
  const _component = component as any
  _component.install = (app: App) => {
    app.component(
      alias || _component.name || _component.displayName,
      component,
    )
    if (alias)
      app.config.globalProperties[alias] = component
  }
  return component as T & Plugin
}

export const pluginAddRegister = <T>(plugin: Plugin): T & Plugin => {
  const _plugin = plugin as any
  _plugin.register = (app: App) => {
    app.use(plugin)
  }
  return _plugin as T & Plugin
}

export const installComponents = (
  app: App,
  components: Record<string, any>,
): void => {
  Object.entries(components).forEach(([, component]) => {
    if (component.install) {
      component.install(app)
    }
    else {
      componentAddInstall(component)
      component.install(app)
    }
  })
}
