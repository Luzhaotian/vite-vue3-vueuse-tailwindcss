<script setup>
import { computed, onErrorCaptured } from "vue";
import { ElConfigProvider } from "element-plus";
import i18n from "@/libs/i18n.js";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import en from "element-plus/dist/locale/en.mjs";

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
</script>

<template>
  <el-config-provider :locale="lang">
    <router-view />
  </el-config-provider>
</template>
