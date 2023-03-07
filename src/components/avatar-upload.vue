<script lang="ts" setup>
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  size: {
    type: Number,
    default: 2,
  },
  types: {
    type: Array,
    default: () => {
      return ['image/jpeg', 'image/png']
    },
  },
})

const emit = defineEmits(['input'])

const { t } = useI18n()

const avatarBeforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (!props.types.includes(rawFile.type)) {
    ElMessage.error(t('base.upload.error.type'))
    return false
  }
  else if (rawFile.size / 1024 / 1024 > props.size) {
    ElMessage.error(t('base.upload.error.type', { size: props.size }))
    return false
  }
  return true
}

const avatarUploadChange: UploadProps['onChange'] = (
  uploadFile,
  uploadFiles,
) => {
  // TODO
  emit('input', uploadFile)
}
</script>

<template>
  <el-upload
    :show-file-list="false"
    :before-upload="avatarBeforeUpload"
    :on-change="avatarUploadChange"
  >
    <img v-if="props.value" :src="props.value" class="avatar">
    <el-icon v-else class="avatar-uploader-icon">
      <Plus />
    </el-icon>
  </el-upload>
</template>

<style lang="scss" scoped>
:deep(.el-upload) {
  position: relative;
  overflow: hidden;
  border: 1px dashed #ccc;
  border-radius: 50%;
  cursor: pointer;
  transition: var(--el-transition-duration-fast);

  &:hover {
    border-color: var(--el-color-primary);
  }
}

.avatar-uploader-icon {
  width: 120px;
  height: 120px;
  color: #8c939d;
  font-size: 28px;
  text-align: center;
}
</style>
