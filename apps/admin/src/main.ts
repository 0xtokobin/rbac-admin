import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Particles from 'vue3-particles'
import VueDOMPurifyHTML from 'vue-dompurify-html'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { i18n } from '@libs/language/src/main'
import { installComponents } from '@libs/common/utils/base'
import { router } from '@apps/admin/router'
import App from './app.vue'
import 'virtual:svg-icons-register'
import 'element-plus/theme-chalk/src/message.scss'
import 'element-plus/theme-chalk/src/notification.scss'
import '@libs/common/styles/reset.scss'
import '@libs/common/styles/common.scss'
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
