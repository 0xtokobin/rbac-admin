<script lang="ts" setup>
import LoginFormNormal from './components/login-form-normal.vue'
import LoginFormSms from './components/login-form-sms.vue'
import { useSystemStore } from '@/hooks/use-store/use-system-store'
import type { ResponseData } from '@/utils/request'
import { getServiceInfo } from '@/apis/common/service'

const { t } = useI18n()

const route = useRoute()

const systemStore = useSystemStore()

const loginType = ref<string>(
  route.params.type ? (route.params.type as string) : 'account',
)

const changeLoginType = (type: string): void => {
  loginType.value = type
}

const dialogVisible = ref<boolean>(false)

const termsConditionsData = ref<string>('')

const openDialog = (): void => {
  dialogVisible.value = true
  getServiceInfo().then(({ data }: ResponseData) => {
    termsConditionsData.value = data.i18nKey ? t(data.i18nKey) : ''
  })
}
</script>

<template>
  <div>
    <el-card box-border w-xs m-auto my-20 shadow="never" important="border-none">
      <div mt-4 mb-8 text-6 font-600 style="color: var(--el-color-info-light)">
        {{ t('login.login') }}
      </div>
      <LoginFormNormal v-if="loginType === 'account' || !loginType" />
      <LoginFormSms v-if="loginType === 'mobile'" />
      <el-divider>
        <span text-3 style="color: var(--el-text-color-primary)">
          {{ t('login.or') }}
        </span>
      </el-divider>
      <div w="100%" flex justify-between items-center>
        <el-button v-if="loginType !== 'account'" w="45%" size="large" @click="changeLoginType('account')">
          <span text-3 font-600>{{ t('login.normal') }}</span>
        </el-button>
        <el-button v-if="loginType !== 'mobile'" w="46%" size="large" @click="changeLoginType('mobile')">
          <span text-3 font-600> {{ t('login.sms') }}</span>
        </el-button>
        <el-button v-if="loginType === 'account' || loginType === 'mobile'" w="46%" size="large">
          <span text-3 font-600> {{ t('login.scan') }}</span>
        </el-button>
      </div>
    </el-card>
    <div w-full>
      <div w="100%" box-border py-2 flex flex-wrap justify-center items-center>
        <span pr-2 style="color: var(--el-color-info-light-3); font-size: 14px">
          {{ t('login.readAndAgree', { label: t('login.login') }) }}
        </span>
        <el-button important="p-0" link type="primary" @click="openDialog()">
          <span style="font-size: 14px">{{ t('login.termsConditions') }}</span>
        </el-button>
      </div>
      <crud-dialog v-model="dialogVisible" :title="t('login.termsConditions')">
        <div v-dompurify-html="termsConditionsData" />
      </crud-dialog>
      <div v-if="systemStore.isMobile" text-center text-3 style="color: var(--el-color-info-light-3)">
        {{ t('app.copyright') }}
      </div>
    </div>
  </div>
</template>

<!-- <template>
    <template
      v-if="loginType === 'account' || loginType === 'mobile'"
      #bottom-center
    >
      <div w-full>
        <TermsConditions :label="t('signin.btn')" />
        <div
          v-if="systemStore.isMobile"
          text-center
          text-2
          style="color: var(--el-color-info-light-3)"
        >
          {{ t('app.copyright') }}
        </div>
      </div>
    </template>
  </SignTemplate>
</template> -->
