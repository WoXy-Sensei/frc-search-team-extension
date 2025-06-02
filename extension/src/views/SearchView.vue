<script setup>
import TeamSearch from "@/components/team-search/TeamSearch.vue";
import TeamCard from "@/components/team-card/TeamCard.vue";
import { onMounted } from "vue";
import { useTeamStore } from "@/stores/teamStore";
import { useRoute } from "vue-router";

const teamStore = useTeamStore();
const route = useRoute();

onMounted(async () => {
    teamStore.$reset();
    if (route.query.teamNumber) {
        await teamStore.fetchAndSetTeam(
            route.query.teamNumber,
            new Date().getFullYear(),
        );
    }
});
</script>

<template>
    <div>
        <TeamSearch />
        <TeamCard />
    </div>
</template>
