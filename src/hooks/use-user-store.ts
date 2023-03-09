import { defineStore } from 'pinia'
import { ElNotification } from 'element-plus'
import { useSystemStore } from './use-system-store'
import type { IObject } from '#/global'
import { Settings } from '@/constants/settings'
import { getStorage, setStorage } from '@/utils/storage'
import { getLoginStorageType } from '@/utils/common'
import { RouteEnum, StorageEnum } from '@/constants/enums'
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
    getStorage(StorageEnum.STAY_LOGIN, { type: 'local' }) || false,
  )

  // 令牌
  const token = ref<string | null>(
    getStorage(StorageEnum.TOKEN, {
      type: getLoginStorageType(),
    }) || '',
  )

  // 系统用户资料
  const userProfile = ref<IObject>(
    getStorage(StorageEnum.USER_INFO, {
      type: getLoginStorageType(),
    }) || {},
  )

  // 系统用户权限
  const userRole = ref<Array<string>>(
    getStorage(StorageEnum.USER_ROLES, {
      type: getLoginStorageType(),
    }) || [],
  )

  // 登录状态标记
  const isLogin = computed(() => (!!token.value))

  // 缓存是否保持登录状态
  const setStayLogin = (state: boolean): void => {
    stayLogin.value = state
    setStorage(StorageEnum.STAY_LOGIN, state, {
      type: 'local',
    })
  }

  // 缓存系统用户 Token
  const setToken = (_token: string): void => {
    token.value = _token
    setStorage(StorageEnum.TOKEN, _token, { type: getLoginStorageType() })
  }

  // 缓存系统用户资料
  const setUserProfile = (data: IObject): void => {
    userProfile.value = data
    setStorage(StorageEnum.USER_INFO, data, {
      type: getLoginStorageType(),
    })
  }

  // 缓存系统用户权限
  const setUserRole = (data: Array<string>): void => {
    userRole.value = data
    setStorage(StorageEnum.USER_ROLES, data, {
      type: getLoginStorageType(),
    })
  }

  // 获取系统用户资料
  const getUserProfile = async (): Promise<IObject> => {
    const { code, data } = await GET('/system/user/profile')
    if (code === 0) {
      setUserProfile(data)
      return data
    }
    else {
      return {}
    }
  }

  // 获取系统用户权限
  const getUserRole = async (): Promise<IObject> => {
    const { code, data } = await GET('/system/user/role')
    if (code === 0) {
      setUserRole(data)
      return data
    }
    else {
      return {}
    }
  }

  // 系统用户登录
  const userLogin = async (form: any): Promise<void> => {
    const { data, code } = await POST('/system/user/login', form)
    if (code === 0) {
      const systemStore = useSystemStore()
      await setStayLogin(form.remember)
      await setToken(data)
      await getUserProfile()
      await getUserRole()
      await systemStore.getMenuRoutes()
      router.replace({
        path: Settings.AdminFirstRoute,
      })
      ElNotification({
        title: _t('app.authentication.loginSuccess'),
        type: 'success',
      })
    }
  }

  // 系统用户退出登录
  const userlogout = (): void => {
    setToken('')
    setUserProfile({})
    setUserRole([])
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
    userProfile,
    userRole,
    isLogin,
    setStayLogin,
    setUserProfile,
    getUserProfile,
    getUserRole,
    userLogin,
    userlogout,
  }
})
