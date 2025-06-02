<script setup>
import { useColorMode } from "@vueuse/core";
import AppLayout from "@/layouts/AppLayout.vue";

const mode = useColorMode();
</script>

<template>
    <div class="main">
        <AppLayout>
            <RouterView />
        </AppLayout>
    </div>
</template>

<style>
.main {
    width: 385px;
    height: 510px;
    padding: 10px;
    overflow: none;
    user-select: none;
}
</style>
