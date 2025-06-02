<script setup>
import { RouterLink } from "vue-router";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRoute } from "vue-router";
import { ref, onMounted, watch } from "vue";

const route = useRoute();
const modelValue = ref("");

onMounted(async () => {
    modelValue.value = route.path;
});

watch(
    () => route.name,
    (newName) => {
        modelValue.value = newName;
    },
);
</script>

<template>
    <Tabs :modelValue="modelValue">
        <TabsList class="grid w-full grid-cols-2">
            <RouterLink to="/">
                <TabsTrigger value="search" class="w-full justify-center">
                    Search
                </TabsTrigger>
            </RouterLink>
            <RouterLink to="/favorites">
                <TabsTrigger value="favorites" class="w-full justify-center">
                    Favorites
                </TabsTrigger>
            </RouterLink>
        </TabsList>
    </Tabs>
</template>
