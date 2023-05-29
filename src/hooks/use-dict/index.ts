import type { ComputedRef } from 'vue'
import { StorageKeyEnum } from '@/constants/enums'
import { GET } from '@/utils/request'
import { getStorage, setStorage } from '@/utils/storage'
import type { IObject } from '#/global'

export function useDict() {
  const getDictList = async () => {
    const { code, data } = await GET('/system/dict/list')
    let dict = {}
    if (code === 0) {
      data.forEach((item: IObject) => {
        dict = { [item.key]: item.values, ...dict }
      })
    }
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
