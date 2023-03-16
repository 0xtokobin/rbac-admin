import type { CSSOptions } from 'vite'

export const useCssOptions = (): CSSOptions | undefined => {
  const cssOptions: CSSOptions | undefined = {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "src/assets/style/element-plus.scss" as *;',
      },
    },
  }
  return cssOptions
}
