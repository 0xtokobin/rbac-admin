/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV_MODE: string
  readonly VITE_BASE_URL: string
  readonly WINGSCLOUD_BROWSER_TITLE: string
  readonly WINGSCLOUD_URL_REQUEST: string
  readonly WINGSCLOUD_REQUEST_PREFIX: string
  readonly WINGSCLOUD_URL_SOCKET: string
  readonly WINGSCLOUD_SOCKET_PREFIX: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
