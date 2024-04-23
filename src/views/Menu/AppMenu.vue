<template>
  <el-menu class="el-menu-vertical-demo" unique-opened :default-active="activeMenu">
    <!-- 递归组件 -->
    <RecursionMenu :menuData="menu" />
  </el-menu>
</template>

<script setup>
import RecursionMenu from "@/views/Menu/RecursionMenu.vue";
import { useMenuStore } from "@/stores/menu.js";
import menu from "@/router/menu.js";
import { watch, ref } from "vue";
import { useRouter } from "vue-router";

const index = ref("");
const activeMenu = ref(""); // 默认展开的菜单项

const router = useRouter();
// 监听当前路由
watch(
  () => router.currentRoute.value,
  newPath => {
    // 根据当前路由设置activeMenu的值
    if (newPath) {
      activeMenu.value = newPath.query.index;
    }
  },
  {
    immediate: true
  }
);
// 获取路由
const menuStore = useMenuStore();
// console.log(menuStore);
</script>
