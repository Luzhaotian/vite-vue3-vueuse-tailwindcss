import { createRouter, createWebHistory } from "vue-router";
import layout from "@/views/Layout/Layout.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login/index.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404.vue"),
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/views/500.vue"),
  },
  {
    path: "/:pathMath(.*)*", // 动态路由 配置
    component: () => import("@/views/404.vue"),
  },
  {
    name: "user",
    component: layout,
    children: [
      {
        path: "/user",
        name: "user",
        component: () => import("@/views/user/index.vue"),
      },
    ],
  },
];

if (import.meta.env.VITE_USER_NODE_ENV == "development") {
  routes.unshift({
    component: layout,
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/Home.vue"),
      },
    ],
  });
}

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes,
});

router.onError((err) => {
  console.log(err, "RouterOnError");
});

export default router;
