import type { ResponseData } from '@/utils/request/index.d'
import { GET, POST } from '@/utils/request'
import type { LoginForm, PhoneForm } from '#/login'

export interface LoginAccountData extends LoginForm {
  username: string
  password: string
}

export interface SignupData extends PhoneForm {
  password: string
}

export interface ValidateUsernameParams {
  username: string
}

export const loginByAccount = <T>(
  data: LoginAccountData,
): Promise<any | ResponseData<T> | undefined> => {
  return POST('/system/user/login', data)
}

export const signup = <T>(
  data: SignupData,
): Promise<any | ResponseData<T> | undefined> => {
  return POST('/system/user/signup', data)
}

export const getUserProfile = <T>(): Promise<
  any | ResponseData<T> | undefined
> => {
  return GET('/system/user/profile')
}

export const validateUsername = <T>(
  params: ValidateUsernameParams,
): Promise<any | ResponseData<T> | undefined> => {
  return GET('/system/user/validate', params)
}

export const getRouteAsync = <T>(): Promise<
  any | ResponseData<T> | undefined
> => {
  return GET('/system/route/async')
}

export const getUserRoles = <T>(): Promise<
  any | ResponseData<T> | undefined
> => {
  return GET('/system/user/roles')
}

export const getUserNotificationByNotRead = <T>(): Promise<
  any | ResponseData<T> | undefined
> => {
  return GET('/system/user/notReadNotification')
}
