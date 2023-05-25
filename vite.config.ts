import { resolve } from 'path'
import type { ConfigEnv, ProxyOptions } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { createHtmlPlugin } from 'vite-plugin-html'
import ViteCompression from 'vite-plugin-compression'
import TsconfigPaths from 'vite-tsconfig-paths'
import EslintPlugin from 'vite-plugin-eslint'
import Vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import {
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default ({ command, mode }: ConfigEnv) => {
  const env: Record<string, string> = loadEnv(mode, './', [
    'VITE_',
    'WINGSCLOUD_',
  ])

  const proxy: Record<string, string | ProxyOptions> | undefined = {}

  return defineConfig({
    base: env.VITE_BASE_URL,
    envDir: './',
    define: {
      'process.env': env,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/style/element-plus.scss" as *;',
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(process.cwd(), 'src'),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    plugins: [
      Vue(),
      vueJsx(),
      EslintPlugin(),
      createHtmlPlugin(
        {
          inject: {
            data: {
              title: env.WINGSCLOUD_BROWSER_TITLE,
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
        imports: ['vue', 'vue-router', 'vue-i18n'],
        resolvers: [
          ElementPlusResolver(),
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
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.tsx$/, /\.jsx$/],
        dirs: ['src/components'],
        dts: 'types/components.ts',
        types: [
          {
            from: 'vue-router',
            names: ['RouterLink', 'RouterView'],
          },
        ],
      }),
      ViteCompression({
        verbose: true,
        disable: env.VITE_G_ZIP !== 'true',
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),
      Unocss({
        presets: [
          presetUno(),
          presetAttributify(),
          presetIcons({
            scale: 1.2,
            warn: true,
          }),
        ],
        transformers: [transformerDirectives(), transformerVariantGroup()],
      }),
      env.VITE_SERVER_HTTPS === 'true' ? basicSsl() : '',
    ],
    server: {
      host: env.VITE_SERVER_HOST,
      open: env.VITE_SERVER_OPEN === 'true',
      port: Number(env.VITE_SERVER_PORT),
      https: env.VITE_SERVER_HTTPS === 'true',
      proxy,
    },
    build: {
      target: 'modules',
      minify: 'esbuild',
      outDir: env.VITE_DIST_PATH,
      chunkSizeWarningLimit: Number(env.VITE_BUILD_SIZE_WARNING),
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
            if (id.includes('element-plus/theme-chalk/'))
              return 'element-plus'
          },
        },
      },
    },
  })
}
