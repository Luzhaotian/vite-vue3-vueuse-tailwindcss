module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: ["eslint:recommended", "plugin:vue/vue3-essential"],
	parser: "vue-eslint-parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module"
	},
	plugins: ["vue"],
	rules: {
		"vue/multi-word-component-names": "off"
	},
	overrides: [
		{
			files: ["src/**/*.vue"],
			rules: {
				"vue/multi-word-component-names": 0
			}
		}
	]
};
