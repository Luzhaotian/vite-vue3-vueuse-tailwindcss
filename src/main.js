import "./assets/css/main.css";
import "./index.css";
import "element-plus/dist/index.css";
// main.ts
// 如果只想导入css变量
import "element-plus/theme-chalk/dark/css-vars.css";

/**
 * [Violation] Added non-passive event listener to a scroll-blocking 'touchstart' event. Consider marking event handler as
 * 'passive' to make the page more responsive. see https://www.chromestatus.com/feature/5745543795965952
 * default-passive-events 是解决开发环境这个警告的问题
 */
import "default-passive-events";
/**
 * Unable to preventDefault inside passive event listener invocation.
 * 开发环境去除谷歌浏览器的scroll、wheel等事件警告
 */
import "@/utils/browser_patch";

import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
// import i18n from "@/libs/i18n.js";
import i18n from "@/locales";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import en from "element-plus/dist/locale/en.mjs";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.config.globalProperties.$t = i18n.global.t;

app
  .use(router)
  .use(createPinia())
  .use(ElementPlus, {
    locale: i18n.global.locale === "CN" ? zhCn : en,
    size: "small",
    zIndex: 3000
  })
  .use(i18n)
  .mount("#app");
