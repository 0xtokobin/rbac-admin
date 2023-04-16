import { resolve } from 'path'
import type { ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { createHtmlPlugin } from 'vite-plugin-html'
import ViteCompression from 'vite-plugin-compression'
import { viteMockServe } from 'vite-plugin-mock'
import TsconfigPaths from 'vite-tsconfig-paths'
import EslintPlugin from 'vite-plugin-eslint'
import Vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import {
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { previewProxy, serverProxy } from './vite.config.proxy'

export default ({ command, mode }: ConfigEnv) => {
  const ENV: Record<string, string> = loadEnv(mode, './', [
    'VITE_',
    'WINGSCLOUD_',
  ])
  return defineConfig({
    base: ENV.VITE_BASE_URL,
    define: {
      'process.env': ENV,
    },
    resolve: {
      alias: {
        '@': resolve(process.cwd(), 'src'),
        '@libs/common': resolve(process.cwd(), './libs/common/src'),
        '@libs/language': resolve(process.cwd(), './libs/language/src'),
        '@libs/mock': resolve(process.cwd(), './libs/mock/src'),
        '@apps/admin': resolve(process.cwd(), './apps/admin/src'),
        '@apps/oa': resolve(process.cwd(), './apps/oa/src'),
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@libs/common/styles/element-plus.scss" as *;',
        },
      },
    },
    plugins: [
      Vue(),
      vueJsx(),
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
      viteMockServe({
        mockPath: './libs/mock/src/mocks/',
        localEnabled: true,
        prodEnabled: false,
        supportTs: true,
        watchFiles: true,
        logger: true,
      }),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), './libs/common/src/svg/')],
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
        dirs: ['./libs/common/src/components'],
        dts: './libs/common/src/components/auto-imports.ts',
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
        dirs: ['./libs/common/src/components'],
        dts: './libs/common/src/components/components.ts',
        types: [
          {
            from: 'vue-router',
            names: ['RouterLink', 'RouterView'],
          },
        ],
      }),
      ViteCompression({
        verbose: true,
        disable: ENV.VITE_G_ZIP !== 'true',
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
    ],
    server: {
      host: ENV.VITE_SERVER_HOST,
      open: ENV.VITE_SERVER_OPEN === 'true',
      port: Number(ENV.VITE_SERVER_PORT),
      https: ENV.VITE_SERVER_HTTPS === 'true',
      proxy: serverProxy(ENV),
    },
    preview: {
      host: ENV.VITE_SERVER_HOST,
      open: ENV.VITE_SERVER_OPEN === 'true',
      port: Number(ENV.VITE_SERVER_PORT),
      https: ENV.VITE_SERVER_HTTPS === 'true',
      proxy: previewProxy(ENV),
    },
    build: {
      target: 'modules',
      minify: 'esbuild',
      outDir: ENV.VITE_DIST_PATH,
      chunkSizeWarningLimit: Number(ENV.VITE_BUILD_SIZE_WARNING),
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
