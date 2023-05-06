import { FILE_NAME } from '@kaivanwong/utils'
import type { Files } from '#/global'
import type { Languages } from '#/i18n'

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
