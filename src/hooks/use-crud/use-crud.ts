import type { IObject } from '#/global.d'
import type { ResponseData } from '@/utils/request/index.d'
import { mergeValueByKey } from '@/utils/common'
import { GET } from '@/utils/request'

export interface Options extends QueryOptions, Pagination { }

export interface QueryOptions {
  queryOnSetup?: boolean
  queryOnActivated?: boolean
  queryOnMounted?: boolean
  queryUrl?: string
  deleteUrl?: string
  deleteKey?: string
  exportUrl?: string
  importUrl?: string
  downloadImportTemplateUrl?: string
}

export interface Pagination {
  page?: number
  limit?: number
  total?: number
}

export const useCrud = (options?: Options) => {
  const queryOptions: QueryOptions = mergeValueByKey(
    {
      queryOnSetup: true,
      queryOnActivated: false,
      queryOnMounted: false,
      queryUrl: '',
      deleteUrl: '',
      deleteKey: '',
      exportUrl: '',
      importUrl: '',
    },
    options || {},
  )

  const pageOptions: Pagination = mergeValueByKey(
    {
      page: 1,
      limit: 10,
      total: 0,
    },
    options || {},
  )

  const loading = ref<boolean>(false)

  const queryForm = ref<IObject | any>({})

  const pageForm = ref<Pagination>(pageOptions)

  const tableData = ref<Array<any>>([])

  const query = async <T>(): Promise<any | ResponseData<T> | undefined> => {
    if (!queryOptions.queryUrl)
      return
    loading.value = true
    const res = await GET(
      queryOptions.queryUrl,
      Object.assign(queryForm.value, pageForm.value),
    )
    loading.value = false
    if (res.code === 0) {
      tableData.value = res.data.list
      pageOptions.total = res.data.total
    }
    else {
      tableData.value = []
      pageOptions.total = 0
    }
  }

  if (
    queryOptions.queryOnSetup
    && !queryOptions.queryOnActivated
    && !queryOptions.queryOnMounted
  )
    query()

  const reset = () => {
    queryForm.value = {}
    pageForm.value = pageOptions
    query()
  }

  onMounted(() => {
    if (
      !queryOptions.queryOnSetup
      && !queryOptions.queryOnActivated
      && queryOptions.queryOnMounted
    )
      query()
  })

  onActivated(() => {
    if (
      !queryOptions.queryOnSetup
      && queryOptions.queryOnActivated
      && !queryOptions.queryOnMounted
    )
      query()
  })

  return {
    queryForm,
    pageForm,
    tableData,
    loading,
    query,
    reset,
  }
}
