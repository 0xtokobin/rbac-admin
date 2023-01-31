<p>
	<img width="100%" src="https://github.com/wingscloud/static/blob/main/logos/banner.svg" />
</p>

# 👋 欢迎使用 @wingscloud/template-admin 前端模板

【模板】中后台管理系统，基于 Vue3 + Element Plus 开发。模板集成 Vue3 生态最新工具链，提供国际化多语言支持、多主题（支持黑暗模式及自适应）多布局、移动端适配、细颗粒度鉴权、动态路由等。

<p>
	<img src="https://img.shields.io/github/v/release/wingscloud/template-admin.svg?color=3DABF5&label=Release"/>
	<img src="https://img.shields.io/github/repo-size/wingscloud/template-admin.svg?color=3DABF5&label=Repository%20Size"/>
	<img src="https://img.shields.io/github/stars/wingscloud/template-admin.svg?color=3DABF5&label=Stars"/>
	<img src="https://img.shields.io/github/forks/wingscloud/template-admin.svg?color=3DABF5&label=Forks"/>
	<img src="https://img.shields.io/github/issues-pr-closed-raw/wingscloud/template-admin.svg?color=3DABF5&label=Closed%20PR"/>
	<img src="https://img.shields.io/github/issues-closed-raw/wingscloud/template-admin.svg?color=3DABF5&label=Closed%20Issues"/>
	<img src="https://img.shields.io/github/license/wingscloud/template-admin.svg?color=3DABF5&label=License"/>
	<img src="https://img.shields.io/badge/Wings%20Cloud-Template-3DABF5"/>
</p>

## 功能特性

💡 最新技术栈 - 基于 `Vue3.x`、`Vite4.x`、`TypeScript`、`Element Plus`、`Pinia`、`Unocss` 等，持续更新依赖；

🚀 工程化 - 抽离 `/serve` 服务，提供语义化的目录结构，17 种 NPM 命令，搭配环境变量实现工程化的开发环境；

💪 协作开发 - 集成 `Eslint`、`Stylelint`、`Prettier` 格式化、语法检测，提供 Git Commit 拦截，保证代码质量；

🗃️ 开箱即用 - 提供多种开箱即用的后台管理系统页面模板和常用功能示例模板，包含部门、角色、菜单、工作台等；

🎨 主题布局 - 内置 6 种不同布局方式、4 种配色方案、12 种预置主题色，支持黑暗模式（可配置系统自适应）；

🌐 国际化 - 提供基于 `Vue-i18n` 的国际化多语言解决方案，自动化的翻译文本导入，提供菜单注入国际化多语言；

🔑 鉴权 - 提供细颗粒度权限、角色动态菜单，搭配用户角色管理、菜单管理，适配 90% 以上场景的 B 端业务；

⚓ 增删改查 - `@/hooks/use-crud` 抽离了增删改查的业务逻辑，设计层面拒绝代码过度封装，提供可扩展的 API；

✨ 动态路由 - 提供基于接口 + 静态的菜单路由及页面路由，支持菜单动态生成，提供灵活的路由参数、路由守卫；

