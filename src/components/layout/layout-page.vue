<script setup lang="ts">
import type { Engine } from 'tsparticles-engine'

import { loadFull } from 'tsparticles'
import { parallax } from 'tsparticles-demo-configs'

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
    <el-header flex items-center justify-end>
      <app-language color="#E5EAF3" />
    </el-header>
    <el-main>
      <slot name="router-view" />
    </el-main>
    <el-footer>
      <app-copyright color="#A3A6AD" />
    </el-footer>
  </el-container>
</template>
