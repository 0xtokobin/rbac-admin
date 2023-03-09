import type { Callback, I18nT, IObject } from '#/global'

export const networkCodeAdaptor = (
  code: number,
  t: I18nT,
  callback?: Callback,
): any => {
  let message = ''
  if (code) {
    switch (code) {
      case 200:
        message = ''
        break
      case 400:
        message = t('app.request.wrong')
        break
      case 401:
        message = t('app.authentication.not')
        break
      case 403:
        message = t('app.authentication.denied')
        break
      case 404:
        message = t('app.request.resource')
        break
      case 405:
        message = t('app.request.method')
        break
      case 408:
        message = t('app.request.timeout')
        break
      case 500:
        message = t('app.server.error')
        break
      case 501:
        message = t('app.network.implemented')
        break
      case 502:
        message = t('app.network.error')
        break
      case 503:
        message = t('app.server.down')
        break
      case 504:
        message = t('app.network.timeout')
        break
      case 505:
        message = t('app.request.http')
        break
      default:
        message = t('app.unkown.code', { code })
    }
  }
  if (code && message && callback)
    callback({ code, message })

  return code
}

/**
 * @name apiCodeAdaptor
 * @description 服务端接口状态码适配器
 * @param code 状态码
 * @param t 国际化翻译函数
 * @param callback 回调函数
 * @return code
 */
export const apiCodeAdaptor = (
  data: IObject,
  t: I18nT,
  callback?: Callback,
): any => {
  let message = ''
  if (data.code) {
    switch (data.code) {
      case 0:
        message = ''
        break
      case 500:
        message = t('app.unkown.error', { message: data.msg })
        break
      case 50001:
        message = t('app.api.noParams')
        break
    }
  }
  if (data.code && message && callback)
    callback({ code: data.code, message })

  return data.code
}

/**
 * @name authCodeAdaptor
 * @description 鉴权状态码适配器
 * @param code 状态码
 * @param t 国际化翻译函数
 * @param callback 回调函数
 * @return code
 */
export const authCodeAdaptor = (
  data: IObject,
  t: I18nT,
  callback?: Callback,
): any => {
  let message = ''
  if (data.code) {
    switch (data.code) {
      case 10031:
        message = t('app.authentication.overtime')
        break
      case 10032:
        message = t('app.authentication.longer')
        break
      case 10033:
        message = t('app.authentication.bind')
        break
      case 10034:
        message = t('app.authentication.signup')
        break
      case 10035:
        message = t('app.authentication.inconformity')
        break
      case 10036:
        message = t('app.authentication.noEmployee')
        break
      case 10037:
        message = t('app.authentication.failure')
        break
      case 10038:
        message = t('app.authentication.notFound')
        break
      case 10039:
        message = t('app.authentication.password')
        break
      case 10040:
        message = t('app.authentication.sms')
        break
    }
  }
  if (data.code && message && callback)
    callback({ code: data.code, message })

  return data.code
}
