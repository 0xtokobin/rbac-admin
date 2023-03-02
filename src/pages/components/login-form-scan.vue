<script lang="ts" setup>
import QRcode from '@/assets/image/qr-code.png'
import { GET } from '@/utils/request'

const { t } = useI18n()

const timer = ref()

const clearTimer = () => {
  clearTimeout(timer.value)
  timer.value = null
}

const getScanResult = () => {
  GET('/system/user/scan').then(({ code, data }) => {
    if (code === 0 && data)
      clearTimer()
  })
}

onMounted(() => {
  timer.value = setInterval(() => {
    getScanResult()
  }, 1500)
})

onUnmounted(() => {
  clearTimer()
})
</script>

<template>
  <div w-full flex flex-wrap items-center justify-center p-y-2>
    <el-image style="width:180px;height: 180px;" :src="QRcode" />
    <el-button type="text" w-full m-t-4>
      {{ t('app.login.refresh') }}
    </el-button>
  </div>
</template>
