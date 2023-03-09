<script lang="ts" setup>
import type { ComponentInternalInstance } from 'vue'
import { useSystemStore } from '@/hooks/use-system-store'

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['input'])

const { slots } = getCurrentInstance() as ComponentInternalInstance

const systemStore = useSystemStore()

const visible = ref<boolean>(props.value)

const closedHandle = (): void => {
  emit('input', false)
}
</script>

<template>
  <el-dialog
    v-model="visible"
    align-center
    append-to-body
    destroy-on-close
    :width="systemStore.isMobile ? '90%' : '50%'"
    v-bind="$attrs"
    @closed="closedHandle"
  >
    <template #header>
      <slot v-if="slots.header" name="header" />
    </template>
    <div :style="{ height: '50vh' }" overflow-y-scroll>
      <slot />
    </div>
    <template v-if="slots.footer" #footer>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>
