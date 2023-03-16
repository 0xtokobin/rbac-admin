import { isNullOrUndefined } from '@/utils/common'
import { StorageKeyEnum } from '@/enum'

export interface AppStorageOptions {
  type?: string
  isTemplate?: boolean
  isJSON?: boolean
  isDelete?: boolean
  defaultData?: unknown
  desc?: string | null | undefined
  user?: string | null | undefined
  time?: string | null | undefined
}

export const storageType = (type: string): Storage => {
  return type === 'local' ? localStorage : sessionStorage
}

export const setStorage = (
  key: string,
  data: any,
  options?: AppStorageOptions,
): void => {
  key = `${StorageKeyEnum.WINGSCLOUD}-${key}`
  options = {
    type: 'session',
    isTemplate: false,
    isJSON: true,
    ...options,
  }
  storageType(options.type as unknown as string).setItem(
    key,
    options.isTemplate
      ? JSON.stringify({
        user: options.user,
        time: new Date().getTime(),
        data,
        desc: options.desc,
      })
      : options.isJSON
        ? JSON.stringify(data)
        : data,
  )
}

export const getStorage = (key: string, options?: AppStorageOptions): any => {
  key = `${StorageKeyEnum.WINGSCLOUD}-${key}`
  options = {
    type: 'session',
    isTemplate: false,
    isJSON: true,
    ...options,
  }
  const data: any | null = storageType(
    options.type as unknown as string,
  ).getItem(key)
  if (options.isDelete)
    storageType(options.type as unknown as string).removeItem(key)

  return isNullOrUndefined(data)
    ? options.defaultData
      ? options.defaultData
      : null
    : options.isTemplate
      ? data
        ? JSON.parse(data)
        : options.defaultData
      : options.isJSON
        ? JSON.parse(data)
        : data
}

export const removeStorage = (key: string, type?: string): void => {
  key = `${StorageKeyEnum.WINGSCLOUD}-${key}`
  storageType(type || 'session').removeItem(key)
}
