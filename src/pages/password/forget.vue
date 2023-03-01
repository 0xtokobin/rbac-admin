<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import SignTemplate from '../components/sign-template.vue'
import ChangePassword from './components/change-password.vue'
import VerifyMobilePhone from './components/verify-mobile-phone.vue'
import { useSystemStore } from '@/hooks/use-store/use-system-store'
import { RouteEnum } from '@/constants/enums'
import type { IObject } from '#/global.d'

const { t } = useI18n()

const router = useRouter()

const systemStore = useSystemStore()

const forgetType = ref<string>('verify')
onBeforeMount(() => {
  forgetType.value = 'verify'
})

const changeResetType = (type: string): void => {
  forgetType.value = type
}

const verifyHandle = (e: IObject): void => {
  if (e.status)
    changeResetType('change')
}

const changeHandle = (e: IObject): void => {
  if (e.status)
    ElMessage.success(t('password.success'))
}

const goSignin = (): void => {
  router.replace({ path: RouteEnum.ROUTE_LOGIN })
}
</script>

<template>
  <SignTemplate>
    <template #title>
      <div v-if="forgetType === 'verify'">
        <div mb-4 text-6 font-600 style="color: var(--el-color-info-light)">
          {{ t('password.forget') }}
        </div>
        <div
          font-500
          style="color: var(--el-text-color-secondary); font-size: 14px"
        >
          {{ t('password.forgetDescription') }}
        </div>
      </div>
      <div v-if="forgetType === 'change'">
        <div mb-4 text-6 font-600 style="color: var(--el-color-info-light)">
          {{ t('password.create') }}
        </div>
        <div
          font-500
          style="color: var(--el-text-color-secondary); font-size: 14px"
        >
          {{ t('password.createDescription') }}
        </div>
      </div>
    </template>
    <template #form>
      <VerifyMobilePhone
        v-if="forgetType === 'verify'"
        @verify="verifyHandle"
      />
      <ChangePassword
        v-if="forgetType === 'change'"
        @change="changeHandle"
      />
      <div p-t-20 flex items-center justify-center>
        <span
          text-4
          lh-1
          font-600
          pr-2
          style="color: var(--el-text-color-primary)"
        >
          {{ t('password.rememebr') }}
        </span>
        <el-button
          important="p-0 text-4 font-600"
          link
          type="primary"
          @click="goSignin"
        >
          {{ t('signin.btn') }}
        </el-button>
      </div>
    </template>
    <template v-if="systemStore.isMobile" #bottom-center>
      <div
        w-full
        text-center
        text-2
        style="color: var(--el-color-info-light-3)"
      >
        {{ t('app.copyright') }}
      </div>
    </template>
  </SignTemplate>
</template>
