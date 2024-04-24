import { defineStore, acceptHMRUpdate } from "pinia";

export const useLoadingStore = defineStore({
  id: "loading",

  state: () => ({
    loading: false
  }),

  actions: {
    openLoading() {
      this.loading = true;
    },
    closeLoading() {
      this.loading = false;
    }
  }
});

// 确保传递正确的 store 声明，本例中为 `useLoadingStore`
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLoadingStore, import.meta.hot));
}
