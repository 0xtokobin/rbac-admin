import Mock from 'mockjs'
import type { ResponseData } from '../../utils/request/index.d'
import { autoImportMocks } from '../../utils/auto'
import type { Mocks } from './index.d'

Mock.setup({
  timeout: '100-300',
})

const mocks: Mocks = autoImportMocks(
  import.meta.glob('./modules/**/*.ts', {
    import: 'default',
    eager: true,
  }),
)

const useMock = (): void => {
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
  })
}

export { mocks, useMock }
