import type { IObject } from '#/global'

export interface Languages<T = any> {
  [key: string]: T
}

export interface Messages<T = any> {
  [key: string]: T
}

export type I18nT = (key: string, params?: IObject | Array<string>) => string
