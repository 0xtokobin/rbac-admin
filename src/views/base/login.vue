<script lang="ts" setup>
import { setStorage } from '@/utils/cache'
import { useBaseStore } from '@/store/base'
import { CacheKeyEnum } from '@/enums/cache'
import { GET } from '@/utils/request.axios'
import { crudDialog, logo } from '@libs/common/index'
import pkg from '../../../../../package.json'
import passwordFormResult from './components/password-form-result.vue'
import passwordFormReset from './components/password-form-reset.vue'
import passwordFormValidate from './components/password-form-validate.vue'
import loginFormScan from './components/login-form-scan.vue'
import loginFormNormal from './components/login-form-normal.vue'
import loginFormSms from './components/login-form-sms.vue'
import type { IObject } from '#/global'

const { t } = useI18n()

const type = ref<string>('normal')

const changeType = (e: string): void => {
  type.value = e
}

const release = ref<string>(pkg.version)

const baseStore = useBaseStore()

const passwordVisible = ref<boolean>(false)

const passwordStep = ref<string>('validate')

const openPassword = () => {
  passwordStep.value = 'validate'
  passwordVisible.value = true
}

const validate = (e: IObject): void => {
  if (e.status)
    passwordStep.value = 'reset'
}

const reset = (e: IObject): void => {
  if (e.status)
    passwordStep.value = 'result'
}

const closePassword = () => {
  passwordVisible.value = false
  passwordStep.value = 'validate'
}

onBeforeMount(async () => {
  const { code, data } = await GET('/common/mobile/areacode')
  let mobileAreaCode = []
  if (code === 0)
    mobileAreaCode = data

  setStorage(CacheKeyEnum.MOBILE_AREA_CODE, mobileAreaCode)
})
</script>

<template>
  <el-card
    m-auto important-border-0
    :style="baseStore.isMobile ? 'margin-top:4vh;padding:0;width:88vw;' : 'margin-top:10vh;padding:1rem 1.5rem;width:20rem;'"
  >
    <div my-4 flex justify-center items-center>
      <img w-20 h-20 :src="logo">
    </div>
    <div mb-12 text-4 font-600 text-center style="color:var(--el-color-primary);">
      <span mr-2>{{ t('base.name') }}</span>
      <span>{{ `v${release}` }}</span>
    </div>
    <login-form-normal v-if="type === 'normal'" @password="openPassword" />
    <login-form-sms v-if="type === 'sms'" />
    <login-form-scan v-if="type === 'scan'" />
    <div flex justify-between>
      <el-button v-show="type !== 'normal'" link important-m-0 @click="changeType('normal')">
        {{ t('base.login.normal') }}
      </el-button>
      <el-button v-show="type !== 'sms'" link important-m-0 @click="changeType('sms')">
        {{ t('base.login.sms') }}
      </el-button>
      <el-button v-show="type !== 'scan'" link important-m-0 @click="changeType('scan')">
        {{ t('base.login.scan') }}
      </el-button>
    </div>
    <crud-dialog
      v-model="passwordVisible" :width="baseStore.isMobile ? '80vw' : '22rem'"
      :title="t('base.password.reset')" height="auto"
    >
      <password-form-validate v-if="passwordStep === 'validate'" @validate="validate" />
      <password-form-reset v-if="passwordStep === 'reset'" @reset="reset" />
      <password-form-result v-if="passwordStep === 'result'" @back="closePassword" />
    </crud-dialog>
  </el-card>
</template>
