import { autoImportLanguages } from './helper'

const languages = autoImportLanguages(
  import.meta.glob('@/languages/**/*.json', {
    import: 'default',
    eager: true,
  }),
)

export { languages }
