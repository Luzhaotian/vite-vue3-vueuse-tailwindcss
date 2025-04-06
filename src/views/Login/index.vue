<script setup>
import { ref, getCurrentInstance, nextTick, onMounted, watch, reactive } from "vue";
import { getLang } from "@/libs/common.js";
import { ElMessage } from "element-plus";
import { useSessionStorage } from "@vueuse/core";
import { useLoadingStore } from "@/stores/loading.js";
import i18n from "@/locales";
import { localStorageSetItem, languageObject, localStorageGetItem } from "@/utils/storage.js";

defineOptions({
  name: "Login"
});

const form = reactive({
  username: "",
  password: ""
});
const formRef = ref(null);

const rules = reactive({
  username: [
    {
      required: true,
      message: () => i18n.global.t("login.usernameErrorTip"),
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      message: () => i18n.global.t("login.passwordErrorTip"),
      trigger: "blur"
    }
  ]
});
// const language = ref("");

const selectedLang = ref(localStorageGetItem(languageObject.USER_LOCALE) ?? "zh-CN");

// const isLoading = ref(false);
const loadingStore = useLoadingStore();

// 这里获取全局对象
const { proxy } = getCurrentInstance();

const langChange = l => {
  i18n.global.locale = l;
};

watch(selectedLang, n => {
  // console.log(n);
  localStorageSetItem(languageObject.USER_LOCALE, n);
  langChange(n);
});

const login = () => {
  formRef.value.validate(valid => {
    if (!valid) return;
    // isLoading.value = true;
    loadingStore.openLoading();

    nextTick(async () => {
      try {
        // 这里模拟一个异步操作，例如发送请求
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 请求完成后重置 loading 状态
        // isLoading.value = false;
        loadingStore.closeLoading();
        // 添加token和用户信息
        // setToken(token.value);

        ElMessage({
          message: "登陆成功",
          type: "success",
          duration: 5 * 1000,
          showClose: true
        });

        // language.value = getLang();

        // const lang = document.querySelector('input[type="radio"]:checked');
        // language.value = selectedLang.value;
        useSessionStorage("USER_INFO", {
          username: form.username,
          password: form.password,
          language: selectedLang.value
        });

        // if (import.meta.env.VITE_USER_NODE_ENV === "development") {
        proxy.$router.push({
          name: "home",
          query: {
            lang: selectedLang.value ?? getLang(),
            t: new Date().getTime()
          }
        });
        // }
      } catch (error) {
        console.error(error);
        // isLoading.value = false;
        loadingStore.closeLoading();
      }
    });
  });
};

onMounted(() => {
  // init();
});
</script>

<template>
  <div class="login-form min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
      <div>
        <h2 class="text-center text-3xl font-extrabold text-gray-900">{{ $t("login.login") }}</h2>
      </div>
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        class="mt-8 space-y-6"
        @submit.prevent="login"
        label-position="top"
      >
        <el-form-item label="Username" prop="username">
          <template #label>
            <label for="username" class="block text-sm font-medium text-gray-700">
              {{ $t("login.userName") }}
            </label>
          </template>
          <input
            id="username"
            v-model="form.username"
            type="text"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-white placeholder:dark:text-gray-600"
            :placeholder="$t('login.userName')"
          />
        </el-form-item>
        <el-form-item prop="password">
          <template #label>
            <label for="password" class="block text-sm font-medium text-gray-700">
              {{ $t("login.password") }}
            </label>
          </template>
          <input
            id="password"
            v-model="form.password"
            type="password"
            autocomplete=""
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-white placeholder:dark:text-gray-600"
            :placeholder="$t('login.password')"
          />
        </el-form-item>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t("login.language") }}
          </label>
          <div
            class="flex justify-between rounded-md border-solid border border-indigo-600 h-9 my-2"
          >
            <label
              for="zh"
              class="text-indigo-600 flex-cc w-1/2 has-[:checked]:bg-indigo-600 has-[:checked]:text-white cursor-pointer"
            >
              <span>中文</span>
              <input
                type="radio"
                name="lang"
                value="zh-CN"
                id="zh"
                class="mr-2"
                :value="'zh-CN'"
                v-model="selectedLang"
                hidden
              />
            </label>
            <label
              for="en"
              class="text-indigo-600 flex-cc w-1/2 has-[:checked]:bg-indigo-600 has-[:checked]:text-white cursor-pointer"
            >
              <span>English</span>
              <input
                type="radio"
                name="lang"
                value="en-US"
                id="en"
                class="mr-2"
                :value="'en-US'"
                v-model="selectedLang"
                hidden
              />
            </label>
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span v-show="!loadingStore.loading">{{ $t("login.login") }}</span>
            <div v-show="loadingStore.loading" class="spinner">
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
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-form {
  & :deep(.el-form-item__label) {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
