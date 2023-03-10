import { defineStore } from 'pinia'
import { ElNotification } from 'element-plus'
import { useSystemStore } from './use-system-store'
import type { IObject } from '#/global'
import { getStorage, setStorage } from '@/utils/storage'
import { getLoginStorageType } from '@/utils/common'
import { RouteEnum, StorageKeyEnum } from '@/enum'
import { router } from '@/router'
import { _t } from '@/i18n'
import { GET, POST } from '@/utils/request'

/**
 * @name useUserStore
 * @description 用户状态管理钩子函数
 * @returns
 */
export const useUserStore = defineStore('user', () => {
  // 保持登录状态标识
  const stayLogin = ref<boolean>(
    getStorage(StorageKeyEnum.STAY_LOGIN, { type: 'local' }) || false,
  )

  // 令牌
  const token = ref<string | null>(
    getStorage(StorageKeyEnum.TOKEN, {
      type: getLoginStorageType(),
    }) || '',
  )

  // 用户资料
  const profile = ref<IObject>(
    getStorage(StorageKeyEnum.PROFILE, {
      type: getLoginStorageType(),
    }) || {},
  )

  // 用户权限
  const roles = ref<Array<string>>(
    getStorage(StorageKeyEnum.ROLES, {
      type: getLoginStorageType(),
    }) || [],
  )

  // 登录状态标记
  const isLogin = computed(() => (!!token.value))

  // 缓存是否保持登录状态
  const setStayLogin = (state: boolean): void => {
    stayLogin.value = state
    setStorage(StorageKeyEnum.STAY_LOGIN, state, {
      type: 'local',
    })
  }

  // 缓存令牌
  const setToken = (_token: string): void => {
    token.value = _token
    setStorage(StorageKeyEnum.TOKEN, _token, { type: getLoginStorageType() })
  }

  // 缓存用户资料
  const setProfile = (data: IObject): void => {
    profile.value = data
    setStorage(StorageKeyEnum.PROFILE, data, {
      type: getLoginStorageType(),
    })
  }

  // 缓存系统用户权限
  const setRoles = (data: Array<string>): void => {
    roles.value = data
    setStorage(StorageKeyEnum.ROLES, data, {
      type: getLoginStorageType(),
    })
  }

  // 获取用户资料
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

  // 获取用户权限
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

  // 用户登录
  const login = async (form: any): Promise<void> => {
    const { data, code } = await POST('/system/user/login', form)
    if (code === 0) {
      const systemStore = useSystemStore()
      await setStayLogin(form.remember)
      await setToken(data)
      await getProfile()
      await getRoles()
      await systemStore.getMenuRoutes()
      router.replace({
        path: RouteEnum.ROUTE_FIRST,
      })
      ElNotification({
        title: _t('app.authentication.loginSuccess'),
        type: 'success',
      })
    }
  }

  // 用户退出
  const logout = (): void => {
    setToken('')
    setProfile({})
    setRoles([])
    ElNotification({
      title: _t('app.authentication.logoutSuccess'),
      type: 'success',
    })
    router.replace({
      path: RouteEnum.ROUTE_LOGIN,
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
