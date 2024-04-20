<template>
  <div class="layout">
    <AppMenu style="flex: 1; width: 20%; height: 100vh"></AppMenu>
    <div class="router-view">
      <router-view :key="route.currentRoute.fullPath"></router-view>
    </div>
  </div>
</template>

<script setup>
import AppMenu from "@/views/Menu/AppMenu.vue";
import route from "@/router";

defineOptions({
  name: "Layout"
});
</script>

<style scoped>
.layout {
  display: flex;
  height: 100%;
}
.router-view {
  width: 80%;
  height: 100%;
  margin: var(--margin-global);
}
</style>
