import type { AxiosRequestHeaders } from 'axios'
import { request } from './request'
import type {
  RequestOptions,
  ResponseData,
} from './types'
import { RequestHeaderEnum } from '@/constants/enums'
import type { IObject } from '#/global'

export function GET<T>(url: string,
  params?: any,
  options?: RequestOptions): Promise<any | ResponseData<T> | undefined> {
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

export function POST<T>(url: string,
  data?: any,
  options?: RequestOptions): Promise<any | ResponseData<T> | undefined> {
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

export function PUT<T>(url: string,
  data?: any,
  options?: RequestOptions): Promise<any | ResponseData<T> | undefined> {
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

export function DELETE<T>(url: string,
  params?: any,
  options?: RequestOptions): Promise<any | ResponseData<T> | undefined> {
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

export function UPLOAD<T>(url: string,
  data?: any,
  options?: RequestOptions): Promise<any | ResponseData<T> | undefined> {
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

export function DOWNLOAD<T>(url: string,
  params?: IObject,
  options?: RequestOptions): Promise<any | ResponseData<T> | undefined> {
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
