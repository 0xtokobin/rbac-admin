import { createSSRApp } from 'vue'
import App from './components/base/app.vue'

export function createApp() {
  const app = createSSRApp(App)

  return {
    app,
  }
}
