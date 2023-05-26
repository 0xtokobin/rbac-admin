<script lang="ts" setup>
const emit = defineEmits(['back'])

const { t } = useI18n()

function back() {
  emit('back')
}
</script>

<template>
  <div w-full flex flex-wrap items-center justify-center p-y-2>
    <el-result icon="success" :title="t('base.password.success')">
      <template #extra>
        <el-button type="primary" @click="back">
          {{ t('base.password.back') }}
        </el-button>
      </template>
    </el-result>
  </div>
</template>
