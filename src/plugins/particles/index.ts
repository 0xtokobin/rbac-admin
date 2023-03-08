import type { App } from 'vue'
import Particles from 'vue3-particles'
import { pluginAddRegister } from '../../utils/auto'

const useparticles = (app: App<Element>): void => {
  app.use(Particles)
}

export { useparticles }

export default pluginAddRegister(Particles)
