import { StorageEnum } from '@/constants/enums'
import { setStorage } from '@/utils/storage'
import { GET } from '@/utils/request'

export const useMobileCodes = () => {
  const getMobileCodes = async () => {
    const { data } = await GET('/common/mobile/areacode')
    setStorage(StorageEnum.MOBILE_AREA_CODE, data)
    return data
  }
  return {
    getMobileCodes,
  }
}
