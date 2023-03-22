export interface IObject<T = any> {
  [key: string]: T
}

export interface IFunction<T = any> {
  (x?: any): T
}

export interface ResponseData<T = any | null> {
  code: number
  msg: string
  data: T
}

export type Callback = (data?: any) => void


