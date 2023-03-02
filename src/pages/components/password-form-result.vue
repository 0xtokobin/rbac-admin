<script lang="ts" setup>
import { RouteEnum } from '@/constants/enums'

const { t } = useI18n()
const router = useRouter()

const login = () => {
  router.replace(RouteEnum.ROUTE_LOGIN)
}
</script>

<template>
  <div w-full flex flex-wrap items-center justify-center p-y-2>
    <el-result icon="success" :title="t('app.password.success')">
      <template #extra>
        <el-button type="primary" @click="login">
          {{ t('app.password.back') }}
        </el-button>
      </template>
    </el-result>
  </div>
</template>
