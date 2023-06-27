import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import type { ConfigEnv } from 'vite'
import { ElementPlusResolver as elementPlusResolver } from 'unplugin-vue-components/resolvers'
import iconsResolver from 'unplugin-icons/resolver'
import icons from 'unplugin-icons/vite'
import components from 'unplugin-vue-components/vite'
import autoImport from 'unplugin-auto-import/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { createHtmlPlugin } from 'vite-plugin-html'
import viteCompression from 'vite-plugin-compression'
import mockDevServerPlugin from 'vite-plugin-mock-dev-server'
import tsconfigPaths from 'vite-tsconfig-paths'
import eslintPlugin from 'vite-plugin-eslint'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import unocss from 'unocss/vite'

export default (options: ConfigEnv) => {
  const { mode } = options

  const env: Record<string, string> = loadEnv(mode, './.vite/__env__/', [
    'VITE_',
    'APP_',
  ])

  return defineConfig({
    base: env.VITE_BASE_URL,
    envDir: './.vite/__env__/',
    define: {
      'process.env': env,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/plugins/element-plus/style.scss" as *;',
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(process.cwd(), 'src'),
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    server: {
      open: true,
      host: true,
      proxy: {},
    },
    plugins: [
      vue(),
      vueJsx(),
      eslintPlugin(),
      createHtmlPlugin(
        {
          inject: {
            data: {
              title: env.APP_TITLE,
            },
          },
        },
      ),
      tsconfigPaths(),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/svg/')],
        symbolId: 'icon-[dir]-[name]',
      }),
      icons(),
      autoImport({
        imports: ['vue', 'vue-router', 'vue-i18n', 'pinia'],
        resolvers: [
          elementPlusResolver(),
          iconsResolver({
            prefix: 'Icon',
          }),
        ],
        dirs: ['src/components'],
        dts: '.vite/auto-imports.ts',
        eslintrc: {
          enabled: true,
          filepath: '.vite/.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
      }),
      components({
        resolvers: [
          elementPlusResolver({
            importStyle: 'sass',
          }),
        ],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.tsx$/, /\.jsx$/],
        dirs: ['src/components'],
        dts: '.vite/components.ts',
        types: [
          {
            from: 'vue-router',
            names: ['RouterLink', 'RouterView'],
          },
        ],
      }),
      viteCompression({
        verbose: true,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),
      unocss(),
      mockDevServerPlugin({
        prefix: '/mock',
        wsPrefix: '/mock/ws',
        include: '.vite/__mock__/**/*.ts',
      }),
    ],
    build: {
      target: 'modules',
      minify: 'esbuild',
      outDir: 'dist',
      chunkSizeWarningLimit: 1024 * 30,
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
