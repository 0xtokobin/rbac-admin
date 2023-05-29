<script lang="ts" setup>
import { AdminRouteEnum } from '@/constants/enums'

const { t } = useI18n()

const route = useRoute()

const router = useRouter()
</script>

<template>
  <div text-center my="8vh">
    <img cursor-pointer h-22 my-10 src="@/assets/svg/logo.svg">
    <div text-12 mb-6 font-600 style="color: var(--el-color-info-dark)">
      <span v-if="!route.params.type">{{ t('base.404.title') }}</span>
      <span v-if="route.params.type === '403'">{{ t('base.403.title') }}</span>
    </div>
    <div text-4 mb-12 style="color: var(--el-color-info)">
      <span v-if="!route.params.type">{{ t('base.404.description') }}</span>
      <span v-if="route.params.type === '403'">{{ t('base.403.description') }}</span>
    </div>
    <div text-center>
      <el-button
        important="h-12 p-x-6 text-4 font-600" type="primary"
        @click="!route.params.type ? router.replace({ path: AdminRouteEnum.ROUTE_LANDING }) : router.go(-1)"
      >
        <span v-if="!route.params.type">{{ t('base.404.btn') }}</span>
        <span v-if="route.params.type === '403'">{{ t('base.403.btn') }}</span>
      </el-button>
    </div>
  </div>
</template>
