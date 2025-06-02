<script setup>
import { computed } from "vue";
import { useFavoritesStore } from "@/stores/favoritesStore";
import FavoriteTeamCard from "./FavoriteTeamCard.vue";

const props = defineProps({
    selectedGroup: {
        type: String,
        required: true,
    },
});

const favoritesStore = useFavoritesStore();

const teams = computed(() => {
    return favoritesStore.groups[props.selectedGroup] || [];
});
</script>

<template>
    <div
        v-if="teams.length <= 0 && selectedGroup != null"
        class="opacity-50 text-center py-4"
    >
        No teams in this group.
    </div>
    <transition-group
        v-else
        name="slide-fade"
        tag="div"
        class="overflow-y-scroll h-[400px]"
    >
        <FavoriteTeamCard
            v-for="team in teams"
            :key="team.team"
            :team="team"
            @remove="
                favoritesStore.removeTeamFromGroup(
                    props.selectedGroup,
                    team.team,
                )
            "
        />
    </transition-group>
</template>

<style scoped>
.slide-fade-move {
    transition: transform 0.3s ease;
}

.slide-fade-leave-active {
    transition: all 0.3s ease;
    position: absolute;
}

.slide-fade-leave-to {
    opacity: 0;
    transform: translateX(-100%);
}
</style>
