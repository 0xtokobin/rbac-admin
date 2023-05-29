<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { MOBILE } from '@kaivanwong/utils'
import { getStorage } from '@/utils/storage'
import { StorageKeyEnum } from '@/constants/enums'
import { POST } from '@/utils/request/index.js'
import { useCountDown } from '@/hooks/use-count-down'
import type { MobileForm } from '@/views/base/login'
import type { IObject } from '#/global'

const emit = defineEmits(['validate'])

const { t } = useI18n()

const mobileAreaCode = getStorage(StorageKeyEnum.MOBILE_AREA_CODE)

const countDown = useCountDown()

const validateFormRef = ref<FormInstance>()

const validateForm = ref<MobileForm>({
  areaCode: '+86',
  mobile: '',
  code: '',
})

const validateFormRules = reactive<FormRules>({
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
      required: validateForm.value.mobile.length > 0,
      message: t('base.placeholder.enter', { label: t('base.mobile.code') }),
      trigger: 'change',
    },
    {
      len: 6,
      message: t('base.placeholder.formatIncorrect', {
        label: t('base.mobile.code'),
      }),
      trigger: 'blur',
    },
  ],
})

async function validate(formEl: FormInstance | undefined): Promise<void> {
  if (!formEl)
    return
  await formEl.validate(async (valid: boolean) => {
    if (valid) {
      POST('/common/mobile/smscode', { code: validateForm.value.code }).then(({ data }) => {
        if (data)
          emit('validate', { status: true } as IObject)
      })
    }
  })
}
</script>

<template>
  <el-form ref="validateFormRef" :model="validateForm" :rules="validateFormRules" size="large">
    <el-form-item prop="mobile">
      <el-input v-model.number="validateForm.mobile" autocomplete="off" :placeholder="t('base.mobile.mobile')">
        <template #prepend>
          <el-select v-model="validateForm.areaCode" important="w-24">
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
    <el-form-item v-show="validateForm.mobile" prop="code">
      <el-input v-model="validateForm.code" autocomplete="off" :placeholder="t('base.mobile.code')">
        <template #prefix>
          <el-icon>
            <ChatDotSquare />
          </el-icon>
        </template>
        <template #suffix>
          <el-button
            inline-block p-0 link type="primary" :disabled="countDown.countDownForm.getting" @click="
              countDown.getMobileCode(
                validateForm.mobile,
                2,
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
      <el-button type="primary" w="100%" @click="validate(validateFormRef)">
        <span font-600> {{ t('base.password.security') }}</span>
      </el-button>
    </el-form-item>
  </el-form>
</template>
