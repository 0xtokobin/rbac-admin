import type { ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'

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
