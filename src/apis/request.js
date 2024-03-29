import axios from "axios";
import { getToken, getUserName } from "@/libs/setUps";
import { ElMessage } from "element-plus";
import { getLang } from "@/libs/common";
import router from "@/router";

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // timeout: 90000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const env = import.meta.env;
    // 给header添加token
    if (getToken()) {
      config.headers["token"] = getToken();
    } else {
      /**
       * 开发环境时，token为空，跳转到登录页面
       */
      if (env.VITE_USER_NODE_ENV === "development") {
        ElMessage({
          message: "没有 Token",
          type: "error",
          duration: 5 * 1000,
          showClose: true,
        });
        router.push({
          path: "/login",
        });
        return false;
      } else {
        /**
         * 生产环境时，token为空，提示用户登录
         */
        ElMessage({
          message: res.message,
          type: "error",
          duration: 5 * 1000,
          showClose: true,
        });

        return false;
      }
    }
    const lang = getLang() === "CN" ? "8" : "1";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    const process = import.meta.env;
    /**
     * 成功的 Code 值
     * 为了防止因为数据类型导致的问题
     * 状态码建议数值类型和字符串类型都写一下
     */
    const successList = ["200", 200, "10000", 10000];

    // console.log(res.code, "Code");
    if (res.code == 500) {
      ElMessage({
        message: res.msg ? res.msg : res.message ? res.message : "服务器异常",
        type: "error",
        duration: 5 * 1000,
        showClose: true,
      });
      return false;
    } else if (res.code == "10999") {
      /**
       * 10999 登录token过期
       * 开发环境 跳转登录页面
       */
      if (process.VITE_USER_NODE_ENV === "development") {
        ElMessage({
          message: "登录 Token 过期",
          type: "error",
          duration: 5 * 1000,
          showClose: true,
        });
        router.push({
          path: "/login",
        });
      } else {
        ElMessage({
          message: res.message,
          type: "error",
          duration: 5 * 1000,
          showClose: true,
        });
      }
      return false;
    } else if (res.code === "10900") {
      /**
       * 10900 未登录
       * 开发环境 跳转登录页面
       */
      if (process.VITE_USER_NODE_ENV === "development") {
        ElMessage({
          message: "未登录",
          type: "error",
          duration: 5 * 1000,
          showClose: true,
        });
        router.push({
          path: "/login",
        });
      }
      return false;
    } else if (successList.includes(res.code)) {
      return res;
    } else {
      /**
       * 其他错误
       */
      ElMessage({
        message: res,
        type: "error",
        duration: 5 * 1000,
        showClose: true,
      });
      return false;
    }
  },
  (error) => {
    ElMessage({
      message: error,
      type: "error",
      duration: 5 * 1000,
      showClose: true,
    });
    // 全局更新loading状态
    // store.dispatch("loadingShow", false);
    return Promise.reject(error);
  }
);

export default service;
