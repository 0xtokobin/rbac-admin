<script lang="ts" setup>
import { useBaseStore } from '@apps/admin/stores/use-base-store'
import { LayoutEnum, RouteEnum } from '@libs/common/enums/base'

const { t } = useI18n()

const router = useRouter()

const baseStore = useBaseStore()
</script>

<template>
  <div cursor-pointer flex justify-center items-center @click="router.push({ path: RouteEnum.ROUTE_FIRST })">
    <img h="4.6" src="@/assets/svg/logo.svg">
    <transition name="el-zoom-in-center">
      <div
        v-show="baseStore.layout !== LayoutEnum.LAYOUT_SIDE || !baseStore.collapse" text="4.2" font-600 ml-4
        single-line-omitted
      >
        {{ t('base.name') }}
      </div>
    </transition>
  </div>
</template>
