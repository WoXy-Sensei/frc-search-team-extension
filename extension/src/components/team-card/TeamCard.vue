<script setup>
import TeamCardHeader from "./header/TeamCardHeader.vue";
import TeamStats from "./stats/TeamStats.vue";
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useTeamStore } from "@/stores/teamStore";
import MechanicLoading from "@/components/loadings/MechanicLoading.vue";
import { RouterLink } from "vue-router";

const teamStore = useTeamStore();
const { team, teamCountryChart, teamWorldChart, isLoading, error } =
    storeToRefs(teamStore);

const dynamicTeamStatsData = computed(() => {
    if (!team.value || Object.keys(team.value).length === 0) return [];

    const currentTeam = team.value;
    const currentTeamCountryChart = teamCountryChart.value;
    const currentTeamWorldChart = teamWorldChart.value;

    return [
        [
            {
                label: "Country Rank",
                value: currentTeam.epa?.ranks?.country?.rank
                    ? `#${currentTeam.epa.ranks.country.rank}`
                    : "N/A",
                counterEffect: true,
                counterEffectData: {
                    start: 0,
                    end: currentTeam.epa?.ranks?.country?.rank || 0,
                },
                type: "DrawerLineChart",
                chartData: currentTeamCountryChart.years,
                chartTitle: "Country Rank Over Time",
                chartDescription: `Last Updated: ${new Date(currentTeamCountryChart.createdAt).toUTCString()}`,
                chartColor: "#ff0000",
                chartInfo: {
                    x: "year",
                    y: "countryRank",
                },
            },
            {
                label: "World Rank",
                value: currentTeam.epa?.ranks?.total?.rank
                    ? `#${currentTeam.epa.ranks.total.rank}`
                    : "N/A",
                counterEffect: true,
                counterEffectData: {
                    start: 0,
                    end: currentTeam.epa?.ranks?.total?.rank || 0,
                },
                type: "DrawerLineChart",
                chartData: currentTeamWorldChart.years,
                chartTitle: "World Rank Over Time",
                chartDescription: `Last Updated: ${new Date(currentTeamWorldChart.createdAt).toUTCString()}`,
                chartColor: "#0000ff",
                chartInfo: {
                    x: "year",
                    y: "worldRank",
                },
            },
        ],
        [
            {
                label: "EPA",
                value: currentTeam.epa?.total_points.mean
                    ? currentTeam.epa.total_points.mean
                    : "N/A",
                counterEffect: true,
                counterEffectData: {
                    start: 0,
                    end: currentTeam.epa?.total_points.mean || 0,
                    increment: 0.1,
                },
                type: "Box",
            },
            {
                label: "Rookie Year",
                value: currentTeam.rookie_year || "N/A",
            },
        ],
        [
            {
                value: currentTeam.country || "N/A",
                type: "Country",
                showMap: true,
                teamNumber: currentTeam.team,
            },
        ],
    ];
});
</script>

<template>
        <div
            class="flex flex-col gap-3 w-full border p-4 mt-3 h-full rounded-xl"
        >
            <div v-if="isLoading" class="text-center p-5 text-xl">
                <MechanicLoading />
            </div>
            <div v-else-if="error" class="text-center p-5 text-red-600 text-xl">
                Error: {{ error }} 😟
            </div>
            <div v-else-if="team && Object.keys(team).length > 0">
                <TeamCardHeader :name="team.name" :team-number="team.team" />
                <TeamStats :stats="dynamicTeamStatsData" class="mt-3" />
            </div>
            <div v-else class="text-center p-5 text-gray-500 text-xl">
                Please select a team.
            </div>
        </div>
</template>
