import type { ComputedRef } from 'vue'
import type { IObject } from '#/global'
import { StorageKeyEnum } from '@/enum'
import { getStorage, setStorage } from '@/utils/storage'
import { GET } from '@/utils/request'

export const useDict = () => {
  const getDictList = async () => {
    const { data } = await GET('/system/dict/list')
    let dict = {}
    data.forEach((item: IObject) => {
      dict = { [item.key]: item.values, ...dict }
    })
    setStorage(StorageKeyEnum.DICT, dict)
    return data
  }

  const getDictItem = (key: string): ComputedRef<any> => {
    return computed(() => {
      const data = getStorage(StorageKeyEnum.DICT)[key]
      if (!data)
        getDictList()

      return data || []
    })
  }

  const getDict = (key: string, value: string, getKey?: string) => {
    if (
      key === undefined
      || key === null
      || value === undefined
      || value === null
    )
      return
    getKey = getKey || 'label'
    const dictionaryData = getDictItem(key).value
    if (dictionaryData && dictionaryData.length > 0) {
      const data = dictionaryData.find((item: IObject) => item.value === value)[
        getKey
      ]
      return data || value
    }
    else {
      return value
    }
  }

  return {
    getDictList,
    getDictItem,
    getDict,
  }
}
