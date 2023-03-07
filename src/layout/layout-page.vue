<script setup lang="ts">
import language from '@/layout/toolbar/language.vue'
import colorScheme from '@/layout/toolbar/color-scheme.vue'
import copyright from '@/layout/copyright/index.vue'
import { RouteEnum } from '@/constants/enums'

const router = useRouter()

const login = () => {
  router.push(RouteEnum.ROUTE_LOGIN)
}
</script>

<template>
  <el-container>
    <el-header>
      <div w-full h-20 flex items-center justify-between>
        <div text-5 font-600 flex flex-wrap items-center cursor-pointer @click="login">
          <img mr-4 w-9 h-9 src="@/assets/logo.svg">
        </div>
        <div flex items-center>
          <language only-icon mr-6 />
          <color-scheme />
        </div>
      </div>
    </el-header>
    <el-main>
      <slot name="router-view" />
    </el-main>
    <el-footer>
      <copyright />
    </el-footer>
  </el-container>
</template>
