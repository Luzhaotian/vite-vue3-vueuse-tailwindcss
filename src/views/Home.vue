<template>
  <div class="home">
    {{ title }}
  </div>
</template>

<script setup>
import { getLang } from "@/libs/common";
import { cookieSetLang } from "@/libs/setUps";
// import { addDynamicRoutes } from "@/libs/dynamicRoutes";
import { sessionStorageClear } from "@/utils/storage.js";
import { ref, getCurrentInstance } from "vue";
import { tryOnMounted } from "@vueuse/core";
const title = ref("主页");

// 这里获取全局对象
const { proxy } = getCurrentInstance();

tryOnMounted(() => {
  // 清除缓存
  sessionStorageClear();

  // 添加动态路由
  // addDynamicRoutes();

  // 设置语言
  cookieSetLang(getLang());
  proxy.$i18n.locale = getLang();
});
</script>
