<script lang="ts" setup>
import type { FormRules, FormInstance } from 'element-plus';
import type { SignupAccountForm } from '@/pages/sign.d';
import { StorageEnum, MobileCodeTypeEnum } from '@/constants/enums';
import { useUserStore } from '@/hooks/use-store/use-user-store';
import { useCountDown } from '@/hooks/use-crud/use-count-down';
import { USERNAME, PASSWORD_NORMAL, MOBILE } from '@kaivanwong/utils';
import { getStorage } from '@/utils/storage';

defineOptions({
  name: 'SigninForm',
});

const { t } = useI18n();

const userStore = useUserStore();

const countDown = useCountDown();

const formRef = ref<FormInstance>();

const form = ref<SignupAccountForm>({
  nickname: '',
  username: '',
  areaCode: '+86',
  mobile: '',
  code: '',
  password: '',
  passwordAgain: '',
});

const validatePassword = (
  rule: any,
  value: string,
  callback: (error?: string | Error | undefined) => void
) => {
  if (value && !PASSWORD_NORMAL.test(value)) {
    callback(
      new Error(
        t('crud.placeholder.formatIncorrect', {
          label: t('crud.account.passwordText'),
        })
      )
    );
  } else if (value && PASSWORD_NORMAL.test(value)) {
    if (value !== form.value.password) {
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

const formRules = reactive<FormRules>({
  nickname: [
    {
      required: true,
      message: t('crud.placeholder.enter', {
        label: t('crud.account.nicknameText'),
      }),
      trigger: 'change',
    },
    {
      pattern: USERNAME,
      message: t('crud.placeholder.formatIncorrect', {
        label: t('crud.account.nicknameText'),
      }),
      trigger: 'blur',
    },
  ],
  username: [
    {
      required: true,
      message: t('crud.placeholder.enter', {
        label: t('crud.account.usernameText'),
      }),
      trigger: 'change',
    },
    {
      pattern: USERNAME,
      message: t('crud.placeholder.formatIncorrect', {
        label: t('crud.account.usernameText'),
      }),
      trigger: 'blur',
    },
  ],
  mobile: [
    {
      required: false,
      message: t('crud.placeholder.enter', {
        label: t('crud.mobile.mobileText'),
      }),
      trigger: 'change',
    },
    {
      pattern: MOBILE,
      message: t('crud.placeholder.formatIncorrect', {
        label: t('crud.mobile.mobileText'),
      }),
      trigger: 'blur',
    },
  ],
  code: [
    {
      required: form.value.mobile ? true : false,
      message: t('crud.placeholder.enter', { label: t('crud.mobile.code') }),
      trigger: 'change',
    },
    {
      len: 6,
      message: t('crud.placeholder.formatIncorrect', {
        label: t('crud.mobile.code'),
      }),
      trigger: 'blur',
    },
  ],
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

const mobileAreaCodeList = getStorage(StorageEnum.MOBILE_AREA_CODE);

const signupLoading = ref<boolean>(false);

const signup = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl) return;
  await formEl.validate(async (valid: boolean) => {
    if (valid) {
      signupLoading.value = true;
      await userStore.signup(form.value);
      signupLoading.value = false;
    }
  });
};
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="formRules" size="large">
    <el-form-item prop="nickname">
      <el-input
        v-model="form.nickname"
        autocomplete="off"
        :placeholder="t('crud.account.nickname')"
      >
        <template #prefix>
          <el-icon><Postcard /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="username">
      <el-input
        v-model="form.username"
        autocomplete="off"
        :placeholder="t('crud.account.username')"
      >
        <template #prefix>
          <el-icon><User /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="mobile">
      <el-input
        v-model.number="form.mobile"
        autocomplete="off"
        :placeholder="t('crud.mobile.mobile')"
      >
        <template #prepend>
          <el-select v-model="form.areaCode" important="w-24">
            <el-option
              v-for="(item, index) in mobileAreaCodeList"
              :key="index"
              :label="item.code"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </template>
        <template #prefix>
          <el-icon><Iphone /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="code" v-show="form.mobile">
      <el-input
        v-model.number="form.code"
        autocomplete="off"
        :placeholder="t('crud.mobile.code')"
      >
        <template #prefix>
          <el-icon><ChatDotSquare /></el-icon>
        </template>
        <template #suffix>
          <el-button
            inline-block
            p-0
            link
            type="primary"
            :disabled="countDown.countDownForm.getting"
            @click="
              countDown.getMobileCode(
                form.mobile,
                MobileCodeTypeEnum.FORGET_PASSWORDS
              )
            "
          >
            <span text-3 v-if="countDown.countDownForm.getting">
              {{
                t('crud.mobile.retrieve', {
                  time: countDown.countDownForm.time,
                })
              }}
            </span>
            <span text-3 v-else>
              {{
                countDown.countDownForm.send
                  ? t('crud.mobile.resend')
                  : t('crud.mobile.send')
              }}
            </span>
          </el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="form.password"
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
        v-model="form.passwordAgain"
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
    <el-form-item mb-2>
      <el-button type="primary" w="100%" @click="signup(formRef)">
        <span font-600>{{ t('signup.btn') }}</span>
      </el-button>
    </el-form-item>
  </el-form>
</template>
