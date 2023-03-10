<script lang="ts" setup name="setting-layout">
import { useSystemStore } from '@/hooks/use-system-store'
import { SettingsValueEnum } from '@/constants/enums'

const props = defineProps({
  mode: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  active: {
    type: Boolean,
    default: false,
  },
})

const systemStore = useSystemStore()
</script>

<template>
  <div mr-7 mb-4 class="animation">
    <div h-18 w-18 overflow-hidden cursor-pointer>
      <div v-if="props.mode === SettingsValueEnum.LAYOUT_MIX" w-full h-full>
        <div
          w-full
          flex
          items-center
          p-l-1
          h-4
          style="
            box-sizing: border-box;
            background-color: var(--wingscloud-header-bg-color);
            border: 1px solid var(--wingscloud-header-border-color);
            border-radius: 4px 4px 0 0;
          "
          :style="
            systemStore.colorScheme === SettingsValueEnum.COLOR_SCHEME_DARK
              ? 'border-color:var(--el-border-color)'
              : 'border-color: var(--wingscloud-header-border-color)'
          "
        />
        <div flex h-14 w-full>
          <div
            h-full
            w-6
            style="
              box-sizing: border-box;
              background-color: var(--wingscloud-menu-bg-color);
              border: 1px solid var(--el-border-color);
              border-top: 0;
              border-radius: 0 0 0 4px;
            "
          />
          <div
            h-full
            w-14
            style="
              box-sizing: border-box;
              background-color: var(--wingscloud-main-fill);
              border: 1px solid var(--el-border-color);
              border-top: 0;
              border-left: 0;
              border-radius: 0 0 4px;
            "
          />
        </div>
      </div>
      <div
        v-if="props.mode === SettingsValueEnum.LAYOUT_TOP"
        w-full
        h-full
      >
        <div
          w-full
          h-4
          style="
            box-sizing: border-box;
            background-color: var(--wingscloud-header-bg-color);
            border: 1px solid;
            border-radius: 4px 4px 0 0;
          "
          :style="
            systemStore.colorScheme === SettingsValueEnum.COLOR_SCHEME_DARK
              ? 'border-color:var(--el-border-color)'
              : 'border-color: var(--wingscloud-header-border-color)'
          "
        />
        <div
          w-full
          h-14
          style="
            box-sizing: border-box;
            background-color: var(--wingscloud-main-fill);
            border: 1px solid var(--el-border-color);
            border-top: 0;
            border-radius: 0 0 4px 4px;
          "
        />
      </div>
      <div
        v-if="props.mode === SettingsValueEnum.LAYOUT_ASIDE"
        w-full
        h-full
        flex
      >
        <div
          h-full
          w-6
          style="
            box-sizing: border-box;
            background-color: var(--wingscloud-menu-bg-color);
            border: 1px solid var(--el-border-color);
            border-right: 0;
            border-radius: 4px 0 0 4px;
          "
        />
        <div h-full w-14>
          <div
            w-full
            h-4
            style="
              box-sizing: border-box;
              background-color: var(--wingscloud-header-bg-color);
              border: 1px solid;
              border-radius: 0 4px 0 0;
            "
            :style="
              systemStore.colorScheme === SettingsValueEnum.COLOR_SCHEME_DARK
                ? 'border-color:var(--el-border-color)'
                : 'border-color: var(--wingscloud-header-border-color)'
            "
          />
          <div
            h-14
            w-full
            style="
              box-sizing: border-box;
              background-color: var(--wingscloud-main-fill);
              border: 1px solid var(--el-border-color);
              border-top: 0;
              border-radius: 0 0 4px;
            "
          />
        </div>
      </div>
      <div
        v-if="props.mode === SettingsValueEnum.LAYOUT_ASIDE_DARK"
        w-full
        h-full
        flex
      >
        <div
          h-full
          w-6
          style="
            box-sizing: border-box;
            background-color: #262a3c;
            border: 1px solid;
            border-right: 0;
            border-radius: 4px 0 0 4px;
          "
          :style="
            systemStore.colorScheme === SettingsValueEnum.COLOR_SCHEME_DARK
              ? 'border-color: var(--el-border-color)'
              : 'border-color: #262a3c'
          "
        />
        <div h-full w-14>
          <div
            w-full
            h-4
            style="
              box-sizing: border-box;
              background-color: var(--wingscloud-header-bg-color);
              border: 1px solid;
              border-radius: 0 4px 0 0;
            "
            :style="
              systemStore.colorScheme === SettingsValueEnum.COLOR_SCHEME_DARK
                ? 'border-color:var(--el-border-color)'
                : 'border-color: var(--wingscloud-header-border-color)'
            "
          />
          <div
            h-14
            w-full
            style="
              box-sizing: border-box;
              background-color: var(--wingscloud-main-fill);
              border: 1px solid var(--el-border-color);
              border-top: 0;
              border-radius: 0 0 4px;
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.animation > *div {
  transition: all var(--el-transition-duration)
    var(--el-transition-function-ease-in-out-bezier);
}
</style>
