<script lang="ts" setup>
import { useSystemStore } from '@/hooks/use-system-store'
import { PredefineThemeColors } from '@/constants/settings'

const emit = defineEmits(['change'])

const systemStore = useSystemStore()

const changeThemeColor = (val: string | null): void => {
  if (!val)
    return
  emit('change', val as string)
}
</script>

<template>
  <div flex flex-wrap>
    <div
      v-for="(item, index) in PredefineThemeColors"
      :key="index"
      mr-5
      cursor-pointer
      @click="changeThemeColor(item)"
    >
      <div
        style="
          box-sizing: border-box;
          width: 2.5rem;
          height: 2.5rem;
          padding: 4px;
          border: 1px solid var(--el-border-color);
          border-radius: 4px;
        "
      >
        <div
          w-full
          h-full
          :style="{
            backgroundColor: item,
          }"
        />
      </div>
      <div w-full h-2 flex items-center justify-center p-y-2>
        <div
          v-if="item === systemStore.settings.ThemeColor"
          w-2
          h-2
          style="background-color: var(--el-color-primary); border-radius: 50%"
        />
      </div>
    </div>
    <div w-8 ml-1>
      <div flex items-center justify-center>
        <el-color-picker
          v-model="systemStore.settings.ThemeColor"
          size="large"
          :predefine="PredefineThemeColors"
          @change="changeThemeColor"
        />
      </div>
      <div w-full h-2 flex items-center justify-center p-y-2>
        <div
          v-if="
            PredefineThemeColors.filter(
              (item) => item === systemStore.settings.ThemeColor,
            ).length === 0
          "
          w-2
          h-2
          style="background-color: var(--el-color-primary); border-radius: 50%"
        />
      </div>
    </div>
  </div>
</template>
