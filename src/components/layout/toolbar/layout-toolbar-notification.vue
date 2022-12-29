<script lang="ts" setup>
import type { IObject } from '@/types/global';
import { Check } from '@element-plus/icons-vue';
import { useDateFormat } from '@vueuse/core';
import { useUserStore } from '@/hooks/use-store/use-user-store';
import { RouteEnum } from '@/constants/enums';
import { getUserNotificationByNotRead } from '@/apis/system/user';

defineOptions({
  name: 'LayoutToolbarNotification',
});

const { t } = useI18n();

const router = useRouter();

const userStore = useUserStore();

const props = defineProps({
  color: {
    type: String,
    default: 'var(--wings-cloud-header-text-color)',
  },
});

const goPersonalNotification = () => {
  router.push(RouteEnum.ROUTE_SYSTEM_NOTIFICATION);
};

const list = ref<Array<any>>([]);

onBeforeMount(async () => {
  const res = await getUserNotificationByNotRead();
  list.value = res.data;
});

const read = (item: IObject) => {
  const _list: Array<any> = [];
  list.value.map((listItem) => {
    if (listItem.id !== item.id) {
      _list.push(listItem);
    }
  });
  list.value = _list;
};
</script>

<template>
  <div flex items-center cursor-pointer v-if="userStore.isLogin">
    <el-popover :width="320" trigger="hover">
      <template #reference>
        <el-badge :is-dot="list.length > 0" flex items-center>
          <svg-icon
            name="base-bell"
            size="1.2rem"
            :color="props.color"
          ></svg-icon>
        </el-badge>
      </template>
      <template #default>
        <div flex justify-between items-center>
          <span text-4 style="color: var(--el-text-color-regular)">
            {{ t('app.toolbar.notifications.notifications') }}
          </span>
          <div>
            <el-button
              text
              type="primary"
              v-if="list.length > 0"
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
            m-t-4
            v-for="(item, index) in list"
            :key="index"
            flex
            items-center
            justify-between
          >
            <div>
              <div pb-2 text="3.4">{{ item.content }}</div>
              <div text="3">
                {{
                  useDateFormat(item.createTime, 'YYYY-MM-DD HH:mm:ss').value
                }}
              </div>
            </div>
            <el-button @click="read(item)" size="small" :icon="Check" circle />
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
