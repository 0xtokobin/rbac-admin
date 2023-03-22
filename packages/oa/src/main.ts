import { createSSRApp } from 'vue'
import App from './components/base/app.vue'

export const bootstrap = () => {
  const app = createSSRApp(App)

  return {
    app,
  }
}
