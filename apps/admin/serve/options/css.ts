import type { CSSOptions } from 'vite'

export const useCssOptions = (): CSSOptions | undefined => {
  const cssOptions: CSSOptions | undefined = {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@libs/common/styles/element-plus.scss" as *;',
      },
    },
  }
  return cssOptions
}
