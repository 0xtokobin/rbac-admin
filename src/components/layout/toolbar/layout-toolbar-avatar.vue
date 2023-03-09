<script lang="ts" setup>
import { UserFilled } from '@element-plus/icons-vue'
import { RouteEnum } from '@/constants/enums'
import { useUserStore } from '@/hooks/use-user-store'

const { t } = useI18n()

const router = useRouter()

const userStore = useUserStore()

const actionChange = (command: string): void => {
  if (command.includes('/'))
    router.push({ path: command })
  else if (command === 'signout')
    userStore.userlogout()
}
</script>

<template>
  <el-dropdown @command="actionChange">
    <el-avatar
      :size="32"
      cursor-pointer
      :src="userStore.userProfile.avatar"
      :icon="UserFilled"
    />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :command="RouteEnum.ROUTE_SYSTEM_PROFILE">
          <el-icon><User /></el-icon>
          <span>{{ t('system.profile.menuName') }}</span>
        </el-dropdown-item>
        <el-dropdown-item :command="RouteEnum.ROUTE_SYSTEM_NOTIFICATION">
          <el-icon><ChatLineRound /></el-icon>
          <span>{{ t('system.notification.menuName') }}</span>
        </el-dropdown-item>
        <el-dropdown-item :command="RouteEnum.ROUTE_SYSTEM_SETTINGS">
          <el-icon><Setting /></el-icon>
          <span>{{ t('system.setting.menuName') }}</span>
        </el-dropdown-item>
        <el-dropdown-item command="signout">
          <el-icon><SwitchButton /></el-icon>
          <span>{{ t('app.toolbar.avatar.signout') }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
