import { resolve } from 'path'
import type { PluginOption } from 'vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { createHtmlPlugin } from 'vite-plugin-html'
import TsconfigPaths from 'vite-tsconfig-paths'
import EslintPlugin from 'vite-plugin-eslint'

import uni from '@dcloudio/vite-plugin-uni'

export const usePluginOption = (
  ENV: Record<string, string>,
): PluginOption[] | undefined => {
  const pluginOption: PluginOption[] | undefined = [
    uni(),
    EslintPlugin(),
    createHtmlPlugin(
      {
        inject: {
          data: {
            title: ENV.WINGSCLOUD_BROWSER_TITLE,
          },
        },
      },
    ),
    TsconfigPaths(),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/svg/')],
      symbolId: 'icon-[dir]-[name]',
    }),
    AutoImport({
      resolvers: [
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
      dirs: ['src/components'],
      dts: 'types/auto-imports.ts',
      eslintrc: {
        enabled: true,
        filepath: '.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
    }),
    Components({
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.tsx$/, /\.jsx$/],
      dirs: ['src/components'],
      dts: 'types/components.ts',
    }),
  ]

  return pluginOption
}
