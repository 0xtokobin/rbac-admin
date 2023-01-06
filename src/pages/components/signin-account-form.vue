<script lang="ts" setup>
import type { FormRules, FormInstance } from 'element-plus';
import type { InternalRuleItem, SyncValidateResult } from 'async-validator';
import type { LoginAccountForm } from '@/pages/sign.d';
import type { ResponseData } from '@/utils/request/index.d';
import { useUserStore } from '@/hooks/use-store/use-user-store';
import { USERNAME, PASSWORD_NORMAL } from '@kaivanwong/utils';
import { RouteEnum } from '@/constants/enums';
import { validateUsername as _validateUsername } from '@/apis/system/user';

defineOptions({
  name: 'SigninAccountForm',
});

const { t } = useI18n();

const router = useRouter();

const userStore = useUserStore();

const formRef = ref<FormInstance>();

const form = ref<LoginAccountForm>({
  username: '',
  password: '',
  remember: false,
  type: 0,
});

const validateUsername = (
  rule: InternalRuleItem,
  value: string,
  callback: (error?: string | Error | undefined) => void
): void | SyncValidateResult => {
  if (value && !USERNAME.test(value)) {
    callback(
      new Error(
        t('crud.placeholder.formatIncorrect', {
          label: t('crud.account.usernameText'),
        })
      )
    );
  } else if (value && USERNAME.test(value)) {
    _validateUsername({ username: value }).then(({ data }: ResponseData) => {
      if (data.validateResult) {
        callback();
      } else {
        callback(new Error(t('app.authentication.signup')));
      }
    });
  }
};

const formRules = reactive<FormRules>({
  username: [
    {
      required: true,
      message: t('crud.placeholder.enter', {
        label: t('crud.account.usernameText'),
      }),
      trigger: 'change',
    },
    { validator: validateUsername, trigger: 'blur' },
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
});

const goPasswordPageByForget = (): void => {
  router.push({ path: RouteEnum.ROUTE_PASSWORD_FORGET });
};

const loginLoading = ref<boolean>(false);

const login = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl) return;
  await formEl.validate(async (valid: boolean) => {
    if (valid) {
      loginLoading.value = true;
      await userStore.loginByAccount(form.value);
      loginLoading.value = false;
    }
  });
};
</script>
<template>
  <el-form ref="formRef" :model="form" :rules="formRules" size="large">
    <el-form-item prop="username">
      <el-input
        v-model="form.username"
        autocomplete="off"
        :placeholder="t('crud.account.username')"
      >
        <template #prefix>
          <el-icon>
            <User />
          </el-icon>
        </template>
        <template #suffix>
          <el-checkbox
            inline-block
            text-4
            style="color: var(--el-color-info-light-3)"
            v-model="form.remember"
            :label="t('signin.keep')"
          ></el-checkbox>
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
          <el-icon>
            <Lock />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <div w-full flex items-center justify-between>
        <el-button
          inline-block
          p-0
          link
          type="info"
          @click="goPasswordPageByForget"
        >
          <span text-4 style="color: var(--el-text-color-regular)">
            {{ t('password.forget') }}
          </span>
        </el-button>
        <el-button
          type="primary"
          w="46%"
          :loading="loginLoading"
          @click="login(formRef)"
        >
          <span font-600>{{ t('signin.btn') }}</span>
        </el-button>
      </div>
    </el-form-item>
  </el-form>
</template>
