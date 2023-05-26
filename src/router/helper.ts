import type { RouteRecordName, RouteRecordRaw, Router } from 'vue-router'
import { useCloned } from '@vueuse/core'
import { AdminRouteEnum } from '@/enums/route'
import type { Files, IObject, Routes, ViewComponents } from '#/global'

export function autoImportRoutes(files: Files): Routes {
  let _routes: Routes = []
  Object.keys(files).forEach((key) => {
    _routes = _routes.concat(files[key])
  })
  _routes.push({
    path: '/:pathMatch(.*)',
    redirect: AdminRouteEnum.ROUTE_ERROR,
  })
  return _routes
}

export function autoImportViewComponents(files: Files): ViewComponents {
  let views: ViewComponents = {}
  Object.keys(files).forEach((key: string) => {
    const fileName = key.replace('.vue', '').replace('@/views', '')
    views = {
      ...views,
      [fileName]: files[key] || {},
    }
  })
  return views
}

export function registerRouter(routes: Routes, router: Router) {
  routes.forEach((route: RouteRecordRaw) => {
    if (!router.hasRoute(route.name as RouteRecordName))
      router.addRoute(route)
  })
}

export function routerInject(routes: Routes,
  viewComponents: ViewComponents,
  breadcrumbList?: Array<IObject>): Routes {
  const res: Routes = []
  routes.forEach((item) => {
    if (!item || !item.meta || item.meta.layout !== 'view')
      return
    if (item.component)
      item.component = viewComponents[item.component as unknown as string]
    if (item.meta && breadcrumbList) {
      const { cloned } = useCloned(breadcrumbList)
      item.meta.breadcrumb = cloned.value
    }
    else {
      item.meta.breadcrumb = []
    }
    item.meta.breadcrumb.push({
      label: item.meta.i18n,
      value: item.path,
    })
    item.children = routerInject(item.children || [], viewComponents, item.meta.breadcrumb)
    res.push(item)
  })
  return res
}
