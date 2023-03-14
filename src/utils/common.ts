import type { App, FunctionalComponent, Plugin } from 'vue'
import { colorMix } from '@kaivanwong/utils'
import { getStorage } from './storage'
import type { IFunction, IObject } from '#/global'

import { StorageKeyEnum } from '@/enum'

/**
 * @name isNullOrUndefined
 * @description 判断是 null 还是 undefined
 * @returns
 */
export const isNullOrUndefined = (value: unknown): boolean => {
  return value === null || typeof value === 'undefined'
}

/**
 * @name getValueByKeys
 * @description 通过 key 获取对象的值
 * @returns
 */
export const getValueByKeys = (
  record: IObject = {},
  key: string,
  defaultValue?: unknown,
): any => {
  const keys = key.split('.')
  for (let i = 0; i < keys.length; i++)
    record = record[keys[i]] || (i === keys.length - 1 ? defaultValue : {})

  return record || defaultValue
}

/**
 * @name arrayToObject
 * @description 数组转对象
 * @returns
 */
export const arrayToObject = (
  data: any[] = [],
  key: string | IFunction,
  render?: IFunction,
): IObject => {
  const obj: IObject = {}
  data.forEach((item) => {
    obj[typeof key === 'function' ? key(item) : item[key]] = render
      ? render(item)
      : item
  })
  return obj
}

/**
 * @name interceptJointData
 * @description 取 url 的对象数据
 * @returns
 */
export const interceptJointData = (data: string): IObject => {
  let value: IObject = {}
  if (data && data.includes('?'))
    data = data.split('?')[1]

  data.split('&').forEach((item: string) => {
    value = { ...value, [item.split('=')[0]]: item.split('=')[1] }
  })
  return value
}

/**
 * @name arrayRecursion
 * @description 数组扁平化
 * @returns
 */
export const arrayRecursion = (
  key: string,
  array: IObject[],
  validateKey: string,
  childrenKey?: string,
): any => {
  childrenKey = childrenKey || 'children'
  for (let i = 0; i < array.length; i++) {
    if (array[i][key] && array[i][key] === validateKey)
      return array[i]
    if (array[i][childrenKey]) {
      const res = arrayRecursion(key, array[i][childrenKey], validateKey)
      if (res)
        return res
    }
  }
}

/**
 * @name mergeValueByKey
 * @description 合并对象中已存在 key 的 value
 * @returns
 */
export const mergeValueByKey = (to: IObject, source: IObject): IObject => {
  for (const key in source) {
    if (Object.getOwnPropertyDescriptor(to, key)?.value === '')
      to[key] = source[key]
  }
  return to
}

/**
 * @name componentAddInstall
 * @description 自定义组件添加安装方法
 * @returns
 */
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

/**
 * @name setEpThemeColor
 * @description 设置主题颜色
 * @returns
 */
export const setEpThemeColor = (color: string, isDark: boolean): void => {
  if (!color)
    return
  const element = document.documentElement
  element.style.setProperty('--el-color-primary', color)
  for (let i = 1; i < 10; i++)
    element.style.setProperty(`--el-color-primary-light-${i}`, colorMix(color, isDark ? '#000000' : '#ffffff', i * 0.1))

  element.style.setProperty('--el-color-primary-dark-2', colorMix(color, '#000000', 0.2))
}

/**
 * @name getLoginStorageType
 * @description 获取是否保持登录状态
 * @returns
 */
export const getLoginStorageType = (): string => {
  return getStorage(StorageKeyEnum.STAY_LOGIN, { type: 'local' }) === true
    ? 'local'
    : 'session'
}

/**
 * @name installComponents
 * @description 自动安装组件
 * @returns
 */
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
