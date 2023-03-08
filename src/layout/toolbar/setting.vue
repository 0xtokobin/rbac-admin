<script lang="ts" setup>
import { RouteEnum } from '@/constants/enums'

const props = defineProps({
  color: {
    type: String,
    default: 'var(--wingscloud-header-text-color)',
  },
})

const router = useRouter()

const openSetting = () => {
  router.push({ path: RouteEnum.ROUTE_SYSTEM_SETTINGS })
}
</script>

<template>
  <div cursor-pointer flex items-center @click="openSetting">
    <svg-icon
      cursor-pointer
      size="1.28rem"
      name="base-setting"
      :color="props.color"
      @click="openSetting"
    />
  </div>
</template>
