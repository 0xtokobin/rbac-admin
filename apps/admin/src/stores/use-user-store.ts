import { defineStore } from 'pinia'
import { ElNotification } from 'element-plus'
import { getStorage, setStorage } from '@libs/common/utils/cache'
import { AdminRouteEnum } from '@libs/common/enums/route'
import { CacheKeyEnum } from '@libs/common/enums/cache'
import { GET, POST } from '@libs/common/utils/request.axios'
import { getLoginStorageType } from '@libs/common/utils/base'
import { router } from '@apps/admin/router'
import { _t } from '@libs/language/index'
import { useBaseStore } from './use-base-store'
import type { IObject } from '#/global'

/**
 * @name useUserStore
 * @description 用户状态管理钩子函数
 * @returns
 */
export const useUserStore = defineStore('user', () => {
  // 保持登录状态标识
  const stayLogin = ref<boolean>(
    getStorage(CacheKeyEnum.STAY_LOGIN, { type: 'local' }) || false,
  )

  // 令牌
  const token = ref<string | null>(
    getStorage(CacheKeyEnum.TOKEN, {
      type: getLoginStorageType(),
    }) || '',
  )

  // 用户资料
  const profile = ref<IObject>(
    getStorage(CacheKeyEnum.PROFILE, {
      type: getLoginStorageType(),
    }) || {},
  )

  // 用户权限
  const roles = ref<Array<string>>(
    getStorage(CacheKeyEnum.ROLES, {
      type: getLoginStorageType(),
    }) || [],
  )

  // 登录状态标记
  const isLogin = computed(() => (!!token.value))

  // 缓存是否保持登录状态
  const setStayLogin = (state: boolean): void => {
    stayLogin.value = state
    setStorage(CacheKeyEnum.STAY_LOGIN, state, {
      type: 'local',
    })
  }

  // 缓存令牌
  const setToken = (_token: string): void => {
    token.value = _token
    setStorage(CacheKeyEnum.TOKEN, _token, { type: getLoginStorageType() })
  }

  // 缓存用户资料
  const setProfile = (data: IObject): void => {
    profile.value = data
    setStorage(CacheKeyEnum.PROFILE, data, {
      type: getLoginStorageType(),
    })
  }

  // 缓存系统用户权限
  const setRoles = (data: Array<string>): void => {
    roles.value = data
    setStorage(CacheKeyEnum.ROLES, data, {
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

  // 用户退出
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
