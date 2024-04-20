<script setup>
import { ref, getCurrentInstance } from "vue";
// import { setToken } from "@/libs/setUps.js";
import { getLang } from "@/libs/common.js";
import { ElMessage } from "element-plus";
import { useSessionStorage } from "@vueuse/core";

defineOptions({
  name: "Login"
});

// const token = ref("");
const username = ref("");
const password = ref("");

const isLoading = ref(false);
// 这里获取全局对象
const { proxy } = getCurrentInstance();

const login = async () => {
  // console.log(token.value);
  isLoading.value = true;

  try {
    // 这里模拟一个异步操作，例如发送请求
    await new Promise(resolve => setTimeout(resolve, 200));

    // 请求完成后重置 loading 状态
    isLoading.value = false;
    // 添加token和用户信息
    // setToken(token.value);

    ElMessage({
      message: "登陆成功",
      type: "success",
      duration: 5 * 1000,
      showClose: true
    });

    useSessionStorage("USER_INFO", {
      username: username.value,
      password: password.value
    });

    // console.log(state.value);
    // if (import.meta.env.VITE_USER_NODE_ENV === "development") {
    proxy.$router.push({
      name: "home",
      query: {
        lang: getLang(),
        t: new Date().getTime()
      }
    });
    // }
  } catch (error) {
    console.error(error);
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
      <div>
        <h2 class="text-center text-3xl font-extrabold text-gray-900">登录</h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="login">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">用户名</label>
          <input
            id="username"
            v-model="username"
            type="text"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">密码</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            autocomplete=""
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span v-show="!isLoading">提交</span>
            <div v-show="isLoading" class="spinner">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
