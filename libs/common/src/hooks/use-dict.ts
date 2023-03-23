import type { ComputedRef } from 'vue'
import { CacheKeyEnum } from '../enums/cache'
import { GET } from '../utils/request.axios'
import { getStorage, setStorage } from '../utils/cache'
import type { IObject } from '#/global'

export const useDict = () => {
  const getDictList = async () => {
    const { code, data } = await GET('/system/dict/list')
    let dict = {}
    if (code === 0) {
      data.forEach((item: IObject) => {
        dict = { [item.key]: item.values, ...dict }
      })
      setStorage(CacheKeyEnum.DICT, dict)
    }
    return data
  }

  const getDictItem = (key: string): ComputedRef<any> => {
    return computed(() => {
      const data = getStorage(CacheKeyEnum.DICT)[key]
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
