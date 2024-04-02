<template>
	<div class="layout">
		<AppMenu style="width: 20%; height: 100vh; flex: 1"></AppMenu>
		<div class="router-view">
			<router-view :key="route.currentRoute.fullPath"></router-view>
		</div>
	</div>
</template>

<script setup>
import AppMenu from "@/views/Menu/AppMenu.vue";
import route from "@/router";
</script>

<style scoped>
.layout {
	height: 100%;
	display: flex;
}

.router-view {
	width: 80%;
	height: 100%;
	margin: var(--margin-global);
}
</style>
