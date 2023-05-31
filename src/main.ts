import { createApp } from 'vue'
import { createPinia } from 'pinia'
import particles from 'vue3-particles'
import vueDOMPurifyHTML from 'vue-dompurify-html'
import elementPlus from 'element-plus'
import * as elementPlusIconsVue from '@element-plus/icons-vue'
import App from './app.vue'
import { installComponents } from '@/utils/base'
import { i18n } from '@/plugins/vue-i18n'
import { router } from '@/plugins/vue-router'
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
  .use(elementPlus)
  .use(particles)
  .use(vueDOMPurifyHTML)
  .mount('#app', true)

installComponents(app, elementPlusIconsVue)
