import type { CSSOptions } from 'vite'

export const useCssOptions = (): CSSOptions | undefined => {
  const cssOptions: CSSOptions | undefined = {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/assets/styles/element-plus.scss" as *;',
      },
    },
  }
  return cssOptions
}
