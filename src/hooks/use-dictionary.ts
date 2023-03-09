import type { ComputedRef } from 'vue'
import type { IObject } from '#/global'
import { StorageEnum } from '@/constants/enums'
import { getStorage, setStorage } from '@/utils/storage'
import { GET } from '@/utils/request'

export const useDictionary = () => {
  const getDictionaryAll = async () => {
    const { data } = await GET('/system/dict/list')
    let dictionaries = {}
    data.forEach((item: IObject) => {
      dictionaries = { [item.key]: item.values, ...dictionaries }
    })
    setStorage(StorageEnum.DICTIONARY, dictionaries)
    return data
  }

  const getDictionaryData = (key: string): ComputedRef<any> => {
    return computed(() => {
      const data = getStorage(StorageEnum.DICTIONARY)[key]
      if (!data)
        getDictionaryAll()

      return data || []
    })
  }

  const getDictionary = (key: string, value: string, getKey?: string) => {
    if (
      key === undefined
      || key === null
      || value === undefined
      || value === null
    )
      return
    getKey = getKey || 'label'
    const dictionaryData = getDictionaryData(key).value
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
    getDictionaryAll,
    getDictionaryData,
    getDictionary,
  }
}
