<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { PASSWORD_NORMAL, USERNAME } from '@kaivanwong/utils'
import { useUserStore } from '@apps/admin/stores/use-user-store'
import { GET, type ResponseData } from '@libs/common/utils/request.axios'

const emit = defineEmits(['password'])

const { t } = useI18n()

const formRef = ref<FormInstance>()

interface Form {
  username: string
  password: string
  remember: boolean
  type: number
}

const form = ref<Form>({
  username: 'admin',
  password: 'wingscloud',
  remember: false,
  type: 0,
})

const validateUsername = (rule: any, value: string, callback: any) => {
  if (value && !USERNAME.test(value)) {
    callback(
      new Error(
        t('base.placeholder.formatIncorrect', {
          label: t('base.account.usernameText'),
        }),
      ),
    )
  }
  else if (value && USERNAME.test(value)) {
    GET('/system/user/validate', { value, type: 0 }).then(({ data }: ResponseData) => {
      if (data.validateResult)
        callback()
      else
        callback(new Error(t('base.authentication.notFound')))
    })
  }
}

const formRules = reactive<FormRules>({
  username: [
    {
      required: true,
      message: t('base.placeholder.enter', {
        label: t('base.account.usernameText'),
      }),
      trigger: 'change',
    },
    { validator: validateUsername, trigger: 'blur' },
  ],
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
})

const password = (): void => {
  emit('password')
}

const loading = ref<boolean>(false)

const userStore = useUserStore()

const login = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl)
    return
  await formEl.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true
      await userStore.login(form.value)
      loading.value = false
    }
  })
}
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="formRules" size="large">
    <el-form-item prop="username">
      <el-input v-model="form.username" autocomplete="off" :placeholder="t('base.account.username')">
        <template #prefix>
          <el-icon>
            <User />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="form.password" type="password" autocomplete="off" show-password
        :placeholder="t('base.account.password')"
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
        <el-checkbox
          v-model="form.remember" inline-block text-3 style="color: var(--el-color-info-light-3)"
          :label="t('base.login.keep')"
        />
        <el-button inline-block p-0 link type="info" @click="password">
          <span text-3 style="color: var(--el-text-color-regular)">
            {{ t('base.password.forget') }}
          </span>
        </el-button>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" w-full :loading="loading" @click="login(formRef)">
        <span font-600>{{ t('base.login.login') }}</span>
      </el-button>
    </el-form-item>
  </el-form>
</template>
