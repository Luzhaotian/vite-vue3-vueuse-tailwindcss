# 更新日志

## v1.0.0 (2024-04-02)

### 功能

- 增加 router-view fullPath key
- 简化 Table 组件中默认为 true 的参数 用 ?? 替代
- 增加部分注释

### 修复

- 修复 search-form 组件使用 Element Plus label 默认 auto 开发环境出现警告 NAN 的问题
- 修复图片路径打包以后 404 问题

### 添加

- 添加菜单默认展开第一项，默认取得 Index 是 英文 待后续完善

### 删除

- 删除注释无用代码
- 删除部分 Css 代码

## v1.0.1 (2024-04-08)

### 功能

- 增加 Tailwind Css 全局复用样式 @apply

## v1.0.2 (2024-04-16)

### 功能

- 增加下载相关的通用代码（实际情况修改）
- 增加 SearchForm 的 input type 属性等

### 修复

- 修复 Table 组件样式穿透无效问题
- 修复 Table 组件排序功能数据出现 null 的情况排序异常问题
- 修复分页器 Bug

## v1.0.2 (2024-04-19)

### 功能

- Form 表单增加绑定对象（可以设置默认值）
- Form Input 表单增加事件绑定（测试）

### 修复

- 修复已知问题

## v1.0.3 (2024-04-20)

### 功能

- 测试 Pnpm 运行并且通过 Pnpm 下载插件
- Form Input 表单增加事件绑定并且绑定对象数据（测试）
- 尝试 Options 数据通过 Pinia 输送至 searchList 最终失败（会继续查找方法）

### 修复

- 修复已知问题
- 格式化大量代码

### 添加

- 增加 ESlint 插件
- 增加 Prettier 插件

## v1.0.4 (2024-04-22)

### 添加

- 增加 Vite rollupOptions output manualChunks 配置信息

## v1.0.5 (2024-04-23)

### 修复

- 修复格式化报错
- 删除格式化代码需要删除 type: module 提示注释
- 优化 option 数据填入

### 添加

- 利用动态组件尝试再一次封装 Form 表单

## v1.0.6 (2024-04-24)

### 修复

- 修复 options.js 引入数据异常问题

### 添加

- 全局 loading

## v1.0.7 (2024-04-25)

### 功能

- 前端发版 index.html 增加 meta 防止因为缓存导致页面未更新

### 修复

- 修复分页和父组件绑定异常问题
- 优化 options.js 文件

### 添加

- 增加分页器使用 Demo

## v1.0.8 (2024-04-26)

### 添加

- prettier 增加部分配置，符合自身的格式化样式
- Vite 优化打包配置 manualChunks 函数

## v1.0.9 (2024-04-29)

### 添加

- 在 Pagination 组件中联系增加 defineModel 使用
- 在 Table 组件增加继承 slot

## v1.0.10 (2024-05-07)

### 添加

- 登录页增加语言切换（自己耶练习 Tailwind Css）

## v1.0.11 (2024-05-09)

### 修复

- 升级 Element Plus 版本
- 升级 Element Plus 版本以后使用 SearchForm 组件会出现一个 input label 的警告 可以采用 SearchFormDynamic 组件就不会出现了
