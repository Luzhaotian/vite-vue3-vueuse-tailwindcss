/**
 * 获取 Url 参数
 * @param {string} url
 * @returns {object} data
 */
export const getQueryParams = (url = "") => {
	if (!url) return {};
	return (
		Object.fromEntries(
			url
				?.split("?")[1]
				?.split("&")
				?.map((item) => item.split("=")) ?? []
		) ?? {}
	);
};
