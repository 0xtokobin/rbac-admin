import type { CSSOptions } from 'vite'

export const useCssOptions = (): CSSOptions | undefined => {
  const cssOptions: CSSOptions | undefined = {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "src/plugins/element-plus/styles/index.scss" as *;',
      },
    },
  }
  return cssOptions
}
