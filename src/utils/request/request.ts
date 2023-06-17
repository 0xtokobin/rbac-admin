import type { Axios, AxiosRequestHeaders, AxiosResponse } from 'axios'
import axios from 'axios'
import qs from 'qs'
import { ElNotification } from 'element-plus'
import type {
  RequestOptions,
  ResponseData,
} from './types'
import {
  apiCodeAdaptor,
  authCodeAdaptor,
  networkCodeAdaptor,
} from './code'
import { RequestHeaderEnum, StorageKeyEnum } from '@/constants/enums'
import { getStorage } from '@/utils/storage'
import { _t } from '@/plugins/vue-i18n'

/**
 * @name addInterceptorsRequest
 * @description Add an interceptor for network requests。
 * @param axios The Axios instance.
 * @param options Network request configuration.
 * @returns
 */
export function addInterceptorsRequest(axios: Axios,
  options: RequestOptions): number {
  return axios.interceptors.request.use((config) => {
    if (options.isTime)
      config.params[RequestHeaderEnum.HEADER_TIME] = new Date().getTime()

    if (options.headers) {
      config.headers = { ...config.headers, ...options.headers } as AxiosRequestHeaders
      if (options.isToken) {
        config.headers[RequestHeaderEnum.HEADER_TOKEN] = getStorage(
          StorageKeyEnum.TOKEN,
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

/**
 * @name addInterceptorsResponse
 * @description Add an interceptor for network response.
 * @param axios The Axios instance.
 * @param options Network request configuration.
 * @returns
 */
export function addInterceptorsResponse(axios: Axios,
  options: RequestOptions): number {
  return axios.interceptors.response.use((response) => {
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

/**
 * @name request
 * @description Network request, based on Axios.
 * @param options Network request configuration.
 * @returns
 */
export function request(options: RequestOptions): Promise<ResponseData> {
  const _axios: Axios = axios.create()
  addInterceptorsRequest(_axios, options)
  addInterceptorsResponse(_axios, options)
  return new Promise((resolve) => {
    _axios
      .request({
        baseURL: import.meta.env.APP_REQUEST_URL + import.meta.env.APP_REQUEST_PREFIX,
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
        resolve(res.data as ResponseData)
      })
      .catch(({ response }) => {
        if (options.networkCodeAdaptor) {
          networkCodeAdaptor(response.status, _t, ({ message }) => {
            ElNotification({
              title: _t('base.network.error'),
              message,
              type: 'error',
            })
          })
        }
        resolve({
          code: response.status,
          msg: response.statusText,
          data: response.data,
        } as ResponseData)
      })
  })
}
