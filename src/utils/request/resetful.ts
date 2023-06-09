import type { AxiosRequestHeaders } from 'axios'
import { request } from './request'
import type {
  Data,
  Params,
  RequestOptions,
  ResponseData,
} from './types'
import { RequestHeaderEnum } from '@/constants/enums'

export function GET(url: string,
  params?: Params,
  options?: RequestOptions): Promise<ResponseData> {
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

export function POST(url: string,
  data?: Data,
  options?: RequestOptions): Promise<ResponseData> {
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

export function PUT(url: string,
  data?: Data,
  options?: RequestOptions): Promise<ResponseData> {
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

export function DELETE(url: string,
  params?: Params,
  options?: RequestOptions): Promise<ResponseData> {
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

export function UPLOAD(url: string,
  data?: Data,
  options?: RequestOptions): Promise<ResponseData> {
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

export function DOWNLOAD(url: string,
  params?: Params,
  options?: RequestOptions): Promise<ResponseData> {
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
