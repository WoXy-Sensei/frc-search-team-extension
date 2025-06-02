<script setup>
import GroupSelector from "@/components/favorites/GroupSelector.vue";
import FavoriteTeamsList from "@/components/favorites/FavoriteTeamsList.vue";
import { Button } from "@/components/ui/button";
import { ref } from "vue";
import { X } from "lucide-vue-next";
import { useFavoritesStore } from "@/stores/favoritesStore";

const selectedGroup = ref(null);
const favoritesStore = useFavoritesStore();

const handleDelete = () => {
    favoritesStore.removeGroup(selectedGroup.value);
    selectedGroup.value = null;
};
</script>

<template>
    <div>
        <GroupSelector v-model="selectedGroup" class="mb-6" />
        <FavoriteTeamsList :selectedGroup="selectedGroup" />
        <Button
            variant="destructive"
            size="icon"
            class="fixed bottom-4 right-4 rounded-full shadow-lg w-12 h-12 p-0 flex items-center justify-center cursor-pointer"
            @click="handleDelete"
            v-if="selectedGroup != null"
        >
            <X class="w-5 h-5" />
        </Button>
    </div>
</template>
