<script lang="ts" setup>
import QRcode from '@/assets/image/qr-code.png'

const { t } = useI18n()
</script>

<template>
  <div w-full flex flex-wrap items-center justify-center p-y-2>
    <el-image style="width:180px;height: 180px;" :src="QRcode" />
    <el-button type="text" w-full m-t-4>
      {{ t('app.login.refresh') }}
    </el-button>
  </div>
</template>
