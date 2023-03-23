export interface IObject<T = any> {
  [key: string]: T
}

export interface IFunction<T = any> {
  (x?: any): T
}

export interface Files<T = any> {
  [key: string]: T
}

export type Callback = (data?: any) => void


