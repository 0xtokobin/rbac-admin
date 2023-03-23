import type { I18n, I18nOptions } from 'vue-i18n'
import { createI18n } from 'vue-i18n'
import { getStorage } from '@libs/common/utils/cache'
import { LanguageEnum } from '@libs/common/enums/base'
import { CacheKeyEnum } from '@libs/common/enums/cache'
import { messages } from './messages'
import type { I18nT } from '#libs/language/type'

const language: any = getStorage(CacheKeyEnum.LANGUAGE) || LanguageEnum.ZH_CN_ALIAS
document
  .getElementsByTagName('html')[0]
  .setAttribute('lang', language as string)

const i18n: I18n = createI18n({
  legacy: false,
  locale: language,
  fallbackLocale: LanguageEnum.ZH_CN_ALIAS,
  globalInjection: true,
  useScope: 'global',
  messages,
} as I18nOptions)

const { t } = i18n.global
const _t: I18nT = t

export { i18n, _t, language }
