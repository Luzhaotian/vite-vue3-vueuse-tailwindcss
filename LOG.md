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

### 添加

- 利用动态组件尝试再一次封装 Form 表单
