import type { Files, Mocks } from '#libs/mock/type'

export const autoImportMocks = (files: Files): Mocks => {
  let mocks: Mocks = {}
  Object.keys(files).forEach((key) => {
    mocks = { ...mocks, ...files[key] }
  })
  return mocks
}
