import { useSessionStorage } from "@vueuse/core";

const userInfo = "USER_INFO";
/**
 * 删除本地缓存
 * @param {String} name
 */
export const sessionStorageRemoveItem = (name) =>
	sessionStorage.removeItem(name);

/**
 * 本地缓存
 * @param {String} name
 * @param {any} object
 */
export const sessionStorageSetItem = (name, object) => {
	sessionStorageRemoveItem(name);
	sessionStorage.setItem(name, JSON.stringify(object));
};

/**
 * 获取本地缓存
 * @param {String} name
 * @returns any
 */
export const sessionStorageGetItem = (name) =>
	JSON.parse(sessionStorage.getItem(name));

/**
 * 判断本地缓存是否有
 * @param {String} name
 * @returns Boolean
 */
export const isSessionStorageGetItem = (name) =>
	!(sessionStorageGetItem(name) === null);

/**
 * 清空本地缓存
 * @returns
 */
export const sessionStorageClear = () => sessionStorage.clear();

/**
 * 删除本地缓存
 * @param {String} name
 */
export const localStorageRemoveItem = (name) => localStorage.removeItem(name);

/**
 * 本地缓存
 * @param {String} name
 * @param {any} object
 */
export const localStorageSetItem = (name, object) => {
	localStorageRemoveItem(name);
	localStorage.setItem(name, JSON.stringify(object));
};

/**
 * 获取本地缓存
 * @param {String} name
 * @returns any
 */
export const localStorageGetItem = (name) =>
	JSON.parse(localStorage.getItem(name));

/**
 * 判断本地缓存是否有
 * @param {String} name
 * @returns Boolean
 */
export const isLocalStorageGetItem = (name) =>
	!(localStorageGetItem(name) === null);

/**
 * 清空本地缓存
 * @returns
 */
export const localStorageClear = () => localStorage.clear();

/**
 * Vue Use Storage 封装
 * User Info
 * @param {any} data
 * @param {object} other 其他参数
 */
export const useStorageUserInfo = (data, other = {}) => {
	// debugger;
	const state = useSessionStorage(userInfo, data, ...other);
};
