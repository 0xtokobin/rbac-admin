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
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  }
  return resolveOptions
}
