<script setup>
/**
 * 分页组件 - 支持双向绑定的分页控制器
 */
defineOptions({
  name: "Pagination"
});

/**
 * 当前页码
 * @type {import('vue').WritableComputedRef<number>}
 */
const currentPage = defineModel("page", {
  type: Number,
  default: 1,
  validator: v => v >= 1
});

/**
 * 每页显示条数
 * @type {import('vue').WritableComputedRef<number>}
 */
const pageSize = defineModel("size", {
  type: Number,
  default: 10,
  validator: v => v >= 1
});
</script>
<template>
  <el-pagination
    v-bind="$props"
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    small
  />
</template>
