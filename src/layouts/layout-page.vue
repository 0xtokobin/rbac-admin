<script setup lang="ts">
import type { Engine } from 'tsparticles-engine'
import { loadFull } from 'tsparticles'
import { parallax } from 'tsparticles-demo-configs'
import { ArrowDown } from '@element-plus/icons-vue'
import { StorageKeyEnum } from '@/constants/enums'
import { setStorage } from '@/utils/storage'
import { useBaseStore } from '@/hooks/use-store'

defineOptions({
  name: 'LayoutPage',
})

const { locale, messages } = useI18n()

const baseStore = useBaseStore()

function changeLanguage(value: string | number | Record<string, any> | undefined) {
  locale.value = value as string
  baseStore.language = value as string
  setStorage(StorageKeyEnum.LANGUAGE, value as string)
  location.reload()
}

const options = computed(() => {
  return {
    ...parallax,
    ...{
      fullScreen: {
        zIndex: -1,
      },
      themes: [
        {
          name: 'light',
          default: {
            auto: true,
            mode: 'light',
            value: true,
          },
          options: {
            background: {
              color: {
                value: '#0d47a1',
              },
            },
          },
        },
        {
          name: 'dark',
          default: {
            auto: true,
            mode: 'dark',
            value: true,
          },
          options: {
            background: {
              color: {
                value: 'val(--el-bg-color-page)',
              },
            },
          },
        },
      ],
    },
  }
})

async function particlesInit(engine: Engine) {
  await loadFull(engine)
}
</script>

<template>
  <Particles id="tsparticles" :options="options" :particles-init="particlesInit" />
  <el-container w-screen h-screen>
    <el-header w-full flex items-center justify-end>
      <el-dropdown @command="changeLanguage">
        <div h-full cursor-pointer flex items-center>
          <span mr-2> {{ messages[locale].name }}</span>
          <el-icon>
            <ArrowDown />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown v-for="(value, key) in messages" :key="key" :command="key">
              {{ value.name }}
            </el-dropdown>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-header>
    <el-main>
      <slot name="router-view" />
    </el-main>
  </el-container>
</template>