🕹️ 接口模拟 - 提供模块化的接口模拟，支持 Mock 方法自动导入，接口与 [@wingscloud/core](https://github.com/wingscloud/core) 提供的服务一致；


## 快速上手

Wings Cloud 相关的项目持续维护。项目每次版本更新时，将发布到 Github 上。建议通过 [Github Release](https://github.com/wingscloud/template-admin/releases) 下载相应版本的源码压缩包。

1.安装依赖。

```sh
# 建议使用 pnpm。
pnpm install

# 您也可以使用 Yarn 或者 Npm。
npm install
```

2.该仓库演示地址部署在 [Neilify](https://app.netlify.com/)，需要移除 `/netlify.toml` 文件、`/.netlify` 目录即可。

3.项目提供了基于环境变量的启动命令，你可以在 `/package.json` 中查看。例如，运行 `npm run serve` 将默认启动本地开发服务。您也可以搭配环境变量使用，如：`npm run serve:stag` 即本地启动测试环境的开发服务。

> 注意：运行 `preview` 命令，需要先执行 `build` 相关命令进行本地构建包

4.Vite 服务抽离到了 `/serve` 目录下，其中包含 Vite 相关的配置、环境变量等。你可以在 `/serve/proxy.ts` 中修改您的代理设置。

5.内置了 VsCode 相关插件配置，如果您不需要，移除 `/.vscode` 即可

这里只包含了快速上手精简内容，帮助在本地快速运行，更多使用方式请访问 [官网文档](https://wingscloud-docs.netlify.app)。

## 生态产品

核心，使用 JavaScript / TypeScript 构建的中后台权限微服务系统：

- [✈️ @wingscloud/core 微服务应用](https://github.com/wingscloud/core)

- [✈️ @wingscloud/ui 前端应用](https://github.com/wingscloud/ui)

为了方便开发使用，[Wings Cloud](https://github.com/wingscloud) 提供了配套的使用文档：

- [📘 Wings Cloud 官方文档](https://wingscloud-docs.netlify.app)

同时 [Wings Cloud](https://github.com/wingscloud) 提供了常用的开发模板及空项目启动器：

- [🔥 @wingscloud/template-admin 【前端模板】后台管理系统](https://github.com/wingscloud/template-admin)

- [🔥 @wingscloud/template-website 【前端模板】门户网站](https://github.com/wingscloud/template-website)

- [🔥 @wingscloud/template-shop 【前端模板】社区电商微信小程序](https://github.com/wingscloud/template-shop)

- [🔥 @wingscloud/template-talks 【前端模板】即时通讯跨端 App](https://github.com/wingscloud/template-talks)

- [🔥 @wingscloud/template-wash 【前端模板】自助洗车微信小程序](https://github.com/wingscloud/template-wash)

- [🔥 @wingscloud/starter-vue3 【启动器】Vue3 生态，集成相关插件](https://github.com/wingscloud/starter-vue3)

## 界面展示

<table>
	<tr>
		<td><img width="100%" src="https://github.com/wingscloud/static/blob/main/template-admin/signin.png?raw=true" /></td>
		<td><img width="100%" src="https://github.com/wingscloud/static/blob/main/template-admin/signup.png?raw=true" /></td>
		<td><img width="100%" src="https://github.com/wingscloud/static/blob/main/template-admin/service.png?raw=true" /></td>
	</tr>
	<tr>
		<td><img width="100%" src="https://github.com/wingscloud/static/blob/main/template-admin/layout-1.png?raw=true" /></td>
		<td><img width="100%" src="https://github.com/wingscloud/static/blob/main/template-admin/layout-2.png?raw=true" /></td>
		<td><img width="100%" src="https://github.com/wingscloud/static/blob/main/template-admin/layout-3.png?raw=true" /></td>
	</tr>
	<tr>
		<td><img width="100%" src="https://github.com/wingscloud/static/blob/main/template-admin/layout-4.png?raw=true" /></td>
		<td><img width="100%" src="https://github.com/wingscloud/static/blob/main/template-admin/layout-5.png?raw=true" /></td>
		<td><img width="100%" src="https://github.com/wingscloud/static/blob/main/template-admin/layout-6.png?raw=true" /></td>
	</tr>
	<tr>
		<td><img width="100%" src="https://github.com/wingscloud/static/blob/main/template-admin/theme-1.png?raw=true" /></td>
		<td><img width="100%" src="https://github.com/wingscloud/static/blob/main/template-admin/theme-2.png?raw=true" /></td>
		<td><img width="100%" src="https://github.com/wingscloud/static/blob/main/template-admin/theme-3.png?raw=true" /></td>
	</tr>
	<tr>
		<td><img width="100%" src="https://github.com/wingscloud/static/blob/main/template-admin/style-1.png?raw=true" /></td>
		<td><img width="100%" src="https://github.com/wingscloud/static/blob/main/template-admin/style-2.png?raw=true" /></td>
		<td><img width="100%" src="https://github.com/wingscloud/static/blob/main/template-admin/page-1.png?raw=true" /></td>
	</tr>
	<tr>
		<td><img width="100%" src="https://github.com/wingscloud/static/blob/main/template-admin/page-2.png?raw=true" /></td>
		<td><img width="100%" src="https://github.com/wingscloud/static/blob/main/template-admin/page-3.png?raw=true" /></td>
		<td><img width="100%" src="https://github.com/wingscloud/static/blob/main/template-admin/page-4.png?raw=true" /></td>
	</tr>
</table>

## 开源协议

免费商用，您可以在不违反法律法规的前提下，应用到任意项目。

[MIT licensed](./LICENSE) © 2022-PRESENT [Kaivan Wong](https://github.com/kaivanwong)
