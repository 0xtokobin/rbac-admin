import type { AxiosRequestHeaders } from 'axios'

export interface RequestOptions {
  baseURL?: string
  url: string
  method: any
  isToken?: boolean
  isTime?: boolean
  params?: any
  data?: any
  timeout?: number
  responseType?: any
  headers?: AxiosRequestHeaders
  networkCodeAdaptor?: boolean
  apiCodeAdaptor?: boolean
  authCodeAdaptor?: boolean
}

export interface ResponseData<T = any | null> {
  code: number
  msg: string
  data: T
}
