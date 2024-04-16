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
