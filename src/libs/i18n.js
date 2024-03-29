import { createI18n } from "vue-i18n";
import { getLang } from "@/libs/common.js";
import en from "@/assets/js/en";
import zh from "@/assets/js/zh-cn";

const i18n = createI18n({
	locale: getLang(),
	messages: {
		CN: zh,
		EN: en,
	},
});

export default i18n;
