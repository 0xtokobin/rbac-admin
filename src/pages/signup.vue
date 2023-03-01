<script lang="ts" setup>
import SignTemplate from './components/sign-template.vue'
import SignupForm from './components/signup-form.vue'
import TermsConditions from './components/terms-conditions.vue'
import { useSystemStore } from '@/hooks/use-store/use-system-store'
import { RouteEnum } from '@/constants/enums'

defineOptions({
  name: 'Signup',
})

const { t } = useI18n()

const router = useRouter()

const systemStore = useSystemStore()

const goSignin = (): void => {
  router.replace({ path: RouteEnum.ROUTE_SIGNIN })
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
          {{ t('signup.have') }}
        </span>
        <el-button
          important="text-4 p-0 font-600"
          link
          type="primary"
          @click="goSignin()"
        >
          {{ t('signin.btn') }}
        </el-button>
      </div>
    </template>
    <template #title>
      <div mb-4 text-6 font-600 style="color: var(--el-text-color-primary)">
        {{ t('signup.title', { text: t('app.name') }) }}
      </div>
    </template>
    <template #form>
      <SignupForm />
    </template>
    <template #bottom-center>
      <div w-full>
        <TermsConditions :label="t('signup.btn')" />
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
