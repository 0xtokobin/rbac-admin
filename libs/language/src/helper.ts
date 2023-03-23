import { FILE_NAME } from '@kaivanwong/utils'
import type { Files } from '#/global'
import type { Languages } from '#libs/language/type'

/**
 * @name autoImportLanguages
 * @description 自动导入国际化翻译文本
 * @returns
 */
export const autoImportLanguages = (files: Files): Languages => {
  const languages: Languages = {}
  Object.keys(files).forEach((key: string) => {
    const languageAlias = key.split('/')[2]
    const fileName = key.replace(FILE_NAME, '$2')
    const language = languages[languageAlias] || {}
    languages[languageAlias] = {
      ...language,
      [fileName]: files[key] || {},
    }
  })
  return languages
}
