<script lang="ts" setup>
import SignTemplate from './components/sign-template.vue'
import SigninAccountForm from './components/signin-account-form.vue'
import SigninMobileForm from './components/signin-mobile-form.vue'
import TermsConditions from './components/terms-conditions.vue'
import { useSystemStore } from '@/hooks/use-store/use-system-store'
import { RouteEnum } from '@/constants/enums'

defineOptions({
  name: 'Signin',
})

const systemStore = useSystemStore()

const { t } = useI18n()

const route = useRoute()
const router = useRouter()

const loginType = ref<string>(
  route.params.type ? (route.params.type as string) : 'account',
)

const changeLoginType = (type: string): void => {
  loginType.value = type
}

const goSignup = (): void => {
  router.push({ path: RouteEnum.ROUTE_SIGNUP })
}
</script>

<template>
  <SignTemplate>
    <template #top-right>
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
</template>
