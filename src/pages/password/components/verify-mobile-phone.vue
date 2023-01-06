<script lang="ts" setup>
import type { FormRules, FormInstance } from 'element-plus';
import type { MobileForm } from '@/pages/sign.d';
import type { IObject } from '@/types/global.d';
import { StorageEnum, MobileCodeTypeEnum } from '@/constants/enums';
import { useCountDown } from '@/hooks/use-crud/use-count-down';
import { MOBILE } from '@kaivanwong/utils';
import { getStorage } from '@/utils/storage';

defineOptions({
  name: 'VerifyMobilePhone',
});

const { t } = useI18n();

const countDown = useCountDown();

const verifyFormRef = ref<FormInstance>();

const verifyForm = ref<MobileForm>({
  areaCode: '+86',
  mobile: '',
  code: '',
});

const verifyFormRules = reactive<FormRules>({
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
      required: verifyForm.value.mobile ? true : false,
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
});

const mobileAreaCodeList = getStorage(StorageEnum.MOBILE_AREA_CODE);

const emit = defineEmits(['verify']);

const verify = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl) return;
  await formEl.validate(async (valid: boolean) => {
    if (valid) {
      emit('verify', { status: true } as IObject);
    } else {
      emit('verify', { status: false } as IObject);
    }
  });
};
</script>

<template>
  <el-form
    ref="verifyFormRef"
    :model="verifyForm"
    :rules="verifyFormRules"
    size="large"
  >
    <el-form-item prop="mobile">
      <el-input
        v-model.number="verifyForm.mobile"
        autocomplete="off"
        :placeholder="t('crud.mobile.mobile')"
      >
        <template #prepend>
          <el-select v-model="verifyForm.areaCode" important="w-24">
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
    <el-form-item prop="code" v-show="verifyForm.mobile">
      <el-input
        v-model.number="verifyForm.code"
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
                verifyForm.mobile,
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
    <el-form-item>
      <el-button type="primary" w="100%" @click="verify(verifyFormRef)">
        <span font-600> {{ t('password.verify') }}</span>
      </el-button>
    </el-form-item>
  </el-form>
</template>
