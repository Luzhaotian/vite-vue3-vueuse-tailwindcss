import axios from "axios";
import { ElMessage } from "element-plus";
import { useLoadingStore } from "@/stores/loading.js";

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 配置请求后端接口的前缀（域名，地址）
  timeout: 1000 * 60 // 请求超时时间 1 分钟 这里是为了超时要取消 loading 状态 loading 的 count - 1 建议超时时间要有 不然会存在某一个接口时间过长导师 loading 关闭不了
});

// 请求拦截器
service.interceptors.request.use(
  /**
   * @typedef {import('axios').AxiosRequestConfig} AxiosRequestConfig
   * @param {AxiosRequestConfig} config
   * @returns {Promise<AxiosRequestConfig>}
   */
  async config => {
    // 特殊响应类型处理（如blob类型不触发全局loading）
    const specialType = ["blob"];
    const loadingStore = useLoadingStore();

    try {
      // 添加认证Token
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // 非下载类型请求开启loading
      if (!specialType.includes(config.responseType)) {
        await loadingStore.openLoading();
      }

      // 标准化请求头
      config.headers = {
        "Content-Type": "application/json",
        ...config.headers
      };

      return config;
    } catch (error) {
      await loadingStore.closeLoading();
      return Promise.reject(error);
    }
  },
  error => {
    // 获取 loading 状态
    const loadingStore = useLoadingStore();
    // 关闭 loading
    loadingStore.closeLoading();
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  /**
   * @typedef {import('axios').AxiosResponse} AxiosResponse
   * @param {AxiosResponse} response
   * @returns {Promise<any>}
   */
  async response => {
    const loadingStore = useLoadingStore();
    try {
      // 统一响应数据结构
      const { data, status } = response;
      await loadingStore.closeLoading();

      // 处理业务错误（假设code非0为业务错误）
      if (data?.code && data.code !== 0) {
        ElMessage({
          message: data.message || "业务处理异常",
          type: "warning",
          duration: 3000
        });
        return Promise.reject(data);
      }

      return data?.data ?? data; // 返回核心业务数据
    } catch (error) {
      await loadingStore.closeLoading();
      return Promise.reject(error);
    }
  },
  /**
   * @param {import('axios').AxiosError} error
   */
  async error => {
    const loadingStore = useLoadingStore();
    await loadingStore.closeLoading();

    // 错误分类处理
    const errorMessage = error.response
      ? `[${error.response.status}] ${error.response.data?.message || "服务异常"}`
      : error.message || "网络连接失败";

    ElMessage({
      message: errorMessage,
      type: "error",
      duration: 5000,
      showClose: true
    });

    // 认证失败处理
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default service;
