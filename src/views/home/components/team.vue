<script lang="ts" setup>
import { UserFilled } from '@element-plus/icons-vue';

const { t } = useI18n();

const teams = ref<Array<any>>([
  {
    avatar: '',
    name: '系统管理员',
  },
  {
    avatar: '',
    name: '开发工程师',
  },
  {
    avatar: '',
    name: '经理',
  },
  {
    avatar: '',
    name: '员工A',
  },
  {
    avatar: '',
    name: '员工B',
  },
  {
    avatar: '',
    name: '员工C',
  },
  {
    avatar: '',
    name: '员工D',
  },
]);
</script>
<template>
  <crud-card :title="t('home.workbench.team')">
    <div flex flex-wrap>
      <div
        v-for="(item, index) in teams"
        :key="index"
        flex
        items-center
        justify-center
        flex-wrap
        w="33%"
        my-4
      >
        <el-avatar mb-1 :icon="UserFilled"></el-avatar>
        <div text="3.6" w-full text-center>{{ item.name }}</div>
      </div>
    </div>
  </crud-card>
</template>
