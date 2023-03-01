<script lang="ts" setup>
import LoginFormNormal from './components/login-form-normal.vue'
import LoginFormSms from './components/login-form-sms.vue'

const { t } = useI18n()

const route = useRoute()

const loginType = ref<string>(
  route.params.type ? (route.params.type as string) : 'account',
)

const changeLoginType = (type: string): void => {
  loginType.value = type
}
</script>

<template>
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
</template>

<!-- <template>
  <SignTemplate>
    <template #top-left>
      <div flex items-center>
        <span
          text-4
          lh-1
          font-600
          pr-2
          style="color: var(--el-text-color-primary)"
        >
          {{ t('signin.newUser') }}
        </span>
        <el-button
          important="text-4 p-0 font-600"
          link
          type="primary"
          @click="goSignup()"
        >
          {{ t('signin.createUser') }}
        </el-button>
      </div>
    </template>
    <template #title>
      <div mb-4 text-6 font-600 style="color: var(--el-color-info-light)">
        {{ t('signin.title', { text: t('app.name') }) }}
      </div>
      <div
        font-500
        style="color: var(--el-text-color-secondary); font-size: 14px"
      >
        {{ t('signin.administrator') }}
      </div>
    </template>
    <template #form>
      <SigninAccountForm
        v-if="loginType === 'account' || !loginType"
      />
      <SigninMobileForm v-if="loginType === 'mobile'" />
      <el-divider mt-10>
        <span text-2 style="color: var(--el-text-color-primary)">
          {{ t('signin.or') }}
        </span>
      </el-divider>
      <div mt-10 w="100%" flex justify-between items-center>
        <el-button
          v-if="loginType !== 'account'"
          w="45%"
          size="large"
          @click="changeLoginType('account')"
        >
          <span font-600>{{ t('signin.account') }}</span>
        </el-button>
        <el-button
          v-if="loginType !== 'mobile'"
          w="46%"
          size="large"
          @click="changeLoginType('mobile')"
        >
          <span font-600> {{ t('signin.mobile') }}</span>
        </el-button>
        <el-button
          v-if="loginType === 'account' || loginType === 'mobile'"
          w="46%"
          size="large"
        >
          <svg-icon show-el-width name="social-wechat" size="1rem" />
          <span font-600> {{ t('signin.wechat') }}</span>
        </el-button>
      </div>
    </template>
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
