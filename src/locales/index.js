// import Vue from "vue";
import { createI18n } from "vue-i18n";
// import { languageObject, local } from "@/utils/storage.js";
import { languageObject, localStorageGetItem } from "@/utils/storage.js";

// Vue.use(VueI18n);

import { loadModules } from "./utils";

const messages = {
  "zh-CN": {
    ...loadModules("zh")
  },
  "en-US": {
    ...loadModules("en")
  }
};

// console.log(messages, "messages");

const i18n = createI18n({
  locale: localStorageGetItem(languageObject.USER_LOCALE) || "zh-CN",
  fallbackLocale: "zh-CN",
  messages
});

export default i18n;
