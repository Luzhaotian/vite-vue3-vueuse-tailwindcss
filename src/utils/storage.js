/**
 * 通用存储处理器
 * @template T
 * @param {'session' | 'local'} type - 存储类型
 * @returns {{
 *   getItem: (name: string) => T | null,
 *   setItem: (name: string, object: T) => void,
 *   removeItem: (name: string) => void,
 *   exists: (name: string) => boolean,
 *   clear: () => void
 * }}
 */
const createStorage = type => {
  const storage = type === "session" ? sessionStorage : localStorage;

  return {
    /**
     * 获取存储项
     * @param {string} name
     * @returns {T | null}
     */
    getItem(name) {
      try {
        const item = storage.getItem(name);
        return item ? JSON.parse(item) : null;
      } catch (error) {
        console.error(`[${type}Storage] 解析失败:`, error);
        return null;
      }
    },

    /**
     * 设置存储项
     * @param {string} name
     * @param {T} object
     */
    setItem(name, object) {
      try {
        storage.setItem(name, JSON.stringify(object));
      } catch (error) {
        console.error(`[${type}Storage] 存储失败:`, error);
      }
    },

    /**
     * 移除存储项
     * @param {string} name
     */
    removeItem(name) {
      storage.removeItem(name);
    },

    /**
     * 检查存储项是否存在
     * @param {string} name
     * @returns {boolean}
     */
    exists(name) {
      return storage.getItem(name) !== null;
    },

    /**
     * 清空存储
     */
    clear() {
      storage.clear();
    }
  };
};

// SessionStorage 实例
const sessionStorageHandler = createStorage("session");
// LocalStorage 实例
const localStorageHandler = createStorage("local");

/**
 * 删除sessionStorage项
 * @param {string} name
 */
export const sessionStorageRemoveItem = name => sessionStorageHandler.removeItem(name);

export const sessionStorageSetItem = (name, object) => sessionStorageHandler.setItem(name, object);

export const sessionStorageGetItem = name => sessionStorageHandler.getItem(name);

export const isSessionStorageGetItem = name => sessionStorageHandler.exists(name);

export const sessionStorageClear = () => sessionStorageHandler.clear();

/**
 * 删除localStorage项
 * @param {string} name
 */
export const localStorageRemoveItem = name => localStorageHandler.removeItem(name);

export const localStorageSetItem = (name, object) => localStorageHandler.setItem(name, object);

export const localStorageGetItem = name => localStorageHandler.getItem(name);

export const isLocalStorageGetItem = name => localStorageHandler.exists(name);

export const localStorageClear = () => localStorageHandler.clear();

export const languageObject = {
  USER_LOCALE: "languageName"
};
