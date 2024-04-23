<script setup>
import { computed, onErrorCaptured, nextTick } from "vue";
import { ElConfigProvider } from "element-plus";
import { useColorMode, tryOnMounted } from "@vueuse/core";
import i18n from "@/libs/i18n.js";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import en from "element-plus/dist/locale/en.mjs";

const mode = useColorMode(); // Ref<'dark' | 'light'>

const locale = i18n.global.locale;

const lang = computed(() => {
  return locale === "CN" ? zhCn : en;
});

/**
 * 捕获错误
 */
onErrorCaptured(error => {
  console.error(error);
  return false;
});

/**
 * 监听页面加载完成
 */
tryOnMounted(() => {
  nextTick(() => {
    // 全局动态更新暗黑模式
    const html = document.querySelector("html");
    if (html) {
      html.classList.add(mode.value);
    }
  });
});
</script>

<template>
  <el-config-provider :locale="lang">
    <router-view />
  </el-config-provider>
</template>
