import zhCN from 'element-plus/dist/locale/zh-cn.mjs'
import enUS from 'element-plus/dist/locale/en.mjs'
import type { Languages, Messages } from '#/global'
import { LanguageEnum } from '@/enum'
import { autoImportLanguages } from '@/utils/common'

const languages: Languages = autoImportLanguages(
  import.meta.glob('./languages/**/*.json', {
    import: 'default',
    eager: true,
  }),
)

const messages: Messages = {
  [LanguageEnum.EN_US_ALIAS]: {
    name: LanguageEnum.EN_US_NAME,
    ...languages[LanguageEnum.EN_US_ALIAS],
    [LanguageEnum.ELEMENT_PLUS_LANGUAGE]: enUS,
  },
  [LanguageEnum.ZH_CN_ALIAS]: {
    name: LanguageEnum.ZH_CN_NAME,
    ...languages[LanguageEnum.ZH_CN_ALIAS],
    [LanguageEnum.ELEMENT_PLUS_LANGUAGE]: zhCN,
  },
}

export { messages, languages }
