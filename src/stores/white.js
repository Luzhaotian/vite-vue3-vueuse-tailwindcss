// menuStore.js

import { defineStore } from "pinia";

export const useWhiteStore = defineStore({
	id: "white",

	state: () => ({
		whiteList: ["login", "home"],
	}),
});
