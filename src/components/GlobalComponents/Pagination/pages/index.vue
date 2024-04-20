<script setup>
import { computed } from "vue";
defineOptions({
  name: "Pagination"
});
const emit = defineEmits(["update:page", "update:size"]);
const prop = defineProps({
  page: Number,
  size: Number
});

const currentPage = computed({
  get: () => prop.currentPage,
  set: val => emit("update:page", val)
});

const pageSize = computed({
  get: () => prop.pageSize,
  set: val => emit("update:size", val)
});
</script>
<template>
  <el-pagination
    v-bind="$props"
    v-model:currentPage="currentPage"
    v-model:page-size="pageSize"
    small
  />
</template>
