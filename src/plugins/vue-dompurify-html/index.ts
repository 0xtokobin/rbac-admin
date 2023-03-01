import type { App } from 'vue'
import VueDOMPurifyHTML from 'vue-dompurify-html'
import { pluginAddRegister } from '../../utils/auto'

const useVueDomPurifyHTML = (app: App<Element>): void => {
  app.use(VueDOMPurifyHTML)
}

export { useVueDomPurifyHTML }

export default pluginAddRegister(VueDOMPurifyHTML)
