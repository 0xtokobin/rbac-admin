<script lang="ts" setup>
import { useLanguage } from '@/hooks/use-language/use-language';

defineOptions({
  name: 'LayoutToolbarLanguage',
});

const props = defineProps({
  onlyIcon: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: 'var(--wings-cloud-header-text-color)',
  },
});

const { changeLanguage, currentLanguage, languages } = useLanguage();
</script>

<template>
  <el-dropdown @command="changeLanguage">
    <div h-full flex items-center>
      <svg-icon
        v-if="props.onlyIcon"
        cursor-pointer
        size="1.2rem"
        name="base-international"
        :color="props.color"
      ></svg-icon>
      <span flex items-center cursor-pointer h-full v-else>
        <span mr-2>{{ languages[currentLanguage].name }}</span>
        <el-icon><ArrowDown /></el-icon>
      </span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(value, key) in languages"
          :key="key"
          :command="key"
        >
          {{ value.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
