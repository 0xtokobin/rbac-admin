<script lang="ts" setup>
import type { ComponentInternalInstance } from 'vue'
import { useBaseStore } from '@/store/base'

const props = defineProps({
  action: {
    type: Boolean,
    default: false,
  },
  customAction: {
    type: Boolean,
    default: false,
  },
  submitLabel: {
    type: String,
    default: '',
  },
  cancelLabel: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['submit', 'cancel'])

const { slots } = getCurrentInstance() as ComponentInternalInstance

const { t } = useI18n()

const baseStore = useBaseStore()

function submit() {
  emit('submit', null)
}

function cancel() {
  emit('cancel', null)
}
</script>

<template>
  <el-form
    v-bind="$attrs"
    :label-position="baseStore.isMobile ? 'top' : 'right'"
    :style="baseStore.isMobile ? 'width:100%' : 'width:680px;margin:0 auto'"
  >
    <slot />
    <el-form-item v-if="props.action && !slots.action">
      <el-button type="primary" @click="submit">
        {{ props.submitLabel || t('base.btn.submit') }}
      </el-button>
      <el-button @click="cancel">
        {{ props.cancelLabel || t('base.btn.cancel') }}
      </el-button>
    </el-form-item>
    <slot name="action" />
  </el-form>
</template>

<style lang="scss" scoped>
:deep(.el-select) {
  width: 100%;
}
</style>
