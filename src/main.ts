import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Particles from 'vue3-particles'
import VueDOMPurifyHTML from 'vue-dompurify-html'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './app.vue'
import { installComponents } from '@/utils/base'
import { i18n } from '@/i18n'
import { router } from '@/router'
import 'virtual:svg-icons-register'
import 'element-plus/theme-chalk/src/message.scss'
import 'element-plus/theme-chalk/src/notification.scss'
import '@/assets/style/reset.scss'
import '@/assets/style/common.scss'
import 'uno.css'

const app = createApp(App)

app
  .use(i18n)
  .use(createPinia())
  .use(router)
  .use(ElementPlus)
  .use(Particles)
  .use(VueDOMPurifyHTML)
  .mount('#app', true)

installComponents(app, ElementPlusIconsVue)
