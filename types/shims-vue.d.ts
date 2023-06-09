declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}

declare module 'element-plus/dist/locale/zh-cn.mjs' {
  const zhCn: Record<string, string>;
  export default zhCn;
}

declare module 'element-plus/dist/locale/en.mjs' {
  const en: Record<string, string>;
  export default en;
}

