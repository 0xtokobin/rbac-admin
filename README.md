<p>	
	<img width="100%" src="https://github.com/wingscloud/assets/blob/main/packages/assets/logos/banner.svg" />
</p>

# 项目特性

- 集成 Vue、Uniapp、Vite 等最新前端技术栈，支持 Web 端，8 种移动端开发；

- 采用前端应用一体化开发思想，集成 Vite 作为开发工具链；

- 基于 Monorepo 模式的工程化，集成 Eslint 用于语法检测以及代码格式化； 

# 快速上手

1. 您需要提前在本地安装 Node.js，版本建议为 ^14.18.0 || ^16.0.0 。

2. Wings Cloud 项目版本更新时，通过 [Github Release](https://github.com/wingscloud/ui/releases) 下载相应版本的源码压缩包。

3. 源码下载完成后，通过 npm 安装项目依赖包，您也可以使用 pnpm 或者 yarn。
	> 如网络不稳定，安装时出错或进度过慢！请移步 cnpm 淘宝镜像进行安装。

4. 该项目提供了基于环境变量的启动命令，你可以在 package.json 中查看。例如，运行 pnpm serve 将默认启动本地开发服务。您也可以搭配环境变量使用，如：pnpm serve:stag 即本地启动测试环境的开发服务。

5. 启动完成后，会自动打开浏览器访问 http://localhost:8080 ，如您看到下面的相关页面代表前端项目运行成功。

# 源码目录结构

```
├── .vscode                   // VSCode IDE 配置
├── /mock                     // 模拟接口
├── /public                   // 公共静态资源
├── /serve                    // Vite 开发服务配置                
│  ├── env                    // 环境变量
│  ├── vite                   // 插件配置
│  └── index.ts               // 入口
│  └── proxy.ts               // 代理服务配置
├── /src                        
│  ├── apis                   // 接口管理目录
│  ├── assets                 // 静态资源
│  ├── components             // 公共组件
│  ├── constants              // 常量、配置
│  ├── hooks                  // 钩子函数
│  ├── pages                  // 独立页面
│  ├── plugins                // 插件目录
│  ├── utils                  // 工具类
│  ├── views                  // 页面相关
│  └── main.js                // 入口
├── /test                     // 测试目录
├── /types                    // Ts 类型支持
├── ...
├── index.html                // 根 html 
├── package.json              // 配置
└── tsconfig.json             // Ts 配置
```

# 界面展示

# 开源协议

Wings Cloud 相关开源软件遵循 [Apache 2.0 协议](https://www.apache.org/licenses/LICENSE-2.0.html)，允许商业使用，但务必保留 LICENSE 信息。
