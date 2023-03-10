<script lang="ts" setup>
import { UserFilled } from '@element-plus/icons-vue'
import { useUserStore } from '@/hooks/use-user-store'
import { useLanguage } from '@/hooks/use-language'

const { changeLanguage, currentLanguage, languages } = useLanguage()

const { t } = useI18n()

const router = useRouter()

const userStore = useUserStore()

const actionChange = (command: string): void => {
  if (command.includes('/'))
    router.push({ path: command })
  else if (command === 'signout')
    userStore.userlogout()
}

const personalDrawerVisible = ref<boolean>(false)

const openPersonalDrawer = () => {
  personalDrawerVisible.value = true
}
</script>

<template>
  <el-avatar
    :size="32" cursor-pointer :src="userStore.userProfile.avatar" :icon="UserFilled"
    @click="openPersonalDrawer"
  />
  <el-drawer v-model="personalDrawerVisible" :title=" t('app.personal')">
    <div p-5>
      <div flex items-center justify-start mb-6>
        <el-avatar mr-6 :size="82" :src="userStore.userProfile.avatar" :icon="UserFilled" />
        <div>
          <div text-6 mb-4>
            名字
          </div>
          <div text-4>
            描述信息...
          </div>
        </div>
      </div>
      <el-button type="danger">
        <el-icon>
          <SwitchButton />
        </el-icon>
        <span>{{ t('app.logout') }}</span>
      </el-button>
    </div>
    <el-form p-5 label-position="top">
      <el-form-item :label="t('app.language')">
        <el-select v-model="currentLanguage" @change="changeLanguage">
          <el-option v-for="(value, key) in languages" :key="key" :label="value.name" :value="key" />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('app.layout')" />
      <el-form-item :label="t('app.dark')" />
      <el-form-item :label="t('app.theme')" />
      <el-form-item :label="t('app.size')" />
      <el-form-item :label="t('app.navigation')" />
      <el-form-item :label="t('app.tab')" />
    </el-form>
  </el-drawer>
</template>
