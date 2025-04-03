export const loadModules = lang => {
  const modules = import.meta.glob(`../locales/**/*.json`, {
    import: "default",
    eager: true
  });
  return Object.entries(modules).reduce((acc, [filePath, module]) => {
    const [_, fileLang, modulePath] =
      filePath.match(new RegExp(`modules\/(.+?)\/(.+).json$`)) || [];
    if (fileLang !== lang) return acc;
    const key = modulePath.replace(/\//g, ".");

    return { ...acc, [key]: module };
  }, {});
};
