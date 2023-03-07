import { SettingsDefault } from './settings.default'
import { SettingsReplace } from './settings.replace'
import type { SystemSettings } from '#/global'
export * from './settings.predefine'

export const Settings: SystemSettings = Object.assign(
  SettingsDefault,
  SettingsReplace,
)

export { SettingsDefault, SettingsReplace }
