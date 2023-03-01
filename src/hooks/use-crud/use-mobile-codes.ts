import { StorageEnum } from '@/constants/enums'
import { setStorage } from '@/utils/storage'
import { getMobileCodes as _getMobileCodes } from '@/apis/common/mobile'

export const useMobileCodes = () => {
  const getMobileCodes = async () => {
    const { data } = await _getMobileCodes()
    setStorage(StorageEnum.MOBILE_AREA_CODE, data)
    return data
  }
  return {
    getMobileCodes,
  }
}
