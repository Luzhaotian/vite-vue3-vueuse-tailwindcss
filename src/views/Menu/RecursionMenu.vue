<template>
  <template v-for="item in menuData" :key="item.id">
    <el-menu-item
      v-if="!item.children"
      :index="item.index"
      :class="[`${item.urlPath}_01`]"
      @click="item.urlPath ? routerLink(item) : null"
      >{{ isLang ? item.nameZh : item.nameEn }}</el-menu-item
    >
    <el-sub-menu v-else :index="item.index" :class="[`${item.urlPath}_01`]">
      <template #title>
        <span>{{ isLang ? item.nameZh : item.nameEn }}</span>
      </template>
      <RecursionMenu :menuData="item.children" />
    </el-sub-menu>
  </template>
</template>

<script setup>
import i18n from "@/libs/i18n.js";
import { computed } from "vue";
import { useRouter } from "vue-router";

defineProps({
  menuData: {
    type: Array,
    default: () => []
  }
});

// 获取路由
const router = useRouter();

const routerLink = ({ urlPath, index }) => {
  router.push({
    path: urlPath,
    query: {
      lang: i18n.global.locale,
      t: new Date().getTime(),
      index
    }
  });
};

const isLang = computed(
  () => i18n.global.locale,
  val => {
    return val === "CN";
  }
);
</script>

<style lang="scss" scoped></style>
