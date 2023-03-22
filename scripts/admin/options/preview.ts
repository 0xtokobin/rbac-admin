import type { PreviewOptions } from 'vite'
import { previewProxy } from '../proxy'

export const usePreviewOptions = (
  env: Record<string, string>,
): PreviewOptions | undefined => {
  const previewOptions: PreviewOptions | undefined = {
    host: env.VITE_SERVER_HOST,
    open: env.VITE_SERVER_OPEN === 'true',
    port: Number(env.VITE_SERVER_PORT),
    https: env.VITE_SERVER_HTTPS === 'true',
    proxy: previewProxy(env),
  }
  return previewOptions
}
