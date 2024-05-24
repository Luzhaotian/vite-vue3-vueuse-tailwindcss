import { createRouter, createWebHistory } from "vue-router";
import layout from "@/views/Layout/Layout.vue";
import { useSessionStorage } from "@vueuse/core";

const routes = [
  {
    component: layout,
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/Home.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login/index.vue")
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404.vue")
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/views/500.vue")
  },
  {
    path: "/:pathMath(.*)*", // 动态路由 配置
    component: () => import("@/views/404.vue")
  },
  {
    name: "user",
    component: layout,
    children: [
      {
        path: "/user",
        name: "user",
        component: () => import("@/views/user/index.vue")
      }
    ]
  },
  {
    name: "files",
    component: layout,
    children: [
      {
        path: "/files",
        name: "files",
        component: () => import("@/views/Files/index.vue")
      }
    ]
  }
];

// if (import.meta.env.VITE_USER_NODE_ENV == "development") {
//   routes.unshift({});
// }

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const userInfo = useSessionStorage("USER_INFO");
  const whiteList = ["login"];

  console.log(to.name, "router");

  if (to.name && whiteList.includes(to.name)) {
    if (router.hasRoute(to.name)) {
      next();
    } else {
      next("/404");
    }
  } else {
    if (userInfo.value) {
      next();
    } else {
      next("/login");
    }
  }
});

router.onError(err => {
  console.log(err, "RouterOnError");
});

export default router;
