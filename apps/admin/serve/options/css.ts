import type { CSSOptions } from 'vite'

export const useCssOptions = (): CSSOptions | undefined => {
  const cssOptions: CSSOptions | undefined = {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "../../libs/common/src/styles/element-plus.scss" as *;',
      },
    },
  }
  return cssOptions
}
