<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css';
import { i18nChangeLanguage } from '@wangeditor/editor';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { useSystemStore } from '@/hooks/use-store/use-system-store';
import { LanguageEnum } from '@/constants/enums';

defineOptions({
  name: 'ExampleEditor',
});

const mode = 'default';

const editorRef = shallowRef();

const valueHtml = ref('');

const toolbarConfig = {};
const editorConfig = {};

const systemStore = useSystemStore();

onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: any) => {
  editorRef.value = editor;
  i18nChangeLanguage(
    systemStore.language === LanguageEnum.EN_US_ALIAS ? 'en' : 'zh-CN'
  );
};
</script>
<template>
  <crud-card>
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :default-config="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="valueHtml"
        :default-config="editorConfig"
        :mode="mode"
        @on-created="handleCreated"
      />
    </div>
  </crud-card>
</template>
