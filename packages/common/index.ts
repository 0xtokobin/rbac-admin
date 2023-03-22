import { bootstrap as admin } from 'packages/admin/src/main'
import { bootstrap as oa } from 'packages/oa/src/main'

export const bootstrap = (type: string) => {
  if (type === 'admin')
    admin()
  else if (type === 'oa')
    oa()
}
