// menuStore.js

import { defineStore, acceptHMRUpdate } from "pinia";
import { sessionStorageGetItem, sessionStorageSetItem } from "@/utils/storage.js";
import { isEmpty } from "lodash";
export const useOptionsStore = defineStore({
  id: "options",

  state: () => ({}),
  getters: {},

  actions: {
    async setOptions(name) {
      if (!sessionStorageGetItem(name)) {
        // 延时器模拟接口
        const data = await new Promise(resolve => {
          setTimeout(() => {
            resolve({
              code: 200,
              data: [
                {
                  label: "男",
                  value: "1"
                },
                {
                  label: "女",
                  value: "2"
                }
              ]
            });
          }, 500);
        });
        // console.log(data, "data");
        this[name] = data.data;
        sessionStorageSetItem(name, data.data);
        // debugger;
        return data.data;
      } else {
        // debugger;
        this[name] = sessionStorageGetItem(name);
        return sessionStorageGetItem(name);
      }
    },
    async getOptions(name) {
      if (isEmpty(this.$state)) {
        const data = await this.setOptions(name);
        console.log(data, "data");
        return data;
      } else if (this[name]) {
        console.log(this[name], "this[name]");
        return this[name];
      }
      return [];
    }
  }
});

//Pinia的热更新
/**
 * acceptHMRUpdate
 * 参数1：你需要热更新的仓库
 * 参数2： 热更新
 */
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOptionsStore, import.meta.hot));
}
