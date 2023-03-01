import type { ResponseData } from '@/utils/request/index.d'
import { GET } from '@/utils/request'

export const getServiceInfo = <T>(): Promise<
  any | ResponseData<T> | undefined
> => {
  return GET('/common/service/info')
}
