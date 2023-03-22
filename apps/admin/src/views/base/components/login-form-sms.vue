<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { MOBILE } from '@kaivanwong/utils'
import { getStorage } from '@libs/common/utils/cache'
import { useUserStore } from '@apps/admin/stores/use-user-store'
import { CacheKeyEnum } from '@libs/common/enums/cache'
import { useCountDown } from '@libs/common/hooks/use-count-down'

const { t } = useI18n()

const mobileAreaCode = getStorage(CacheKeyEnum .MOBILE_AREA_CODE)

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
      message: t('base.placeholder.enter', {
        label: t('base.mobile.mobileText'),
      }),
      trigger: 'change',
    },
    {
      pattern: MOBILE,
      message: t('base.placeholder.formatIncorrect', {
        label: t('base.mobile.mobileText'),
      }),
      trigger: 'blur',
    },
  ],
  code: [
    {
      required: true,
      message: t('base.placeholder.enter', {
        label: t('base.mobile.codeText'),
      }),
      trigger: 'change',
    },
    {
      len: 6,
      message: t('base.placeholder.formatIncorrect', {
        label: t('base.mobile.codeText'),
      }),
      trigger: 'blur',
    },
  ],
})

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
    <el-form-item prop="mobile">
      <el-input v-model.number="form.mobile" autocomplete="off" :placeholder="t('base.mobile.mobile')">
        <template #prepend>
          <el-select v-model="form.areaCode" important="w-24">
            <el-option v-for="(item, index) in mobileAreaCode" :key="index" :label="item.code" :value="item.code" />
          </el-select>
        </template>
        <template #prefix>
          <el-icon>
            <Iphone />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-input v-model="form.code" autocomplete="off" :placeholder="t('base.mobile.code')">
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
                1,
              )
            "
          >
            <span v-if="countDown.countDownForm.getting" text-3>
              {{
                t('base.mobile.retrieve', {
                  time: countDown.countDownForm.time,
                })
              }}
            </span>
            <span v-else text-3>
              {{
                countDown.countDownForm.send
                  ? t('base.mobile.resend')
                  : t('base.mobile.send')
              }}
            </span>
          </el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" w="100%" :loading="loading" @click="login(formRef)">
        <span text="3.6" font-600>{{ t('base.login.login') }}</span>
      </el-button>
    </el-form-item>
  </el-form>
</template>
