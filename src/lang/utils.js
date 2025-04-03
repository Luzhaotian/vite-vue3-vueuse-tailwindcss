/*
 * 国际化工具模块 - 提供语言模块加载功能
 * Internationalization utilities module - Provides language module loading functionality
 */

/**
 * 加载指定语言的模块
 * @param {string} [lang='zh'] - 语言代码，默认为'zh'
 * @returns {Object} 包含所有指定语言模块的对象
 */
export const loadModules = (lang = "zh") => {
  const context = require.context("./modules", true, /^.*\.json$/);

  return context
    .keys()
    .filter(path => path.indexOf(lang) !== -1)
    .reduce((modules, path) => {
      const moduleName = path.replace(`./${lang}/`, "").replace(/\.json$/, "");
      /**
       * 这里需要注意，因为我们的模块是使用export default导出的，所以需要使用context(path).default来获取模块对象
       * 改成 json 格式就不需要了，因为 json 格式的文件会被自动解析为对象
       */
      // modules[moduleName] = context(path).default;
      modules[moduleName] = context(path);
      return modules;
    }, {});
};
