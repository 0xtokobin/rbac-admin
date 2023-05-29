import { defineStore } from 'pinia'
import { ElNotification } from 'element-plus'
import { useBaseStore } from '../use-base-store'
import { getStorage, setStorage } from '@/utils/storage'
import { AdminRouteEnum, StorageKeyEnum } from '@/constants/enums'

import { GET, POST } from '@/utils/request'
import { getLoginStorageType } from '@/utils/base'
import { router } from '@/router'
import { _t } from '@/i18n'
import type { IObject } from '#/global'

export const useUserStore = defineStore('user', () => {
  const stayLogin = ref<boolean>(
    getStorage(StorageKeyEnum.STAY_LOGIN, { type: 'local' }) || false,
  )

  const token = ref<string | null>(
    getStorage(StorageKeyEnum.TOKEN, {
      type: getLoginStorageType(),
    }) || '',
  )

  const profile = ref<IObject>(
    getStorage(StorageKeyEnum.PROFILE, {
      type: getLoginStorageType(),
    }) || {},
  )

  const roles = ref<Array<string>>(
    getStorage(StorageKeyEnum.ROLES, {
      type: getLoginStorageType(),
    }) || [],
  )

  const isLogin = computed(() => (!!token.value))

  const setStayLogin = (state: boolean): void => {
    stayLogin.value = state
    setStorage(StorageKeyEnum.STAY_LOGIN, state, {
      type: 'local',
    })
  }

  const setToken = (_token: string): void => {
    token.value = _token
    setStorage(StorageKeyEnum.TOKEN, _token, { type: getLoginStorageType() })
  }

  const setProfile = (data: IObject): void => {
    profile.value = data
    setStorage(StorageKeyEnum.PROFILE, data, {
      type: getLoginStorageType(),
    })
  }

  const setRoles = (data: Array<string>): void => {
    roles.value = data
    setStorage(StorageKeyEnum.ROLES, data, {
      type: getLoginStorageType(),
    })
  }

  const getProfile = async (): Promise<IObject> => {
    const { code, data } = await GET('/system/user/profile')
    if (code === 0) {
      setProfile(data)
      return data
    }
    else {
      return {}
    }
  }

  const getRoles = async (): Promise<IObject> => {
    const { code, data } = await GET('/system/user/roles')
    if (code === 0) {
      setRoles(data)
      return data
    }
    else {
      return {}
    }
  }

  const login = async (form: any): Promise<void> => {
    const { data, code } = await POST('/system/user/login', form)
    if (code === 0) {
      const baseStore = useBaseStore()
      await setStayLogin(form.remember)
      await setToken(data)
      await getProfile()
      await getRoles()
      await baseStore.getMenuRoutes()
      router.replace({
        path: AdminRouteEnum.ROUTE_FIRST,
      })
      ElNotification({
        title: _t('base.authentication.loginSuccess'),
        type: 'success',
      })
    }
  }

  const logout = (): void => {
    setToken('')
    setProfile({})
    setRoles([])
    ElNotification({
      title: _t('base.authentication.logoutSuccess'),
      type: 'success',
    })
    router.replace({
      path: AdminRouteEnum.ROUTE_LOGIN,
    })
  }

  return {
    stayLogin,
    token,
    profile,
    roles,
    isLogin,
    setStayLogin,
    setProfile,
    getProfile,
    getRoles,
    login,
    logout,
  }
})
