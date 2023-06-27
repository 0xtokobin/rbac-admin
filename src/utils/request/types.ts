import type { AxiosRequestHeaders } from 'axios'

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type Params = Record<string, any>

export type Data = Record<string, any>

export interface RequestOptions {
  url: string
  method: Method
  isToken?: boolean
  isTime?: boolean
  params?: Params
  data?: Data
  timeout?: number
  headers?: AxiosRequestHeaders
  networkCodeAdaptor?: boolean
  apiCodeAdaptor?: boolean
  authCodeAdaptor?: boolean
}

export interface ResponseData {
  code: number
  msg: string
  data: any
}
