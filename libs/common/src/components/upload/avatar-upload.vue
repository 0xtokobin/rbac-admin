<script setup lang="ts">
import type { UploadProps } from 'element-plus'

const { t } = useI18n()

const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error(t('base.upload.avatarErrorType'))
    return false
  }
  else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error(t('base.upload.avatarErrorSize'))
    return false
  }
  return true
}
</script>

<template>
  <el-upload
    class="avatar-upload" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <el-icon v-else class="avatar-upload-icon">
      <Plus />
    </el-icon>
  </el-upload>
</template>

<style lang="scss" scoped>
.avatar-upload .avatar {
  width: 6rem;
  height: 6rem;
  display: block;
}

.avatar-upload :deep(.el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-upload :deep(.el-upload:hover) {
  border-color: var(--el-color-primary);
}

:deep(.el-icon.avatar-upload-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 6rem;
  height: 6rem;
  text-align: center;
}
</style>
