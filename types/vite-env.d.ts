/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV_MODE: string
  readonly VITE_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare const __APP_TITLE__: string
declare const __APP_VERSION__: string
declare const __APP_REQUEST_URL__: string
declare const __APP_REQUEST_PREFIX__: string
declare const __APP_SOCKET_URL__: string
declare const __APP_SOCKET_PREFIX__: string
