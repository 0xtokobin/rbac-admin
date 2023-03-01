import type { App } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { installComponents, pluginAddRegister } from '../../utils/auto'

const useElementPlusIcons = (app: App<Element>): void => {
  installComponents(app, ElementPlusIconsVue)
}

const useElementPlus = (app: App<Element>): void => {
  app.use(ElementPlus)
}

export { useElementPlusIcons, useElementPlus }

export default pluginAddRegister(ElementPlus)
