<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { PASSWORD_NORMAL } from '@kaivanwong/utils'
import type { PasswordForm } from '@/views/base/login'
import type { IObject } from '#/global'

const emit = defineEmits(['reset'])

const { t } = useI18n()

const changeFormRef = ref<FormInstance>()

const changeForm = ref<PasswordForm>({
  password: '',
  passwordAgain: '',
})

const validatePassword = (rule: any, value: string, callback: any) => {
  if (value && !PASSWORD_NORMAL.test(value)) {
    callback(
      new Error(
        t('base.placeholder.formatIncorrect', {
          label: t('base.account.passwordText'),
        }),
      ),
    )
  }
  else if (value && PASSWORD_NORMAL.test(value)) {
    if (value !== changeForm.value.password) {
      callback(
        new Error(
          t('base.placeholder.inconsistent', {
            label: t('base.account.passwordText'),
          }),
        ),
      )
    }
    else {
      callback()
    }
  }
}

const changeFormRules = reactive<FormRules>({
  password: [
    {
      required: true,
      message: t('base.placeholder.enter', {
        label: t('base.account.passwordText'),
      }),
      trigger: 'change',
    },
    {
      pattern: PASSWORD_NORMAL,
      message: t('base.placeholder.formatIncorrect', {
        label: t('base.account.passwordText'),
      }),
      trigger: 'blur',
    },
  ],
  passwordAgain: [
    {
      required: true,
      message: t('base.placeholder.enterAgain', {
        label: t('base.account.passwordText'),
      }),
      trigger: 'change',
    },
    {
      validator: validatePassword,
      trigger: 'blur',
    },
  ],
})

const reset = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl)
    return
  await formEl.validate(async (valid: boolean) => {
    if (valid)
      emit('reset', { status: true } as IObject)
  })
}
</script>

<template>
  <el-form
    ref="changeFormRef"
    :model="changeForm"
    :rules="changeFormRules"
    size="large"
  >
    <el-form-item prop="password">
      <el-input
        v-model="changeForm.password"
        type="password"
        autocomplete="off"
        show-password
        :placeholder="t('base.account.password')"
      >
        <template #prefix>
          <el-icon><Lock /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="passwordAgain">
      <el-input
        v-model="changeForm.passwordAgain"
        type="password"
        autocomplete="off"
        show-password
        :placeholder="t('base.account.passwordAgain')"
      >
        <template #prefix>
          <el-icon><Lock /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" w="100%" @click="reset(changeFormRef)">
        <span font-600>{{ t('base.password.reset') }}</span>
      </el-button>
    </el-form-item>
  </el-form>
</template>
