<script lang="ts" setup>
import type { ComponentInternalInstance } from 'vue'
import { useBaseStore } from '@/hooks/stores/use-base-store'

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  height: {
    type: String,
    default: '50vh',
  },
})

const emit = defineEmits(['input'])

const { slots } = getCurrentInstance() as ComponentInternalInstance

const baseStore = useBaseStore()

const visible = ref<boolean>(props.value)

const closedHandle = (): void => {
  emit('input', false)
}
</script>

<template>
  <el-dialog
    v-model="visible" align-center append-to-body destroy-on-close :width="baseStore.isMobile ? '90%' : '50%'"
    v-bind="$attrs" @closed="closedHandle"
  >
    <template #header>
      <slot v-if="slots.header" name="header" />
    </template>
    <div :style="{ height: props.height }">
      <slot />
    </div>
    <template v-if="slots.footer" #footer>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>
