import { interceptJointData } from '@libs/common/index'
import type { MockMethod } from 'vite-plugin-mock'
import { code } from '../data/mobile-code'
import type { IObject } from '#/global'
import type { ResponseData } from '#libs/common/request'

export default [
  {
    url: '/common/mobile/smscode',
    method: 'get',
    data: '',
  },
  {
    url: '/common/mobile/smscode',
    method: 'post',
    data: true,
    response: <T>(data: IObject, res: ResponseData<T>) => {
      if (interceptJointData(data.body).code.length !== 6) {
        return {
          ...res,
          code: 10040,
          msg: null,
          data: '',
        }
      }
      return res
    },
  },
  {
    url: '/common/mobile/areacode',
    method: 'get',
    response: <T>(data: IObject, res: ResponseData<T>) => {
      return {
        code: 0,
        msg: null,
        data: code,
      }
    },
  },
] as MockMethod[]
