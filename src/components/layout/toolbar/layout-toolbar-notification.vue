<script lang="ts" setup>
import { Check } from '@element-plus/icons-vue'
import { useDateFormat } from '@vueuse/core'
import type { IObject } from '#/global'
import { useUserStore } from '@/hooks/use-store/use-user-store'
import { RouteEnum } from '@/constants/enums'
import { getUserNotificationByNotRead } from '@/apis/system/user'

const props = defineProps({
  color: {
    type: String,
    default: 'var(--wingscloud-admin-header-text-color)',
  },
})

const { t } = useI18n()

const router = useRouter()

const userStore = useUserStore()

const goPersonalNotification = () => {
  router.push(RouteEnum.ROUTE_SYSTEM_NOTIFICATION)
}

const list = ref<Array<any>>([])

onBeforeMount(async () => {
  const res = await getUserNotificationByNotRead()
  list.value = res.data
})

const read = (item: IObject) => {
  const _list: Array<any> = []
  list.value.forEach((listItem) => {
    if (listItem.id !== item.id)
      _list.push(listItem)
  })
  list.value = _list
}
</script>

<template>
  <div v-if="userStore.isLogin" flex items-center cursor-pointer>
    <el-popover :width="320" trigger="hover">
      <template #reference>
        <el-badge :is-dot="list.length > 0" flex items-center>
          <svg-icon
            name="base-bell"
            size="1.2rem"
            :color="props.color"
          />
        </el-badge>
      </template>
      <template #default>
        <div flex justify-between items-center>
          <span text-4 style="color: var(--el-text-color-regular)">
            {{ t('app.toolbar.notifications.notifications') }}
          </span>
          <div>
            <el-button
              v-if="list.length > 0"
              text
              type="primary"
              @click="list = []"
            >
              {{ t('app.toolbar.notifications.clear') }}
            </el-button>
            <el-button text type="primary" @click="goPersonalNotification">
              {{ t('app.toolbar.notifications.more') }}
            </el-button>
          </div>
        </div>
        <div v-if="list.length > 0">
          <div
            v-for="(item, index) in list"
            :key="index"
            m-t-4
            flex
            items-center
            justify-between
          >
            <div>
              <div pb-2 text="3.4">
                {{ item.content }}
              </div>
              <div text="3">
                {{
                  useDateFormat(item.createTime, 'YYYY-MM-DD HH:mm:ss').value
                }}
              </div>
            </div>
            <el-button size="small" :icon="Check" circle @click="read(item)" />
          </div>
        </div>
        <div v-if="list.length === 0">
          <el-empty
            :image-size="100"
            :description="t('app.toolbar.notifications.empty')"
          />
        </div>
      </template>
    </el-popover>
  </div>
</template>
