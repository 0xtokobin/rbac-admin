import svgIcon from './components/svg-icon.vue'
import avatarUpload from './components/upload/avatar-upload.vue'
import crudCard from './components/crud/crud-card.vue'
import crudDialog from './components/crud/crud-dialog.vue'
import crudPageForm from './components/crud/crud-page-form.vue'
import crudTableQuery from './components/crud/crud-table-query.vue'
import crudTable from './components/crud/crud-table.vue'

import qrCode from './images/qr-code.png'
import logoBlack from './images/logo-black.png'

import app from './svg/app.svg'
import logo from './svg/logo.svg'
import tree from './svg/tree.svg'

export * from './utils/base'
export * from './utils/cache'
export * from './utils/request.axios'
export * from './utils/request.code'
export * from './hooks/use-count-down'
export * from './hooks/use-crud'
export * from './hooks/use-dict'
export * from './enums/base'
export * from './enums/cache'
export * from './enums/route'

export {
  svgIcon,
  avatarUpload,
  crudCard,
  crudDialog,
  crudPageForm,
  crudTableQuery,
  crudTable,
  qrCode,
  logoBlack,
  app,
  logo,
  tree,
}
