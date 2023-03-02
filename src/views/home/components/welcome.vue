<script lang="ts" setup>
import { UserFilled } from '@element-plus/icons-vue'
import { useUserStore } from '@/hooks/store/use-user-store'
import { useSystemStore } from '@/hooks/store/use-system-store'

const { t } = useI18n()

const userStore = useUserStore()
const systemStore = useSystemStore()
</script>

<template>
  <crud-card :header="false">
    <div flex flex-wrap items-center justify-between>
      <div flex items-center>
        <el-avatar :src="userStore.userProfile.avatar" :icon="UserFilled" :size="64" mr-4 />
        <div>
          <div text-5 mb-2>
            <span>{{ t('home.workbench.welcome') }}</span>
            <span>{{ userStore.userProfile.nickname }}</span>
          </div>
          <div flex items-center style="color: var(--el-text-color-secondary); font-size: 0.92rem">
            <span pr-4>
              {{ t('home.workbench.role') }}
              {{ userStore.userProfile.roleName }}
            </span>
            <span>
              {{ t('home.workbench.department') }}
              {{ userStore.userProfile.departmentName }}
            </span>
          </div>
        </div>
      </div>
      <div flex items-center :style="systemStore.isMobile ? 'margin-top:20px' : 'margin-top:0'">
        <div pr-4>
          <div text="3.4">
            {{ t('home.workbench.notRead') }}
          </div>
          <div text-7>
            {{ 1 }}
          </div>
        </div>
        <el-divider direction="vertical" />
        <div pl-4 pr-4>
          <div text="3.4">
            {{ t('home.workbench.todoToday') }}
          </div>
          <div text-7>
            {{ 0 }}
          </div>
        </div>
        <el-divider direction="vertical" />
        <div pl-4>
          <div text="3.4">
            {{ t('home.workbench.loginTimes') }}
          </div>
          <div text-7>
            {{ 58 }}
          </div>
        </div>
      </div>
    </div>
  </crud-card>
</template>
