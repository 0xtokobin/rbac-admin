<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { MOBILE } from '@kaivanwong/utils'
import { MobileCodeTypeEnum, StorageEnum } from '@/constants/enums'
import { getStorage } from '@/utils/storage'
import { useCountDown } from '@/hooks/use-count-down'
import { useUserStore } from '@/hooks/use-user-store'

const { t } = useI18n()

const countDown = useCountDown()

const formRef = ref<FormInstance>()

interface Form {
  areaCode: string
  mobile: string
  code: string
  remember: boolean
  type: number
}

const form = ref<Form>({
  areaCode: '+86',
  mobile: '',
  code: '',
  remember: false,
  type: 1,
})

const formRules = reactive<FormRules>({
  mobile: [
    {
      required: true,
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
      required: true,
      message: t('crud.placeholder.enter', {
        label: t('crud.mobile.codeText'),
      }),
      trigger: 'change',
    },
    {
      len: 6,
      message: t('crud.placeholder.formatIncorrect', {
        label: t('crud.mobile.codeText'),
      }),
      trigger: 'blur',
    },
  ],
})

const mobileAreaCodeList = getStorage(StorageEnum.MOBILE_AREA_CODE)

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
    <el-form-item prop="mobile">
      <el-input v-model.number="form.mobile" autocomplete="off" :placeholder="t('crud.mobile.mobile')">
        <template #prepend>
          <el-select v-model="form.areaCode" important="w-24">
            <el-option v-for="(item, index) in mobileAreaCodeList" :key="index" :label="item.code" :value="item.code" />
          </el-select>
        </template>
        <template #prefix>
          <el-icon>
            <Iphone />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="code" mb-2>
      <el-input v-model="form.code" autocomplete="off" :placeholder="t('crud.mobile.code')">
        <template #prefix>
          <el-icon>
            <ChatDotSquare />
          </el-icon>
        </template>
        <template #suffix>
          <el-button
            inline-block p-0 link type="primary" :disabled="countDown.countDownForm.getting" @click="
              countDown.getMobileCode(
                form.mobile,
                MobileCodeTypeEnum.FORGET_PASSWORDS,
              )
            "
          >
            <span v-if="countDown.countDownForm.getting" text-3>
              {{
                t('crud.mobile.retrieve', {
                  time: countDown.countDownForm.time,
                })
              }}
            </span>
            <span v-else text-3>
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
    <el-form-item mb-2>
      <el-button type="primary" w="100%" :loading="loading" @click="login(formRef)">
        <span text="3.6" font-600>{{ t('app.login.login') }}</span>
      </el-button>
    </el-form-item>
  </el-form>
</template>
