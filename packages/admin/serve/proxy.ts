import type { ProxyOptions } from 'vite'

export const serverProxy = (
  env: Record<string, string>,
): Record<string, string | ProxyOptions> | undefined => {
  let proxy: Record<string, string | ProxyOptions> | undefined = {}
  if (env.VITE_MODE === 'development') {
    proxy = {
      '/admin': {
        target: '/',
      },
    }
  }
  else if (env.VITE_MODE === 'staging') {
    proxy = {}
  }
  else if (env.VITE_MODE === 'production') {
    proxy = {}
  }
  return proxy
}

export const previewProxy = (
  env: Record<string, string>,
): Record<string, string | ProxyOptions> | undefined => {
  let proxy: Record<string, string | ProxyOptions> | undefined = {}
  if (env.VITE_MODE === 'development') {
    proxy = {
      '/admin': {
        target: '/',
      },
    }
  }
  else if (env.VITE_MODE === 'staging') {
    proxy = {}
  }
  else if (env.VITE_MODE === 'production') {
    proxy = {}
  }
  return proxy
}
