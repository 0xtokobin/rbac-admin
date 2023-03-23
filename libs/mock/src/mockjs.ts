import Mock from 'mockjs'
import { autoImportMocks } from './helper'
import type { ResponseData } from '#libs/common/request'
import type { Mocks } from '#libs/mock/type'

Mock.setup({
  timeout: '300-600',
})

const mocks: Mocks = autoImportMocks(
  import.meta.glob('./modules/**/*.ts', {
    import: 'default',
    eager: true,
  }),
)

const registerMock = (): void => {
  Object.keys(mocks).forEach((key: string) => {
    Mock.mock(
      new RegExp(mocks[key].url),
      mocks[key].method,
      <T>(data: any): ResponseData<T> => {
        let res: ResponseData<T> = {
          code: 0,
          msg: 'success',
          data: mocks[key].data,
        }
        if (mocks[key].response)
          res = mocks[key].response(data, res)

        return res
      },
    )
    console.warn(Mock)
  })
}

export { mocks, registerMock }
