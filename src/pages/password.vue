<script lang="ts" setup>
import PasswordFormValidate from './components/password-form-validate.vue'
import PasswordFormReset from './components/password-form-reset.vue'
import PasswordFormResult from './components/password-form-result.vue'
import type { IObject } from '#/global'

const { t } = useI18n()

const step = ref<string>('validate')

const validate = (e: IObject): void => {
  console.warn(e)
  if (e.status)
    step.value = 'reset'
}

const reset = (e: IObject): void => {
  if (e.status)
    step.value = 'result'
}
</script>

<template>
  <el-card box-border w-xs m-auto my-20 shadow="never" important="border-none">
    <div v-if="step === 'validate'" mt-4 mb-8 text-6 font-600 style="color: var(--el-color-info-light)">
      {{ t('app.password.reset') }}
    </div>
    <div v-if="step === 'reset'" mt-4 mb-8 text-6 font-600 style="color: var(--el-color-info-light)">
      {{ t('app.password.reset') }}
    </div>
    <PasswordFormValidate v-if="step === 'validate'" @validate="validate" />
    <PasswordFormReset v-if="step === 'reset'" @reset="reset" />
    <PasswordFormResult v-if="step === 'result'" />
  </el-card>
</template>
