import type { ServerOptions } from 'vite'
import { serverProxy } from '../proxy'

export const useServerOptions = (
  env: Record<string, string>,
): ServerOptions | undefined => {
  const serverOptions: ServerOptions | undefined = {
    host: env.VITE_SERVER_HOST,
    open: env.VITE_SERVER_OPEN === 'true',
    port: Number(env.VITE_SERVER_PORT),
    https: env.VITE_SERVER_HTTPS === 'true',
    proxy: serverProxy(env),
  }
  return serverOptions
}
