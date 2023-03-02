import type { RouteRecordName, RouteRecordRaw, Router } from 'vue-router'
import { useCloned } from '@vueuse/core'
import type { I18nT, IObject, Routes, ViewComponents } from '#/global'

/**
 * @name registerRouter
 * @description 注册路由
 * @param routes 路由数据
 * @param router 路由实例
 */
export const registerRouter = (routes: Routes, router: Router) => {
  routes.forEach((route: RouteRecordRaw) => {
    if (!router.hasRoute(route.name as RouteRecordName))
      router.addRoute(route)
  })
}

/**
 * @name mergeMenuRoutes
 * @description 合并菜单路由
 * @param staticRoutes 静态路由
 * @param asyncRoutes 异步路由
 * @returns
 */
export const mergeMenuRoutes = (
  staticRoutes: Routes,
  asyncRoutes?: Routes,
): Routes => {
  const _routes: Routes = []
  const _allRoutes: Routes = staticRoutes
    .concat(asyncRoutes || [])
    .sort((a: any, b: any) => a.meta?.sort - b.meta?.sort)
  _allRoutes.forEach((item: RouteRecordRaw) => {
    if (item && item.meta && item.meta.isMenu === true) {
      item.children = mergeMenuRoutes(item.children || [])
      _routes.push(item)
    }
  })
  return _routes
}

/**
 * @name mergeAsyncRoutes
 * @description 合并异步路由
 * @param asyncRoutes 异步路由数据
 * @param viewComponents 试图组件
 * @returns
 */
export const mergeAsyncRoutes = (
  asyncRoutes: Routes,
  viewComponents: ViewComponents,
): Routes => {
  const _routes: Routes = []
  asyncRoutes.forEach((item) => {
    if (item.meta) {
      item.meta.async = true
      if (item.component)
        item.component = viewComponents[item.component as unknown as string]

      item.children = mergeAsyncRoutes(item.children || [], viewComponents)
    }
    _routes.push(item)
  })
  return _routes
}

/**
 * @name routerInject
 * @description 路由注入方法（含国际化 key ，面包屑注入）
 * @param routes 路由数据
 * @param t 国际化翻译函数
 * @param breadcrumbList 面包屑列表
 * @returns
 */
export const routerInject = (
  routes: Routes,
  t: I18nT,
  breadcrumbList?: Array<IObject>,
): Routes => {
  const _routes: Routes = []
  routes.forEach((item) => {
    if (!item || !item.meta || item.meta.layout !== 'view')
      return
    item.meta.breadcrumb = []
    if (item.meta) {
      if (item.meta.i18nKey) {
        item.meta.menuName = t(`${item.meta.i18nKey as string}.menuName`)
        item.meta.menuDescription = t(
          `${item.meta.i18nKey as string}.menuDescription`,
        )
      }
      if (breadcrumbList) {
        const { cloned } = useCloned(breadcrumbList)
        item.meta.breadcrumb = cloned.value
      }
      item.meta.breadcrumb.push({
        label: item.meta.menuName,
        value: item.path,
      })
    }
    item.children = routerInject(item.children || [], t, item.meta.breadcrumb)
    _routes.push(item)
  })
  return _routes
}

/**
 * @name routerInjectLanguages
 * @description 路由注入国际化翻译文本
 * @param routes 路由数据
 * @param t 国际化翻译函数
 * @returns
 */
export const routerInjectLanguages = (routes: Routes, t: I18nT): Routes => {
  const _routes: Routes = []
  routes.forEach((item) => {
    if (!item || !item.meta || item.meta.layout !== 'view')
      return
    if (item.meta && item.meta.isI18n) {
      if (item.meta.i18nKey) {
        item.meta.menuName = t(`${item.meta.i18nKey as string}.menuName`)
        item.meta.menuDescription = t(
          `${item.meta.i18nKey as string}.menuDescription`,
        )
      }
      else {
        item.meta.menuName = ''
        item.meta.menuDescription = ''
      }
    }
    item.children = routerInjectLanguages(item.children || [], t)
    _routes.push(item)
  })
  return _routes
}

/**
 * @name routerInjectLanguages
 * @description 路由注入面包屑数据
 * @param routes 路由数据
 * @param breadcrumbList 面包屑列表
 * @returns
 */
export const routerInjectBreadcrumb = (
  routes: Routes,
  breadcrumbList?: Array<IObject>,
): Routes => {
  const _routes: Routes = []
  routes.forEach((item) => {
    if (!item || !item.meta || item.meta.layout !== 'view')
      return
    item.meta.breadcrumb = []
    if (breadcrumbList) {
      const { cloned } = useCloned(breadcrumbList)
      item.meta.breadcrumb = cloned.value
    }
    item.meta.breadcrumb.push({
      label: item.meta.menuName,
      value: item.path,
    })
    item.children = routerInjectBreadcrumb(
      item.children || [],
      item.meta.breadcrumb,
    )
    _routes.push(item)
  })
  return _routes
}
