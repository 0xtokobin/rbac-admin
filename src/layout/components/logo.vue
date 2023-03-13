<script lang="ts" setup>
import { RouteEnum } from '@/enum'

const { t } = useI18n()

const router = useRouter()
</script>

<template>
  <div cursor-pointer flex justify-center items-center @click="router.push({ path: RouteEnum.ROUTE_FIRST })">
    <img h="4.6" src="@/assets/svg/logo.svg">
    <div text="4.2" font-600 ml-4 single-line-omitted>
      {{ t('app.name') }}
    </div>
  </div>
</template>
