<script setup>
import NavigationBar from "@/components/layout/NavigationBar.vue";
</script>

<template>
    <div class="layout">
        <header>
            <NavigationBar />
        </header>

        <main class="main-content mt-2">
            <slot />
        </main>
    </div>
</template>
