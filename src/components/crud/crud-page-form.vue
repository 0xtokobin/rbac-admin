<script lang="ts" setup>
import type { ComponentInternalInstance } from 'vue'
import { useSystemStore } from '@/hooks/use-store/use-system-store'

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

defineOptions({
  name: 'CrudPageForm',
})

const { slots } = getCurrentInstance() as ComponentInternalInstance

const { t } = useI18n()

const systemStore = useSystemStore()

const submit = () => {
  emit('submit', null)
}

const cancel = () => {
  emit('cancel', null)
}
</script>

<template>
  <el-form
    v-bind="$attrs"
    :label-position="systemStore.isMobile ? 'top' : 'right'"
    :style="systemStore.isMobile ? 'width:100%' : 'width:680px;margin:0 auto'"
  >
    <slot />
    <el-form-item v-if="props.action && !slots.action">
      <el-button type="primary" @click="submit">
        {{ props.submitLabel || t('crud.btn.submit') }}
      </el-button>
      <el-button @click="cancel">
        {{ props.cancelLabel || t('crud.btn.cancel') }}
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
