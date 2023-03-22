import type { ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import { usePreviewOptions } from './options/preview'
import { useResolveOptions } from './options/resolve'
import { useServerOptions } from './options/server'
import { usePluginOption } from './options/plugins'
import { useBuildOptions } from './options/build'
import { useCssOptions } from './options/css'

export default ({ command, mode }: ConfigEnv) => {
  const ENV: Record<string, string> = loadEnv(mode, './scripts/admin/env/', [
    'VITE_',
    'WINGSCLOUD_',
  ])
  return defineConfig({
    base: ENV.VITE_BASE_URL,
    envDir: './scripts/admin/env/',
    define: {
      'process.env': ENV,
    },
    css: useCssOptions(),
    resolve: useResolveOptions(),
    plugins: usePluginOption(ENV),
    server: useServerOptions(ENV),
    build: useBuildOptions(ENV),
    preview: usePreviewOptions(ENV),
  })
}
