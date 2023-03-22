import { defineConfig, loadEnv } from 'vite'
import type { ConfigEnv } from 'vite'
import { usePluginOption } from './options/plugins'

export default ({ command, mode }: ConfigEnv) => {
  const ENV: Record<string, string> = loadEnv(mode, './serve/env/', [
    'VITE_',
    'WINGSCLOUD_',
  ])
  return defineConfig({
    base: ENV.VITE_BASE_URL,
    envDir: './scripts/oa/env/',
    define: {
      'process.env': ENV,
    },
    plugins: usePluginOption(ENV),
  })
}
