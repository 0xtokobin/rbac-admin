import type { IObject } from '#/global'

export type I18nT = (key: string, params?: IObject | Array<string>) => string

export interface Languages {
  [key: string]: Record<string, string>
}
