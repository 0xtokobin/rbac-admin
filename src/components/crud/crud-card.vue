<script lang="ts" setup>
import type { ComponentInternalInstance } from 'vue'

const props = defineProps({
  header: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: '',
  },
  subTitle: {
    type: String,
    default: '',
  },
  action: {
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

const route = useRoute()

const submit = () => {
  emit('submit', null)
}

const cancel = () => {
  emit('cancel', null)
}
</script>

<template>
  <el-card shadow="never" important="border-none">
    <template v-if="slots.header || props.header" #header>
      <slot name="header" />
      <div v-if="!slots.header && props.header">
        <div
          v-if="props.title || route.meta.menuName"
          text-5
          style="color: var(--el-text-color-primary)"
        >
          {{ props.title || route.meta.menuName }}
        </div>
        <div
          v-if="props.subTitle || route.meta.menuDescription"
          text-4
          mt-2
          style="color: var(--el-text-color-secondary)"
        >
          {{ props.subTitle || route.meta.menuDescription }}
        </div>
      </div>
    </template>
    <div style="padding: calc(var(--el-card-padding) - 2px) var(--el-card-padding);">
      <slot />
    </div>
    <template v-if="props.action">
      <el-divider important="m-0" />
      <div class="padding">
        <slot name="action" />
        <template v-if="!slots.action">
          <el-button type="primary" @click="submit">
            {{ props.submitLabel || t('crud.btn.submit') }}
          </el-button>
          <el-button @click="cancel">
            {{ props.cancelLabel || t('crud.btn.cancel') }}
          </el-button>
        </template>
      </div>
    </template>
  </el-card>
</template>
