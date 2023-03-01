# 特点

- 基于 `Vue3.x`、`Vite4.x`、`TypeScript`、`Element Plus`、`Pinia`、`Unocss` 等最新技术栈；

- 抽离 `/serve` 服务，提供语义化的目录结构，17 种 NPM 命令，搭配环境变量实现工程化的开发环境；

- 集成 `Eslint`、`Stylelint`、`Prettier` 格式化、语法检测，提供 Git Commit 拦截，保证代码质量；

- 提供多种开箱即用的后台管理系统页面模板和常用功能示例模板，包含部门、角色、菜单、工作台等；

- 内置 6 种不同布局方式、4 种配色方案、12 种预置主题色，支持黑暗模式（可配置系统自适应）；

- 提供基于 `Vue-i18n` 的国际化多语言解决方案，自动化的翻译文本导入，提供菜单注入国际化多语言；

- 提供细颗粒度权限、角色动态菜单，搭配用户角色管理、菜单管理，适配 90% 以上场景的 B 端业务；

- `@/hooks/use-crud` 抽离了增删改查的业务逻辑，设计层面拒绝代码过度封装，提供可扩展的 API；

- 提供基于接口 + 静态的菜单路由及页面路由，支持菜单动态生成，提供灵活的路由参数、路由守卫；

# 快速上手

项目每次版本更新时，将发布到 Github 上。建议通过 [Github Release](https://github.com/wingscloud/template-admin/releases) 下载相应版本的源码压缩包。

1. 安装依赖。

```sh
# 建议使用 pnpm。
pnpm install

# 您也可以使用 Yarn 或者 Npm。
npm install
```

2. 项目提供了基于环境变量的启动命令，你可以在 `/package.json` 中查看。例如，运行 `npm run serve` 将默认启动本地开发服务。您也可以搭配环境变量使用，如：`npm run serve:stag` 即本地启动测试环境的开发服务。

> 注意：运行 `preview` 命令，需要先执行 `build` 相关命令进行本地构建包

3. Vite 服务抽离到了 `/serve` 目录下，其中包含 Vite 相关的配置、环境变量等。你可以在 `/serve/proxy.ts` 中修改您的代理设置。

# 界面展示

<table>
	<tr>
		<td><img width="100%" src="https://github.com/wingscloud/assets/blob/main/template-admin/signin.png?raw=true" /></td>
		<td><img width="100%" src="https://github.com/wingscloud/assets/blob/main/template-admin/signup.png?raw=true" /></td>
		<td><img width="100%" src="https://github.com/wingscloud/assets/blob/main/template-admin/service.png?raw=true" /></td>
	</tr>
	<tr>
		<td><img width="100%" src="https://github.com/wingscloud/assets/blob/main/template-admin/layout-1.png?raw=true" /></td>
		<td><img width="100%" src="https://github.com/wingscloud/assets/blob/main/template-admin/layout-2.png?raw=true" /></td>
		<td><img width="100%" src="https://github.com/wingscloud/assets/blob/main/template-admin/layout-3.png?raw=true" /></td>
	</tr>
	<tr>
		<td><img width="100%" src="https://github.com/wingscloud/assets/blob/main/template-admin/layout-4.png?raw=true" /></td>
		<td><img width="100%" src="https://github.com/wingscloud/assets/blob/main/template-admin/layout-5.png?raw=true" /></td>
		<td><img width="100%" src="https://github.com/wingscloud/assets/blob/main/template-admin/layout-6.png?raw=true" /></td>
	</tr>
	<tr>
		<td><img width="100%" src="https://github.com/wingscloud/assets/blob/main/template-admin/theme-1.png?raw=true" /></td>
		<td><img width="100%" src="https://github.com/wingscloud/assets/blob/main/template-admin/theme-2.png?raw=true" /></td>
		<td><img width="100%" src="https://github.com/wingscloud/assets/blob/main/template-admin/theme-3.png?raw=true" /></td>
	</tr>
	<tr>
		<td><img width="100%" src="https://github.com/wingscloud/assets/blob/main/template-admin/style-1.png?raw=true" /></td>
		<td><img width="100%" src="https://github.com/wingscloud/assets/blob/main/template-admin/style-2.png?raw=true" /></td>
		<td><img width="100%" src="https://github.com/wingscloud/assets/blob/main/template-admin/page-1.png?raw=true" /></td>
	</tr>
	<tr>
		<td><img width="100%" src="https://github.com/wingscloud/assets/blob/main/template-admin/page-2.png?raw=true" /></td>
		<td><img width="100%" src="https://github.com/wingscloud/assets/blob/main/template-admin/page-3.png?raw=true" /></td>
		<td><img width="100%" src="https://github.com/wingscloud/assets/blob/main/template-admin/page-4.png?raw=true" /></td>
	</tr>
</table>

# 参与共建

欢迎提交 PR

# 开源协议

Wings Cloud 相关开源软件遵循 [Apache 2.0 协议](https://www.apache.org/licenses/LICENSE-2.0.html)，允许商业使用，但务必保留 LICENSE 信息。
