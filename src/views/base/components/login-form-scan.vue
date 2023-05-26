<script lang="ts" setup>
import { GET } from '@/utils/request'
import qrCode from '@/assets/image/qr-code.png'

const { t } = useI18n()

const timer = ref()

function clearTimer() {
  clearTimeout(timer.value)
  timer.value = null
}

function getScanResult() {
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
  <div w-full flex flex-wrap items-center justify-center mb-4>
    <el-image important-w-36 important-h-36 :src="qrCode" />
    <el-button link w-full m-y-4>
      {{ t('base.login.refresh') }}
    </el-button>
  </div>
</template>
