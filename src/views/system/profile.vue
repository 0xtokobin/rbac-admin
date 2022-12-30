<script lang="ts" setup>
import { useUserStore } from '@/hooks/use-store/use-user-store';

defineOptions({
  name: 'SystemProfile',
});

const { t } = useI18n();

const userStore = useUserStore();
</script>
<template>
  <crud-card>
    <crud-page-form
      label-position="left"
      label-width="120px"
      style="max-width: 24rem"
    >
      <el-form-item :label="t('crud.account.avatar')">
        <avatar-upload v-model="userStore.userProfile.avatar"></avatar-upload>
      </el-form-item>
      <el-form-item :label="t('crud.account.nickname')">
        <el-input
          v-model="userStore.userProfile.nickname"
          :placeholder="t('crud.account.nickname')"
        ></el-input>
      </el-form-item>
      <el-form-item :label="t('crud.account.username')">
        <el-input
          disabled
          v-model="userStore.userProfile.username"
          :placeholder="t('crud.account.username')"
        ></el-input>
      </el-form-item>
      <el-form-item :label="t('crud.mobile.mobile')">
        <el-input
          v-model="userStore.userProfile.mobile"
          :placeholder="t('crud.mobile.mobile')"
        ></el-input>
      </el-form-item>
      <template #action>
        <el-form-item>
          <el-button type="primary">
            {{ t('crud.btn.update') }}
          </el-button>
          <el-button>
            {{ t('app.toolbar.avatar.signout') }}
          </el-button>
        </el-form-item>
      </template>
    </crud-page-form>
  </crud-card>
</template>
