/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV_MODE: string
  readonly VITE_BASE_URL: string
  readonly VITE_BUILD_GZIP: boolean
  readonly VITE_BUILD_PATH: string
  readonly VITE_BUILD_SIZE_WARNING: string
  readonly VITE_SERVER_HOST: string
  readonly VITE_SERVER_PORT: string
  readonly VITE_SERVER_HTTPS: boolean
  readonly VITE_SERVER_OPEN: boolean
  readonly WINGSCLOUD_BROWSER_TITLE: string
  readonly WINGSCLOUD_URL_REQUEST: string
  readonly WINGSCLOUD_URL_SOCKET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
