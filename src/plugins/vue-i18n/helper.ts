import type { Languages } from './types'
import { FILE_NAME } from '@/utils/base'
import type { Files } from '#/global'

export function autoImportLanguages(files: Files): Languages {
  const languages: Languages = {}
  Object.keys(files).forEach((key: string) => {
    const languageAlias = key.split('/')[3]
    const fileName = key.replace(FILE_NAME, '$2')
    const language = languages[languageAlias] || {}
    languages[languageAlias] = {
      ...language,
      [fileName]: files[key] || {},
    }
  })
  return languages
}
