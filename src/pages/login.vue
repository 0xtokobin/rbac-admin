<script lang="ts" setup>
import pkg from '../../package.json'
import LoginFormNormal from './components/login-form-normal.vue'
import LoginFormSms from './components/login-form-sms.vue'
import LoginFormScan from './components/login-form-scan.vue'

const { t } = useI18n()

const type = ref<string>('normal')

const changeType = (e: string): void => {
  type.value = e
}
</script>

<template>
  <el-card box-border w-sm m-auto my-20 important-border-0 p-4>
    <div mt-10 mb-20 text-5 font-600 text-center style="color:var(--el-color-primary);">
      {{ t('app.name') }} {{ `v${pkg.version}` }}
    </div>
    <LoginFormNormal v-if="type === 'normal'" />
    <LoginFormSms v-if="type === 'sms'" />
    <LoginFormScan v-if="type === 'scan'" />
    <div flex justify-between>
      <el-button v-show="type !== 'normal'" type="text" important-m-0 @click="changeType('normal')">
        {{ t('app.login.normal') }}
      </el-button>
      <el-button v-show="type !== 'sms'" type="text" important-m-0 @click="changeType('sms')">
        {{ t('app.login.sms') }}
      </el-button>
      <el-button v-show="type !== 'scan'" type="text" important-m-0 @click="changeType('scan')">
        {{ t('app.login.scan') }}
      </el-button>
    </div>
  </el-card>
</template>
