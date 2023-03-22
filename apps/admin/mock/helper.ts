import type { Files, Mocks } from '#/global'

/**
 * @name autoImportMocks
 * @description 自动导入模拟接口文件
 * @returns
 */
export const autoImportMocks = (files: Files): Mocks => {
  let mocks: Mocks = {}
  Object.keys(files).forEach((key) => {
    mocks = { ...mocks, ...files[key] }
  })
  return mocks
}
