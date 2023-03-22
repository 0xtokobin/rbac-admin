import { resolve } from 'path'
import type { AliasOptions, ResolveOptions } from 'vite'

export const useResolveOptions = ():
| (ResolveOptions & {
  alias?: AliasOptions | undefined
})
| undefined => {
  const resolveOptions:
  | (ResolveOptions & {
    alias?: AliasOptions | undefined
  })
  | undefined = {
    alias: {
      '@': resolve(process.cwd(), 'src'),
      '@libs/common': resolve(process.cwd(), '../../libs/common/src'),
      '@libs/language': resolve(process.cwd(), '../../libs/language/src'),
      '@libs/mock': resolve(process.cwd(), '../../libs/mock/src'),
      '@apps/admin': resolve(process.cwd(), '../../apps/admin/src'),
      '@apps/oa': resolve(process.cwd(), '../../apps/oa/src'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  }
  return resolveOptions
}
