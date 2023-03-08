<script lang="ts" setup>
import pkg from '../../package.json'
import LoginFormNormal from './components/login-form-normal.vue'
import LoginFormSms from './components/login-form-sms.vue'
import LoginFormScan from './components/login-form-scan.vue'
import { useSystemStore } from '@/hooks/store/use-system-store'

const { t } = useI18n()

const type = ref<string>('normal')

const changeType = (e: string): void => {
  type.value = e
}

const release = ref<string>(pkg.version)

const systemStore = useSystemStore()
</script>

<template>
  <el-card
    m-auto important-border-0
    :style="systemStore.isMobile ? 'margin-top:0vh;padding:0;width:88vw;' : 'margin-top:10vh;padding:1rem 1.5rem;width:20rem;'"
  >
    <div my-4 flex justify-center items-center>
      <img w-20 h-20 src="@/assets/logo.svg">
    </div>
    <div mb-12 text-4 font-600 text-center style="color:var(--el-color-primary);">
      <span mr-2>{{ t('app.name') }}</span>
      <span>{{ `v${release}` }}</span>
    </div>
    <LoginFormNormal v-if="type === 'normal'" />
    <LoginFormSms v-if="type === 'sms'" />
    <LoginFormScan v-if="type === 'scan'" />
    <div flex justify-between>
      <el-button v-show="type !== 'normal'" link important-m-0 @click="changeType('normal')">
        {{ t('app.login.normal') }}
      </el-button>
      <el-button v-show="type !== 'sms'" link important-m-0 @click="changeType('sms')">
        {{ t('app.login.sms') }}
      </el-button>
      <el-button v-show="type !== 'scan'" link important-m-0 @click="changeType('scan')">
        {{ t('app.login.scan') }}
      </el-button>
    </div>
  </el-card>
</template>
