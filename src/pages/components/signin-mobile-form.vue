<script lang="ts" setup>
import type { FormRules, FormInstance } from 'element-plus';
import type { LoginMobileForm } from '@/pages/sign.d';
import { StorageEnum, MobileCodeTypeEnum } from '@/constants/enums';
import { MOBILE } from '@kaivanwong/utils';
import { getStorage } from '@/utils/storage';
import { useCountDown } from '@/hooks/use-crud/use-count-down';

defineOptions({
  name: 'SignMobileForm',
});

const { t } = useI18n();

const countDown = useCountDown();

const formRef = ref<FormInstance>();

const form = ref<LoginMobileForm>({
  areaCode: '+86',
  mobile: '',
  code: '',
  remember: false,
  type: 1,
});

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
      type: 'number',
      min: 6,
      max: 6,
      message: t('crud.placeholder.formatIncorrect', {
        label: t('crud.mobile.codeText'),
      }),
      trigger: 'blur',
    },
  ],
});

const mobileAreaCodeList = getStorage(StorageEnum.MOBILE_AREA_CODE);
</script>
<template>
  <el-form ref="formRef" :model="form" :rules="formRules" size="large">
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
    <el-form-item prop="code" mb-2>
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
    <el-form-item mb-2>
      <el-button type="primary" w="100%">
        <span font-600>{{ t('signin.btn') }}</span>
      </el-button>
    </el-form-item>
  </el-form>
</template>
