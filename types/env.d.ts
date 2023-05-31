/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV_MODE: string
  readonly VITE_BASE_URL: string
  readonly APP_BROWSER_TITLE: string
  readonly APP_REQUEST_URL: string
  readonly APP_REQUEST_PREFIX: string
  readonly APP_SOCKET_URL: string
  readonly APP_SOCKET_PREFIX: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
