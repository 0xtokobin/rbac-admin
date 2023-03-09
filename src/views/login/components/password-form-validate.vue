<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { MOBILE } from '@kaivanwong/utils'
import type { MobileForm } from '#/login'
import type { IObject } from '#/global'
import { MobileCodeTypeEnum, StorageEnum } from '@/constants/enums'
import { useCountDown } from '@/hooks/use-count-down'
import { getStorage } from '@/utils/storage'
import { POST } from '@/utils/request'

const emit = defineEmits(['validate'])

const { t } = useI18n()

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
      required: validateForm.value.mobile.length > 0,
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
})

const mobileAreaCodeList = getStorage(StorageEnum.MOBILE_AREA_CODE)

const validate = async (formEl: FormInstance | undefined): Promise<void> => {
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
      <el-input v-model.number="validateForm.mobile" autocomplete="off" :placeholder="t('crud.mobile.mobile')">
        <template #prepend>
          <el-select v-model="validateForm.areaCode" important="w-24">
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
    <el-form-item v-show="validateForm.mobile" prop="code">
      <el-input v-model="validateForm.code" autocomplete="off" :placeholder="t('crud.mobile.code')">
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
    <el-form-item>
      <el-button type="primary" w="100%" @click="validate(validateFormRef)">
        <span font-600> {{ t('app.password.security') }}</span>
      </el-button>
    </el-form-item>
  </el-form>
</template>
