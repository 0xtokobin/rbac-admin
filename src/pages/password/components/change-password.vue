<script lang="ts" setup>
import type { FormRules, FormInstance } from 'element-plus';
import type { PasswordForm } from '@/pages/sign.d';
import type { IObject } from '@/types/global.d';
import type { InternalRuleItem, SyncValidateResult } from 'async-validator';
import { PASSWORD_NORMAL } from '@kaivanwong/utils';

defineOptions({
  name: 'ChangePassword',
});

const { t } = useI18n();

const changeFormRef = ref<FormInstance>();

const changeForm = ref<PasswordForm>({
  password: '',
  passwordAgain: '',
});

const validatePassword = (
  rule: InternalRuleItem,
  value: string,
  callback: (error?: string | Error | undefined) => void
): void | SyncValidateResult => {
  if (value && !PASSWORD_NORMAL.test(value)) {
    callback(
      new Error(
        t('crud.placeholder.formatIncorrect', {
          label: t('crud.account.passwordText'),
        })
      )
    );
  } else if (value && PASSWORD_NORMAL.test(value)) {
    if (value !== changeForm.value.password) {
      callback(
        new Error(
          t('crud.placeholder.inconsistent', {
            label: t('crud.account.passwordText'),
          })
        )
      );
    } else {
      callback();
    }
  }
};

const changeFormRules = reactive<FormRules>({
  password: [
    {
      required: true,
      message: t('crud.placeholder.enter', {
        label: t('crud.account.passwordText'),
      }),
      trigger: 'change',
    },
    {
      pattern: PASSWORD_NORMAL,
      message: t('crud.placeholder.formatIncorrect', {
        label: t('crud.account.passwordText'),
      }),
      trigger: 'blur',
    },
  ],
  passwordAgain: [
    {
      required: true,
      message: t('crud.placeholder.enterAgain', {
        label: t('crud.account.passwordText'),
      }),
      trigger: 'change',
    },
    {
      validator: validatePassword,
      trigger: 'blur',
    },
  ],
});

const emit = defineEmits(['change']);

const change = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl) return;
  await formEl.validate(async (valid: boolean) => {
    if (valid) {
      emit('change', { status: true } as IObject);
    }
  });
};
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
        :placeholder="t('crud.account.password')"
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
        :placeholder="t('crud.account.passwordAgain')"
      >
        <template #prefix>
          <el-icon><Lock /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" w="100%" @click="change(changeFormRef)">
        <span font-600>{{ t('password.btn') }}</span>
      </el-button>
    </el-form-item>
  </el-form>
</template>
