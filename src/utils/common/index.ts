import type { IObject, IFunction } from '@/types/global.d';
import type { Reg } from '@kaivanwong/utils';
import { getStorage } from '@/utils/storage';
import { StorageEnum } from '@/constants/enums';

/**
 * @name isNullOrUndefined
 * @description 判断是 null 还是 undefined
 * @param value
 * @return null | undefined
 */
export const isNullOrUndefined = (value: unknown): boolean => {
  return value === null || typeof value === 'undefined';
};

/**
 * @name getValueByKeys
 * @description 获取对象下某个键的值
 * @param record {}
 * @param key 'a.b.c'
 * @param defaultValue
 * @return record | defaultValue
 */
export const getValueByKeys = (
  record: IObject = {},
  key: string,
  defaultValue?: unknown
): any => {
  const keys = key.split('.');
  for (let i = 0; i < keys.length; i++) {
    record = record[keys[i]] || (i === keys.length - 1 ? defaultValue : {});
  }
  return record || defaultValue;
};

/**
 * @name arrayToObject
 * @description 数组转对象
 * @param data
 * @param key
 * @param render
 * @return obj
 */
export const arrayToObject = (
  data: any[] = [],
  key: string | IFunction,
  render?: IFunction
): IObject => {
  const obj: IObject = {};
  data.forEach((item) => {
    obj[typeof key === 'function' ? key(item) : item[key]] = render
      ? render(item)
      : item;
  });
  return obj;
};

/**
 * @name interceptJointData
 * @description 拦截 url 的 params 入参
 * @param url
 * @return value
 */
export const interceptJointData = (data: string): IObject => {
  let value: IObject = {};
  if (data && data.indexOf('?') != -1) {
    data = data.split('?')[1];
  }
  data.split('&').forEach((item: string) => {
    value = { ...value, [item.split('=')[0]]: item.split('=')[1] };
  });
  return value;
};

/**
 * @name arrayRecursion
 * @description 数组扁平化
 * @param key
 * @param array
 * @return {}
 */
export const arrayRecursion = (
  key: string,
  array: IObject[],
  validateKey: string,
  childrenKey?: string
): any => {
  childrenKey = childrenKey || 'children';
  for (let i = 0; i < array.length; i++) {
    if (array[i][key] && array[i][key] == validateKey) return array[i];
    if (array[i][childrenKey]) {
      const res = arrayRecursion(key, array[i][childrenKey], validateKey);
      if (res) return res;
    }
  }
};

/**
 * @name checkFloat
 * @description 返回一个正则，用于截取固定小数点的数据
 * @param n
 * @returns
 */
export const checkFloat = (n: string): Reg => {
  return /^([1-9]+[\d]*(.[0-9]{1,${n}})?)/;
};

/**
 * @name getLoginStorageType
 * @description 获取是否保持登录状态
 * @return storageType
 */
export const getLoginStorageType = (): string => {
  return getStorage(StorageEnum.STAY_LOGIN, { type: 'local' }) === true
    ? 'local'
    : 'session';
};

/**
 * @name mergeValueByKey
 * @description 合并对象中已存在 key 的 value
 * @return to
 */
export const mergeValueByKey = (to: IObject, source: IObject): IObject => {
  for (const key in source) {
    if (Object.getOwnPropertyDescriptor(to, key)?.value === '') {
      to[key] = source[key];
    }
  }
  return to;
};
