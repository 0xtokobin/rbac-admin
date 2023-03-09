import type { I18n, I18nOptions } from 'vue-i18n'
import { createI18n } from 'vue-i18n'
import { languages, messages } from './messages'
import type { I18nT } from '#/global'
import { Settings } from '@/constants/settings'
import { getStorage } from '@/utils/storage'
import { pluginAddRegister } from '@/utils/auto'
import { StorageEnum } from '@/constants/enums'

const language: any = getStorage(StorageEnum.LANGUAGE) || Settings.Language
document
  .getElementsByTagName('html')[0]
  .setAttribute('lang', language as string)

const i18n: I18n = createI18n({
  legacy: false,
  locale: language,
  fallbackLocale: Settings.Language,
  globalInjection: true,
  useScope: 'global',
  messages,
} as I18nOptions)

const { t } = i18n.global
const _t: I18nT = t

export { messages, languages, i18n, _t }

export default pluginAddRegister(i18n)
