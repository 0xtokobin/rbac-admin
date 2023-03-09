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
 * @name routerInject
 * @description 路由注入方法（含国际化 key ，面包屑，试图组件）
 * @param routes 路由数据
 * @param t 国际化翻译函数
 * @param breadcrumbList 面包屑列表
 * @param viewComponents 视图组件
 * @returns
 */
export const routerInject = (
  routes: Routes,
  t: I18nT,
  viewComponents: ViewComponents,
  breadcrumbList?: Array<IObject>,
): Routes => {
  const res: Routes = []
  routes.forEach((item) => {
    if (!item || !item.meta || item.meta.layout !== 'view')
      return
    if (item.meta && item.meta.i18nKey) {
      item.meta.menuName = t(`${item.meta.i18nKey as string}.menuName`)
      item.meta.menuDescription = t(
          `${item.meta.i18nKey as string}.menuDescription`,
      )
    }
    if (item.meta && breadcrumbList) {
      const { cloned } = useCloned(breadcrumbList)
      item.meta.breadcrumb = cloned.value
    }
    item.meta.breadcrumb = []
    item.meta.breadcrumb.push({
      label: item.meta.menuName,
      value: item.path,
    })
    if (item.component)
      item.component = viewComponents[item.component as unknown as string]

    item.children = routerInject(item.children || [], t, viewComponents, item.meta.breadcrumb)
    res.push(item)
  })
  return res
}
