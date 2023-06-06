import type { AxiosRequestHeaders } from 'axios'

/**
 * The restful network requests.
 */
export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

/**
 * The request params. It's not required.
 */
export type Params = Record<string, any>

/**
 * The data that was sent.
 */
export type Data = Record<string, any>

/**
 * Network request configuration.
 */
export interface RequestOptions {
  /**
   * This is the Api interface address, and you must provide it.
   */
  url: string
  /**
   * The request type. Types support is provided by `Method`. It is also required.
   */
  method: Method
  /**
   * Whether the request header needs to carry a token. It's not required.
   */
  isToken?: boolean
  /**
   * Whether the request header needs to carry a timestamp. It's not required.
   */
  isTime?: boolean
  /**
   * The request params. It's not required.  Types support is provided by `Params`.
   */
  params?: Params
  /**
   *  The data that was sent. Types support is provided by `Data`.
   */
  data?: Data
  /**
   * You can specify a timeout period for a request.
   */
  timeout?: number
  /**
   * If you want, you can customize the request header and it will be incorporated into the default request header.
   */
  headers?: AxiosRequestHeaders
  /**
   * Network state adapter, set to true will automatically intercept network state.
   */
  networkCodeAdaptor?: boolean
  /**
   * Api interface state adapter, set to true will automatically intercept network state.
   */
  apiCodeAdaptor?: boolean
  /**
   * Authentication state adapter, set to true will automatically intercept network state.
   */
  authCodeAdaptor?: boolean
}

/**
 * Response data.
 */
export interface ResponseData {
  /**
   * Interface status code.
   */
  code: number
  /**
   * The response message.
   */
  msg: string
  /**
   * The response data.
   */
  data: Record<string, any>
}
