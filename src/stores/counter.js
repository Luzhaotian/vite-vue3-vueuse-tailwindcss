import { ref, computed } from "vue";
import { defineStore, acceptHMRUpdate } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment };
});

//Pinia的热更新
/**
 * acceptHMRUpdate
 * 参数1：你需要热更新的仓库
 * 参数2： 热更新
 */
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot));
}
