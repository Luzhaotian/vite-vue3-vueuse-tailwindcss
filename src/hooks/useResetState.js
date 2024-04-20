import { reactive, markRaw } from "vue";

/**
 * 初始化数据
 * @param {object} state 更改之后的数据
 * @param {object} originalData 初始数据
 * @returns {object} 初始化后的数据
 */
export const useResetState = (state, originalData) => {
  Object.keys(state).forEach(key => {
    const value = originalData[key];
    if (typeof value === "object" && value !== null) {
      state[key] = useResetState(reactive(value), value);
    } else {
      state[key] = markRaw(value);
    }
  });
  return state;
};
