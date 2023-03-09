import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Particles from 'vue3-particles'
import VueDOMPurifyHTML from 'vue-dompurify-html'
import ElementPlus from 'element-plus'
import { registerMock } from '../mock'
import { i18n } from './i18n'
import { router } from './router'
import App from './components/app/app.vue'
import 'virtual:svg-icons-register'
import 'element-plus/theme-chalk/src/message.scss'
import 'element-plus/theme-chalk/src/notification.scss'
import './assets/theme/index.scss'
import './assets/style/index.scss'
import 'uno.css'

const app = createApp(App)

registerMock()

app
  .use(i18n)
  .use(createPinia())
  .use(ElementPlus)
  .use(router)
  .use(Particles)
  .use(VueDOMPurifyHTML)
  .mount('#app', true)
