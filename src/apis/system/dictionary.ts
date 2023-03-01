import type { ResponseData } from '@/utils/request/index.d'
import { GET } from '@/utils/request'

export const getDictionaryAll = <T>(): Promise<
  any | ResponseData<T> | undefined
> => {
  return GET('/system/dictionary/all')
}
