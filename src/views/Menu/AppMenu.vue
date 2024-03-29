<template>
  <!-- active-text-color="#ffd04b" background-color="#545c64"   text-color="#fff"-->
  <el-menu class="el-menu-vertical-demo" unique-opened>
    <!-- menuDataList  -->
    <!-- <template v-for="item in menuStore.getMenu()" :key="item.id">
      <el-menu-item v-if="!item.children" :index="item.nameEn">{{
        isLang ? item.nameZh : item.nameEn
      }}</el-menu-item>
      <el-sub-menu v-else :index="item.nameEn">
        <template #title>
          <span>{{ isLang ? item.nameZh : item.nameEn }}</span>
        </template>

        <template v-for="ite in item.children" :key="ite.id">
          <el-menu-item
            v-if="!ite.children"
            @click="routerLink(ite.urlPath)"
            :index="ite.nameEn"
          >
            {{ isLang ? ite.nameZh : ite.nameEn }}
          </el-menu-item>

          <el-sub-menu v-if="ite.children" :index="ite.id">
            <template #title>{{ isLang ? ite.nameZh : ite.nameEn }}</template>
            <el-menu-item
              v-for="it in ite.children"
              :key="it.name"
              @click="routerLink(it.urlPath)"
              :index="it.nameEn"
            >
              {{ isLang ? it.nameZh : it.nameEn }}
            </el-menu-item>
          </el-sub-menu>
        </template>
      </el-sub-menu>
    </template> -->
    <!-- 递归组件 -->
    <RecursionMenu :menuData="menu" />
  </el-menu>
</template>

<script setup>
import RecursionMenu from "@/views/Menu/RecursionMenu.vue";
// import { computed } from "vue";
// import { useRouter } from "vue-router";
import { useMenuStore } from "@/stores/menu.js";
import menu from '@/router/menu.js'

// import i18n from "@/libs/i18n.js";

// 获取路由
// const router = useRouter();
const menuStore = useMenuStore();

// const routerLink = (path) => {
//   router.push({
//     path,
//     query: {
//       lang: i18n.global.locale,
//       t: new Date().getTime(),
//     },
//   });
// };

// const isLang = computed(
//   () => i18n.global.locale,
//   (val) => {
//     return val === "CN";
//   }
// );
</script>
