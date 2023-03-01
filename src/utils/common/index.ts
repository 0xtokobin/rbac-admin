import type { IFunction, IObject } from '#/global.d'
import { getStorage } from '@/utils/storage'
import { StorageEnum } from '@/constants/enums'

export const isNullOrUndefined = (value: unknown): boolean => {
  return value === null || typeof value === 'undefined'
}

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

export const interceptJointData = (data: string): IObject => {
  let value: IObject = {}
  if (data && data.includes('?'))
    data = data.split('?')[1]

  data.split('&').forEach((item: string) => {
    value = { ...value, [item.split('=')[0]]: item.split('=')[1] }
  })
  return value
}

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

export const getLoginStorageType = (): string => {
  return getStorage(StorageEnum.STAY_LOGIN, { type: 'local' }) === true
    ? 'local'
    : 'session'
}

export const mergeValueByKey = (to: IObject, source: IObject): IObject => {
  for (const key in source) {
    if (Object.getOwnPropertyDescriptor(to, key)?.value === '')
      to[key] = source[key]
  }
  return to
}
