import axios from "axios";
import { ElMessage } from "element-plus";

const service = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_API, // 配置请求后端接口的前缀（域名，地址）
	// timeout: 90000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
	(config) => {
		/**
		 * 配置请求拦截器
		 * 一般是请求头增加 Token 等
		 * 。。。
		 */
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
		 * 配置相应数据拦截
		 * 一般是根据状态吗做相应的事情
		 * 。。。
		 */
		return res;
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
