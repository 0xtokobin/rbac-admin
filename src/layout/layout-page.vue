<script setup lang="ts">
import type { Engine } from 'tsparticles-engine'
import { loadFull } from 'tsparticles'
import { parallax } from 'tsparticles-demo-configs'
import { ArrowDown } from '@element-plus/icons-vue'
import { CacheKeyEnum } from '@/enums/cache'
import { setStorage } from '@/utils/cache'
import { useBaseStore } from '@/store/base'
import layoutCopyright from '@apps/admin/layout/components/copyright.vue'

const { locale, messages } = useI18n()

const baseStore = useBaseStore()

const changeLanguage = (
  value: string | number | Record<string, any> | undefined,
) => {
  locale.value = value as string
  baseStore.language = value as string
  setStorage(CacheKeyEnum.LANGUAGE, value as string)
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

const particlesInit = async (engine: Engine) => {
  await loadFull(engine)
}


<template>
  <Particles id="tsparticles" :options="options" :particles-init="particlesInit" />
  <el-container w-screen h-screen>
    <el-header w-full flex items-center justify-end>
      <el-dropdown @command="changeLanguage">
        <div h-full cursor-pointer flex items-center>
          <span mr-2>{{ messages[locale].name }}</span>
          <el-icon>
            <ArrowDown />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="(value, key) in messages" :key="key" :command="key">
              {{ value.</script>name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-header>
    <el-scrollbar>
      <el-main>
        <slot name="router-view" />
      </el-main>
    </el-scrollbar>
    <el-footer flex items-center justify-center>
      <layout-copyright color="#A3A6AD" />
    </el-footer>
  </el-container>
</template>
