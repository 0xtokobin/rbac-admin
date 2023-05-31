import zhCN from 'element-plus/dist/locale/zh-cn.mjs'
import enUS from 'element-plus/dist/locale/en.mjs'
import { languages } from './languages'
import { LanguageEnum } from '@/constants/enums'

const messages = {
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

export { messages }
