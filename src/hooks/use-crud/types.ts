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

export interface CountDownForm {
  time: number
  getting: boolean
  send: boolean
  timer: any
}
