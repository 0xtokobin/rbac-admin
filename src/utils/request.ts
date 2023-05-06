import type { Axios, AxiosRequestHeaders, AxiosResponse } from 'axios'
import axios from 'axios'
import qs from 'qs'
import { ElNotification } from 'element-plus'
import { RequestHeaderEnum } from '../enums/base'
import { CacheKeyEnum } from '../enums/cache'
import { getStorage } from './cache'
import {
  apiCodeAdaptor,
  authCodeAdaptor,
  networkCodeAdaptor,
} from './request-code'
import { _t } from '@/i18n'
import type { IObject } from '#/global'
import type {
  RequestOptions,
  ResponseData,
} from '#/request'

export const addInterceptorsRequest = (
  axios: Axios,
  options: RequestOptions,
): number => {
  return axios.interceptors.request.use((config) => {
    if (options.isTime)
      config.params[RequestHeaderEnum.HEADER_TIME] = new Date().getTime()

    if (options.headers) {
      config.headers = { ...config.headers, ...options.headers } as AxiosRequestHeaders
      if (options.isToken) {
        config.headers[RequestHeaderEnum.HEADER_TOKEN] = getStorage(
          CacheKeyEnum.TOKEN,
        )
      }
    }
    if (
      Object.values(config.headers).includes(
        RequestHeaderEnum.CONTENT_TYPE_BODY,
      )
    )
      config.data = qs.stringify(config.data)

    return config
  })
}

export const addInterceptorsResponse = (
  axios: Axios,
  options: RequestOptions,
): number => {
  return axios.interceptors.response.use((response) => {
    if (options.networkCodeAdaptor) {
      networkCodeAdaptor(response.status, _t, ({ message }) => {
        ElNotification({
          title: _t('base.network.error'),
          message,
          type: 'error',
        })
      })
    }
    if (options.apiCodeAdaptor) {
      apiCodeAdaptor(response.data, _t, ({ message }) => {
        ElNotification({
          title: _t('base.api.error'),
          message,
          type: 'error',
        })
      })
    }
    if (options.authCodeAdaptor) {
      authCodeAdaptor(response.data, _t, ({ message }) => {
        ElNotification({
          title: _t('base.authentication.error'),
          message,
          type: 'error',
        })
      })
    }
    return response
  })
}

export const request = <T>(
  options: RequestOptions,
): Promise<any | ResponseData<T> | undefined> => {
  const _axios: Axios = axios.create()
  addInterceptorsRequest(_axios, options)
  addInterceptorsResponse(_axios, options)
  return new Promise((resolve) => {
    console.warn(import.meta.env)
    _axios
      .request({
        baseURL: options.baseURL || import.meta.env.WINGSCLOUD_REQUEST_URL,
        url: options.url,
        method: options.method,
        timeout: options.timeout || 30000,
        headers: {
          'Content-Type': RequestHeaderEnum.CONTENT_TYPE_JSON,
          ...options.headers,
        },
        params: options.params,
        data: options.data,
      })
      .then((res: AxiosResponse<any, any>) => {
        resolve(res.data as ResponseData<T>)
      })
      .catch((error) => {
        resolve({
          code: error.response.status,
          msg: error.response.statusText,
          data: error.data,
        } as ResponseData<T>)
      })
  })
}

export const GET = <T>(
  url: string,
  params?: any,
  options?: RequestOptions,
): Promise<any | ResponseData<T> | undefined> => {
  return request({
    url,
    method: 'GET',
    params,
    headers: {
      'Content-Type': RequestHeaderEnum.CONTENT_TYPE_JSON,
      ...options?.headers,
    } as AxiosRequestHeaders,
    networkCodeAdaptor: true,
    apiCodeAdaptor: true,
    authCodeAdaptor: true,
    ...options,
  })
}

export const POST = <T>(
  url: string,
  data?: any,
  options?: RequestOptions,
): Promise<any | ResponseData<T> | undefined> => {
  return request({
    url,
    method: 'POST',
    data,
    headers: {
      'Content-Type': RequestHeaderEnum.CONTENT_TYPE_BODY,
      ...options?.headers,
    } as AxiosRequestHeaders,
    networkCodeAdaptor: true,
    apiCodeAdaptor: true,
    authCodeAdaptor: true,
    ...options,
  })
}

export const PUT = <T>(
  url: string,
  data?: any,
  options?: RequestOptions,
): Promise<any | ResponseData<T> | undefined> => {
  return request({
    url,
    method: 'PUT',
    data,
    headers: {
      'Content-Type': RequestHeaderEnum.CONTENT_TYPE_BODY,
      ...options?.headers,
    } as AxiosRequestHeaders,
    networkCodeAdaptor: true,
    apiCodeAdaptor: true,
    authCodeAdaptor: true,
    ...options,
  })
}

export const DELETE = <T>(
  url: string,
  params?: any,
  options?: RequestOptions,
): Promise<any | ResponseData<T> | undefined> => {
  return request({
    url,
    method: 'DELETE',
    params,
    headers: {
      'Content-Type': RequestHeaderEnum.CONTENT_TYPE_BODY,
      ...options?.headers,
    } as AxiosRequestHeaders,
    networkCodeAdaptor: true,
    apiCodeAdaptor: true,
    authCodeAdaptor: true,
    ...options,
  })
}

export const UPLOAD = <T>(
  url: string,
  data?: any,
  options?: RequestOptions,
): Promise<any | ResponseData<T> | undefined> => {
  return request({
    url,
    method: 'POST',
    data,
    headers: {
      'Content-Type': RequestHeaderEnum.CONTENT_TYPE_FORMDATA,
      ...options?.headers,
    } as AxiosRequestHeaders,
    networkCodeAdaptor: true,
    apiCodeAdaptor: true,
    authCodeAdaptor: true,
    ...options,
  })
}

export const DOWNLOAD = <T>(
  url: string,
  params?: IObject,
  options?: RequestOptions,
): Promise<any | ResponseData<T> | undefined> => {
  return request({
    url,
    method: 'GET',
    params,
    headers: {
      'Content-Type': RequestHeaderEnum.CONTENT_TYPE_JSON,
      ...options?.headers,
    } as AxiosRequestHeaders,
    responseType: 'blob',
    networkCodeAdaptor: true,
    apiCodeAdaptor: true,
    authCodeAdaptor: true,
    ...options,
  })
}
