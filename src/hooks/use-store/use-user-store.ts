import { defineStore } from 'pinia'
import { ElNotification } from 'element-plus'
import { useRouteStore } from './use-route-store'
import type { IObject } from '#/global.d'
import type { ResponseData } from '@/utils/request'
import type { LoginAccountData } from '@/apis/system/user'
import { Settings } from '@/constants/settings'
import { getStorage, setStorage } from '@/utils/storage'
import { getLoginStorageType } from '@/utils/common'
import { RouteEnum, StorageEnum } from '@/constants/enums'
import { router } from '@/plugins/vue-router'
import { _t } from '@/plugins/vue-i18n'
import {
  getUserProfile as _getUserProfile,
  getUserRoles as _getUserRoles,
  loginByAccount as _loginByAccount,
} from '@/apis/system/user'

export const useUserStore = defineStore('user', () => {
  const stayLogin = ref<boolean>(
    getStorage(StorageEnum.STAY_LOGIN, { type: 'local' }) || false,
  )

  const token = ref<string | null>(
    getStorage(StorageEnum.TOKEN, {
      type: getLoginStorageType(),
    }) || '',
  )

  const userProfile = ref<IObject>(
    getStorage(StorageEnum.USER_INFO, {
      type: getLoginStorageType(),
    }) || {},
  )

  const userRoles = ref<Array<string>>(
    getStorage(StorageEnum.USER_ROLES, {
      type: getLoginStorageType(),
    }) || [],
  )

  const isLogin = computed(() => (!!token.value))

  const setStayLogin = (state: boolean): void => {
    stayLogin.value = state
    setStorage(StorageEnum.STAY_LOGIN, state, {
      type: 'local',
    })
  }

  const setToken = (_token: string): void => {
    token.value = _token
    setStorage(StorageEnum.TOKEN, _token, { type: getLoginStorageType() })
  }

  const setUserProfile = (data: IObject): void => {
    userProfile.value = data
    setStorage(StorageEnum.USER_INFO, data, {
      type: getLoginStorageType(),
    })
  }

  const setUserRoles = (data: Array<string>): void => {
    userRoles.value = data
    setStorage(StorageEnum.USER_ROLES, data, {
      type: getLoginStorageType(),
    })
  }

  const getUserProfile = async (): Promise<IObject> => {
    const { code, data } = await _getUserProfile()
    if (code === 0) {
      setUserProfile(data)
      return data
    }
    else {
      return {}
    }
  }

  const getUserRoles = async (): Promise<IObject> => {
    const { code, data } = await _getUserRoles()
    if (code === 0) {
      setUserRoles(data)
      return data
    }
    else {
      return {}
    }
  }

  const loginApiHandle = async (): Promise<void> => {
    await getUserProfile()
    await getUserRoles()
    const routeStore = useRouteStore()
    await routeStore.getAsyncRoutes()
    ElNotification({
      title: _t('app.authentication.loginSuccess'),
      type: 'success',
    })
    router.replace({
      path: Settings.AdminFirstRoute,
    })
  }

  const loginByAccount = async <T>(data: LoginAccountData): Promise<void> => {
    const res: ResponseData<T> = await _loginByAccount(data)
    if (res.code === 0) {
      await setStayLogin(data.remember)
      await setToken(res.data as string)
      await loginApiHandle()
    }
  }

  const loginByMobile = (): void => { }

  const constloginByEmail = (): void => { }

  const switchRoles = (): void => { }

  const logout = (): void => {
    setToken('')
    setUserProfile({})
    setUserRoles([])
    ElNotification({
      title: _t('app.authentication.logoutSuccess'),
      type: 'success',
    })
    router.replace({
      path: RouteEnum.ROUTE_SIGNIN,
    })
  }

  return {
    stayLogin,
    token,
    userProfile,
    userRoles,
    isLogin,
    setStayLogin,
    setUserProfile,
    getUserProfile,
    getUserRoles,
    loginApiHandle,
    loginByAccount,
    loginByMobile,
    constloginByEmail,
    switchRoles,
    logout,
  }
})
