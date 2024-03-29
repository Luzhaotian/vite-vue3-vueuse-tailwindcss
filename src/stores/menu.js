// menuStore.js

import { defineStore } from "pinia";

export const useMenuStore = defineStore({
  id: "menu",

  // 定义存储的状态
  state: () => ({
    menu: [],
  }),

  // 定义用于修改状态的操作（mutations）
  actions: {
    // 添加菜单项
    addMenuItem(data) {
      this.menu = [];
      this.menu = [...data];
    },

    // 获取菜单
    getMenu() {
      return this.menu;
    },
  },
});
