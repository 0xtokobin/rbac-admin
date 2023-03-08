<script setup lang="ts">
import type { Engine } from 'tsparticles-engine'
import { loadFull } from 'tsparticles'
import { parallax } from 'tsparticles-demo-configs'
import language from '@/layout/toolbar/language.vue'
import colorScheme from '@/layout/toolbar/color-scheme.vue'
import copyright from '@/layout/copyright/index.vue'

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
</script>

<template>
  <Particles id="tsparticles" :options="options" :particles-init="particlesInit" />
  <el-container>
    <el-header>
      <div h-full flex items-center justify-end>
        <language only-icon mr-6 />
        <color-scheme />
      </div>
    </el-header>
    <el-main>
      <slot name="router-view" />
    </el-main>
    <el-footer>
      <copyright />
    </el-footer>
  </el-container>
</template>
