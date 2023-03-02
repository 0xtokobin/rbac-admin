<script lang="ts" setup>
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
  <el-card box-border w-xs m-auto my-20 shadow="never" important="border-none">
    <div mt-4 mb-8 text-6 font-600 style="color: var(--el-color-info-light)">
      {{ t('app.login.login') }}
    </div>
    <LoginFormNormal v-if="type === 'normal'" />
    <LoginFormSms v-if="type === 'sms'" />
    <LoginFormScan v-if="type === 'scan'" />
    <el-divider>
      <span text-3 style="color: var(--el-text-color-primary)">
        {{ t('app.login.or') }}
      </span>
    </el-divider>
    <div w="100%" flex justify-between items-center>
      <el-button v-if="type !== 'normal'" w="45%" size="large" @click="changeType('normal')">
        <span text-3 font-600>{{ t('app.login.normal') }}</span>
      </el-button>
      <el-button v-if="type !== 'sms'" w="46%" size="large" @click="changeType('sms')">
        <span text-3 font-600> {{ t('app.login.sms') }}</span>
      </el-button>
      <el-button v-if="type !== 'scan'" w="46%" size="large" @click="changeType('scan')">
        <span text-3 font-600> {{ t('app.login.scan') }}</span>
      </el-button>
    </div>
  </el-card>
</template>
