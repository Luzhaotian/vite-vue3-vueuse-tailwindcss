import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig(root => {
  const { command, mode, isPreview } = root;
  // 环境变量
  const viteEnv = loadEnv(mode, process.cwd());
  const isDevelopment = mode === "development";
  const isProd = mode === "production";
  return {
    // publicPath: "/vite-vue3-vueuse-tailwindcss/",
    // publicDir: "./public",
    /**
     * base
     * 如果是单点登录类似的项目
     * 注意 base 配置
     * 当前应用如是 子应用 './'
     * 当前应用是 主应用 '/'
     */
    // base: "./",
    base: "/vite-vue3-vueuse-tailwindcss/",
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/assets/scss/mixin.scss";` // 此处全局的scss文件
        }
      }
    },
    build: {
      minify: !isProd ? "" : "terser",
      terserOptions: {
        compress: {
          //生产环境时移除console.log(), console.info, console.warn, console.error, 或者直接赋值true移除一切console.*的代码
          drop_console: !isProd,
          drop_debugger: !isProd
        }
      },
      // watch: isPreview ? {} : null,
      // 指定输出目录
      outDir: "dist",
      // 打包时清空 dist 文件夹
      emptyOutDir: true,
      // 除了生产使用 sourcemap
      sourcemap: !(mode === "production"),
      // 启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
      reportCompressedSize: isDevelopment,
      // 规定触发警告的 chunk 大小。（以 kB 为单位）。它将与未压缩的 chunk 大小进行比较，因为 JavaScript 大小本身与执行时间相关。
      chunkSizeWarningLimit: 1000,
      // 指定打包规则
      rollupOptions: {
        input: {
          index: resolve(__dirname, "index.html")
        },
        // HACK 百度的打包规则 项目暂时还没有这么多东西 待后续增加或者修改
        output: {
          /**
           * (!) Some chunks are larger than 1000 kB after minification. Consider:
           * - Using dynamic import() to code-split the application
           * - Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
           * - Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
           * ✓ built in 21.00s
           * manualChunks 解决以上警告问题，也加速了页面加载速度
           */
          manualChunks(id) {
            // 方案 （1）
            // if (id.includes("node_modules")) {
            //  // console.log("before", id);
            //  // console.log(
            //  //  "after",
            //  //  id.toString().split("node_modules/")[1].split("/")[0].toString()
            //  // );
            //  return id.toString().split("node_modules/")[1].split("/")[0].toString();
            // }
            // 方案 （2）
            if (id.includes("node_modules")) {
              const arr = id.toString().split("node_modules/")[1].split("/");
              switch (arr[0]) {
                case "@naturefw": // 自然框架
                case "@popperjs":
                case "@vue":
                case "element-plus": // UI 库
                case "@element-plus": // 图标
                case "@vueuse": // 函数
                case "lodash": // lodash
                case "lodash-es": // lodash
                case "pinia": // pinia
                case "vue-i18n": // i18
                case "vue-router": // vue-router
                  return "_" + arr[0];
                  break;
                default:
                  return "__vendor";
                  break;
              }
            }
          },
          chunkFileNames: "js/luzhaotian-[hash].js",
          entryFileNames: "js/luzhaotian-[hash].js",
          assetFileNames: assetInfo => {
            if (assetInfo.type === "asset" && /\.(jpe?g|png|gif|svg)$/i.test(assetInfo.name)) {
              return "img/luzhaotian.[hash].[ext]";
            }
            if (assetInfo.type === "asset" && /\.(ttf|woff|woff2|eot)$/i.test(assetInfo.name)) {
              return "fonts/luzhaotian.[hash].[ext]";
            }
            return "[ext]/luzhaotian-[hash].[ext]";
          }
        }
      }
    },
    // 三方插件
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        // 解决报错
        // [unplugin-vue-components] component "Pages"(D:/xxxx/xxxx/src/components/GlobalComponents/Table/pages/index.vue) has naming conflicts with other components, ignored.
        directoryAsNamespace: true
      })
    ],
    // 别名
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        // 注意一定不要随意命名，a b c这样的，项目的目录也不能为关键字保留字！！
        "@comp": fileURLToPath(new URL("./src/components/", import.meta.url)),
        // 配置图片要这样引用
        "@image": fileURLToPath(new URL("./src/assets", import.meta.url))
        // "~": fileURLToPath(new URL("../", import.meta.url)),
      }
    },
    // 开发服务器
    server: {
      port: 8085,
      hmr: true,
      open: false,
      host: true,
      cors: true,
      force: true,
      proxy: {
        [`${viteEnv.VITE_APP_BASE_API}`]: {
          target: viteEnv.VITE_APP_BASE_HTTP,
          changeOrigin: true,
          rewrite: path => {
            // console.log(path, "path");
            return path.replace(/^\/dev-api/, "");
          },
          logLevel: "debug",
          secure: false
        }
      }
    }
  };
});
