import type { Callback, IObject } from '#/global'
import type { I18nT } from '@/plugins/vue-i18n'

export function networkCodeAdaptor(code: number,
  t: I18nT,
  callback?: Callback): any {
  let message = ''
  if (code) {
    switch (code) {
      case 200:
        message = ''
        break
      case 400:
        message = t('base.request.wrong')
        break
      case 401:
        message = t('base.authentication.not')
        break
      case 403:
        message = t('base.authentication.denied')
        break
      case 404:
        message = t('base.request.resource')
        break
      case 405:
        message = t('base.request.method')
        break
      case 408:
        message = t('base.request.timeout')
        break
      case 500:
        message = t('base.server.error')
        break
      case 501:
        message = t('base.network.implemented')
        break
      case 502:
        message = t('base.network.error')
        break
      case 503:
        message = t('base.server.down')
        break
      case 504:
        message = t('base.network.timeout')
        break
      case 505:
        message = t('base.request.http')
        break
      default:
        message = t('base.unkown.code', { code })
    }
  }
  if (code && message && callback)
    callback({ code, message })

  return code
}

export function apiCodeAdaptor(data: IObject,
  t: I18nT,
  callback?: Callback): any {
  let message = ''
  if (data.code) {
    switch (data.code) {
      case 0:
        message = ''
        break
      case 500:
        message = t('base.unkown.error', { message: data.msg })
        break
      case 50001:
        message = t('base.api.noParams')
        break
    }
  }
  if (data.code && message && callback)
    callback({ code: data.code, message })

  return data.code
}

export function authCodeAdaptor(data: IObject,
  t: I18nT,
  callback?: Callback): any {
  let message = ''
  if (data.code) {
    switch (data.code) {
      case 10031:
        message = t('base.authentication.overtime')
        break
      case 10032:
        message = t('base.authentication.longer')
        break
      case 10033:
        message = t('base.authentication.bind')
        break
      case 10034:
        message = t('base.authentication.signup')
        break
      case 10035:
        message = t('base.authentication.inconformity')
        break
      case 10036:
        message = t('base.authentication.noEmployee')
        break
      case 10037:
        message = t('base.authentication.failure')
        break
      case 10038:
        message = t('base.authentication.notFound')
        break
      case 10039:
        message = t('base.authentication.password')
        break
      case 10040:
        message = t('base.authentication.sms')
        break
    }
  }
  if (data.code && message && callback)
    callback({ code: data.code, message })

  return data.code
}
