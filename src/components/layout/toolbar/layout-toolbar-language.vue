<script lang="ts" setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { useLanguage } from '@/hooks/use-language'

const { changeLanguage, currentLanguage, languages } = useLanguage()
</script>

<template>
  <el-dropdown @command="changeLanguage">
    <div h-full cursor-pointer flex items-center>
      <span mr-2>{{ languages[currentLanguage].name }}</span>
      <el-icon>
        <ArrowDown />
      </el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="(value, key) in languages" :key="key" :command="key">
          {{ value.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
