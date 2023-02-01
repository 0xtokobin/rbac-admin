import type { Axios, AxiosResponse } from 'axios';
import type { RequestOptions, ResponseData } from './index.d';
import type { IObject } from '@/types/global.d';
import axios from 'axios';
import qs from 'qs';
import { ElNotification } from 'element-plus';
import { getStorage } from '../storage';
import {
  networkCodeAdaptor,
  apiCodeAdaptor,
  authCodeAdaptor,
} from '../code-adaptor';
import { RequestHeaderEnum, StorageEnum } from '@/constants/enums';
import { Settings } from '@/constants/settings';
import { _t } from '@/plugins/vue-i18n';

/**
 * @name request
 * @description 基于 axios 的网络请求实例
 * @param options
 * @return _axios
 */
export const request = <T>(
  options: RequestOptions
): Promise<any | ResponseData<T> | undefined> => {
  const _axios: Axios = axios.create();
  addInterceptorsRequest(_axios, options);
  addInterceptorsResponse(_axios, options);
  return new Promise((resolve) => {
    _axios
      .request({
        baseURL: options.baseURL || import.meta.env.APP_REQUEST_URL,
        url: options.url,
        method: options.method,
        timeout: options.timeout || Settings.NetworkTimeout,
        headers: {
          'Content-Type': RequestHeaderEnum.CONTENT_TYPE_JSON,
          ...options.headers,
        },
        params: options.params,
        data: options.data,
      })
      .then((res: AxiosResponse<any, any>) => {
        resolve(res.data as ResponseData<T>);
      })
      .catch((error) => {
        resolve({
          code: error.response.status,
          msg: error.response.statusText,
          data: error.data,
        } as ResponseData<T>);
      });
  });
};

/**
 * @name addInterceptorsRequest
 * @description 为 axios 网络请求实例添加请求拦截器
 * @param axios
 * @param options
 * @returns
 */
export const addInterceptorsRequest = (
  axios: Axios,
  options: RequestOptions
): number => {
  return axios.interceptors.request.use((config) => {
    if (options.isTime) {
      config.params[RequestHeaderEnum.HEADER_TIME] = new Date().getTime();
    }
    if (options.headers) {
      config.headers = { ...config.headers, ...options.headers };
      if (options.isToken) {
        config.headers[RequestHeaderEnum.HEADER_TOKEN] = getStorage(
          StorageEnum.TOKEN
        );
      }
    }
    if (
      Object.values(config.headers).includes(
        RequestHeaderEnum.CONTENT_TYPE_BODY
      )
    ) {
      config.data = qs.stringify(config.data);
    }
    return config;
  });
};

/**
 * @name addInterceptorsResponse
 * @description 为 axios 网络请求实例添加响应拦截器
 * @param axios
 * @param options
 * @returns
 */
export const addInterceptorsResponse = <T>(
  axios: Axios,
  options: RequestOptions
): number => {
  return axios.interceptors.response.use((response) => {
    if (options.networkCodeAdaptor) {
      networkCodeAdaptor(response.status, _t, ({ message }) => {
        ElNotification({
          title: _t('app.network.error'),
          message,
          type: 'error',
        });
      });
    }
    if (options.apiCodeAdaptor) {
      apiCodeAdaptor(response.data, _t, ({ message }) => {
        ElNotification({
          title: _t('app.api.error'),
          message,
          type: 'error',
        });
      });
    }
    if (options.authCodeAdaptor) {
      authCodeAdaptor(response.data, _t, ({ message }) => {
        ElNotification({
          title: _t('app.authentication.error'),
          message,
          type: 'error',
        });
      });
    }
    return response;
  });
};

/**
 * @name GET
 * @description 基于 axios 网络请求实例的 GET 方法封装
 * @param url
 * @param params
 * @param options
 * @return request
 */
export const GET = <T>(
  url: string,
  params?: any,
  options?: RequestOptions
): Promise<any | ResponseData<T> | undefined> => {
  return request({
    url,
    method: 'GET',
    params,
    headers: {
      'Content-Type': RequestHeaderEnum.CONTENT_TYPE_JSON,
      ...options?.headers,
    },
    networkCodeAdaptor: true,
    apiCodeAdaptor: true,
    authCodeAdaptor: true,
    ...options,
  });
};

/**
 * @name POST
 * @description 基于 axios 网络请求实例的 POST 方法封装
 * @param url
 * @param data
 * @param options
 * @return request
 */
export const POST = <T>(
  url: string,
  data?: any,
  options?: RequestOptions
): Promise<any | ResponseData<T> | undefined> => {
  return request({
    url,
    method: 'POST',
    data,
    headers: {
      'Content-Type': RequestHeaderEnum.CONTENT_TYPE_BODY,
      ...options?.headers,
    },
    networkCodeAdaptor: true,
    apiCodeAdaptor: true,
    authCodeAdaptor: true,
    ...options,
  });
};

/**
 * @name PUT
 * @description 基于 axios 网络请求实例的 PUT 方法封装
 * @param url
 * @param data
 * @param options
 * @return request
 */
export const PUT = <T>(
  url: string,
  data?: any,
  options?: RequestOptions
): Promise<any | ResponseData<T> | undefined> => {
  return request({
    url,
    method: 'PUT',
    data,
    headers: {
      'Content-Type': RequestHeaderEnum.CONTENT_TYPE_BODY,
      ...options?.headers,
    },
    networkCodeAdaptor: true,
    apiCodeAdaptor: true,
    authCodeAdaptor: true,
    ...options,
  });
};

/**
 * @name DELETE
 * @description 基于 axios 网络请求实例的 DELETE 方法封装
 * @param url
 * @param data
 * @param options
 * @return request
 */
export const DELETE = <T>(
  url: string,
  params?: any,
  options?: RequestOptions
): Promise<any | ResponseData<T> | undefined> => {
  return request({
    url,
    method: 'DELETE',
    params,
    headers: {
      'Content-Type': RequestHeaderEnum.CONTENT_TYPE_BODY,
      ...options?.headers,
    },
    networkCodeAdaptor: true,
    apiCodeAdaptor: true,
    authCodeAdaptor: true,
    ...options,
  });
};

/**
 * @name UPLOAD
 * @description 基于 axios 网络请求实例的 UPLOAD 方法封装
 * @param url
 * @param data
 * @param options
 * @return request
 */
export const UPLOAD = <T>(
  url: string,
  data?: any,
  options?: RequestOptions
): Promise<any | ResponseData<T> | undefined> => {
  return request({
    url,
    method: 'POST',
    data,
    headers: {
      'Content-Type': RequestHeaderEnum.CONTENT_TYPE_FORMDATA,
      ...options?.headers,
    },
    networkCodeAdaptor: true,
    apiCodeAdaptor: true,
    authCodeAdaptor: true,
    ...options,
  });
};

/**
 * @name DOWNLOAD
 * @description 基于 axios 网络请求实例的 DOWNLOAD 方法封装
 * @param url
 * @param data
 * @param options
 * @return request
 */
export const DOWNLOAD = <T>(
  url: string,
  params?: IObject,
  options?: RequestOptions
): Promise<any | ResponseData<T> | undefined> => {
  return request({
    url,
    method: 'GET',
    params,
    headers: {
      'Content-Type': RequestHeaderEnum.CONTENT_TYPE_JSON,
      ...options?.headers,
    },
    responseType: 'blob',
    networkCodeAdaptor: true,
    apiCodeAdaptor: true,
    authCodeAdaptor: true,
    ...options,
  });
};
