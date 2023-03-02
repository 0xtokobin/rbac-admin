<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { PASSWORD_NORMAL, USERNAME } from '@kaivanwong/utils'
import { GET, type ResponseData } from '@/utils/request'
import { useUserStore } from '@/hooks/store/use-user-store'
import { RouteEnum } from '@/constants/enums'

const { t } = useI18n()

const router = useRouter()

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
        t('crud.placeholder.formatIncorrect', {
          label: t('crud.account.usernameText'),
        }),
      ),
    )
  }
  else if (value && USERNAME.test(value)) {
    GET('/system/user/validate', { value, type: 0 }).then(({ data }: ResponseData) => {
      if (data.validateResult)
        callback()
      else
        callback(new Error(t('app.authentication.notFound')))
    })
  }
}

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
})

const password = (): void => {
  router.push({ path: RouteEnum.ROUTE_PASSWORD_FORGET })
}

const loading = ref<boolean>(false)

const userStore = useUserStore()

const login = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl)
    return
  await formEl.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true
      await userStore.userLogin(form.value)
      loading.value = false
    }
  })
}
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="formRules" size="large">
    <el-form-item prop="username">
      <el-input v-model="form.username" autocomplete="off" :placeholder="t('crud.account.username')">
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
        <el-checkbox
          v-model="form.remember" inline-block text-3 style="color: var(--el-color-info-light-3)"
          :label="t('app.login.keep')"
        />
        <el-button inline-block p-0 link type="info" @click="password">
          <span text-3 style="color: var(--el-text-color-regular)">
            {{ t('app.password.forget') }}
          </span>
        </el-button>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" w-full :loading="loading" @click="login(formRef)">
        <span font-600>{{ t('app.login.login') }}</span>
      </el-button>
    </el-form-item>
  </el-form>
</template>
