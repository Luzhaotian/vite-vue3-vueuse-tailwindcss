<template>
  <el-menu class="el-menu-vertical-demo" unique-opened :default-openeds="['User Management']">
    <!-- 递归组件 -->
    <RecursionMenu :menuData="menu" />
  </el-menu>
</template>

<script setup>
import RecursionMenu from "@/views/Menu/RecursionMenu.vue";
// import { useMenuStore } from "@/stores/menu.js";
import menu from "@/router/menu.js";

// 获取路由
// const menuStore = useMenuStore();
</script>
