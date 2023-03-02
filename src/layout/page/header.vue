<script setup lang="ts">
import language from '../toolbar/language.vue'
import colorScheme from '../toolbar/color-scheme.vue'
import { RouteEnum } from '@/constants/enums'

const { t } = useI18n()

const router = useRouter()

const login = () => {
  router.push(RouteEnum.ROUTE_LOGIN)
}
</script>

<template>
  <div w-full h-20 flex items-center justify-between>
    <div text-5 font-600 flex flex-wrap items-center @click="login">
      <img mr-4 w-9 h-9 src="@/assets/logo.svg">
      <span>{{ t('app.name') }}</span>
    </div>
    <div flex items-center>
      <language only-icon mr-6 />
      <color-scheme />
    </div>
  </div>
</template>
