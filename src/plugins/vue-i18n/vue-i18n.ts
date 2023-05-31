import type { I18n } from 'vue-i18n'
import { createI18n } from 'vue-i18n'
import { messages } from './messages'
import type { I18nT } from './types'
import { getStorage } from '@/utils/storage'
import { LanguageEnum, StorageKeyEnum } from '@/constants/enums'

const locale = getStorage(StorageKeyEnum.LANGUAGE) || LanguageEnum.ZH_CN_ALIAS
document
  .getElementsByTagName('html')[0]
  .setAttribute('lang', locale)

const i18n: I18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale: LanguageEnum.ZH_CN_ALIAS,
  globalInjection: true,
  useScope: 'global',
  messages,
})

const { t } = i18n.global

const _t: I18nT = t

export { i18n, _t, locale }
