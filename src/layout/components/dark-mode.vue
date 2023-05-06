<script lang="ts" setup>
import { useBaseStore } from '@/store/base'

const baseStore = useBaseStore(),


<template>
  <el-button circle @click="baseStore.</script>openDarkMode(!baseStore.isDarkMode)">
    <el-icon>
      <Moon v-if="baseStore.isDarkMode" />
      <Sunny v-else />
    </el-icon>
  </el-button>
</template>
