// menuStore.js

import { defineStore, acceptHMRUpdate } from "pinia";

export const useWhiteStore = defineStore({
  id: "white",

  state: () => ({
    whiteList: ["login", "home"]
  })
});

//Pinia的热更新
/**
 * acceptHMRUpdate
 * 参数1：你需要热更新的仓库
 * 参数2： 热更新
 */
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWhiteStore, import.meta.hot));
}
