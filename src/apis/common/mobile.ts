import type { ResponseData } from '@/utils/request/index.d'
import { GET } from '@/utils/request'

interface MobileCodeParams {
  mobile: string | number
  type: number
}

export const getMobileSmscode = <T>(
  params: MobileCodeParams,
): Promise<any | ResponseData<T> | undefined> => {
  return GET('/common/mobile/smscode', params)
}

export const getMobileCodes = <T>(): Promise<
  any | ResponseData<T> | undefined
> => {
  return GET('/common/mobile/codes')
}
