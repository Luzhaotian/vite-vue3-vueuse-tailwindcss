import { defineStore, acceptHMRUpdate } from "pinia";
import { acquireLock, releaseLock } from "@/utils/lock.js";

export const useLoadingStore = defineStore({
  id: "loading",

  state: () => ({
    // loading: false
    count: 0
  }),

  getters: {
    /**
     * 控制 loading 状态
     * 因为接口都是异步调用，所以想了一个办法，利用 Count 计数来控制 loading
     * 取消请求 -1
     * 添加请求 +1
     * 请求报错 -1
     * 请求成功 -1
     * 请求失败 -1
     * 基本可以保证最后一定是 0
     * @returns {boolean}
     */
    loading() {
      return this.count > 0;
    }
  },
  actions: {
    async openLoading() {
      // this.loading = true;
      await acquireLock();
      try {
        this.count = Math.max(1, this.count + 1); // 确保count不会变成负数
      } finally {
        releaseLock();
      }
    },
    async closeLoading() {
      // this.loading = false;
      await acquireLock();
      try {
        this.count = Math.max(0, this.count - 1); // 确保count不会变成负数
      } finally {
        releaseLock();
      }
    }
  }
});

// 确保传递正确的 store 声明，本例中为 `useLoadingStore`
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLoadingStore, import.meta.hot));
}
