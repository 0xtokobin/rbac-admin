import type { App } from 'vue'
import type { Pinia } from 'pinia'
import { createPinia } from 'pinia'
import { pluginAddRegister } from '../../utils/auto'

const pinia: Pinia = createPinia()

const usePinia = (app: App<Element>): void => {
  app.use(pinia)
}

export { pinia, usePinia }

export default pluginAddRegister(pinia)
