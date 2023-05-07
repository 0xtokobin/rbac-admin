# Wing Cloud Admin

一个中后台 Web 应用程序，基于 Vue + Vite + Element Plus 开发，提供 RBAC 权限系统。

# 项目特点

- 基于 Vue3、Vite、TypeScript、Element Plus、Pinia 等最新技术栈；

- 支持国际化多语言、黑暗模式、多主题切换、多布局切换、动态菜单（权限）等功能；

- 集成登录、仪表台、用户/角色/菜单管理、字典/参数/系统设置等页面模板；

- 提供路由注入、国际化注入、网络请求、缓存、自动导入等工具函数；

- 支持环境变量文件，提供 dev/stag/prod 三种模式可选，支持按需扩展；

# 开发

```sh
# 拉取最新项目代码

git clone https://github.com/wingscloud/admin.git

# 进入项目代码目录

cd admin

# 安装项目依赖包

npm install

# 建议使用 pnpm 进行依赖安装及管理

pnpm install 

# 启动本地开发环境

npm run serve
```

# 示例

<table>
	<tr>
		<td><img width="100%" src="https://github.com/wingscloud/docs/blob/main/public/admin/login.png?raw=true" /></td>
	</tr>
	<tr>
		<td><img width="100%" src="https://github.com/wingscloud/docs/blob/main/public/admin/workbench.jpg?raw=true" /></td>
	</tr>
</table>

# 开源协议

Wings Cloud 相关开源软件遵循 [Apache 2.0 协议](https://www.apache.org/licenses/LICENSE-2.0.html)，允许商业使用，但务必保留 LICENSE 信息。
