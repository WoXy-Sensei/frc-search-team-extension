<script setup>
import { TeamInput, YearSelect } from "./input/";
import TeamSearchList from "./TeamSearchList.vue";
import { ref, watch, onMounted, computed, useTemplateRef } from "vue";
import { Command } from "@/components/ui/command";
import { useTeamStore } from "@/stores/teamStore";
import { useRoute } from "vue-router";

const open = ref(false);
const searchedTeam = ref("");
const searchResults = ref([]);
const isLoading = ref(false);
const fetchError = ref(null);
const allTeams = ref([]);
const teamsLoaded = ref(false);
const teamStore = useTeamStore();
const selectedTeamYear = ref(0);
const route = useRoute();
const inputRef = useTemplateRef("input");

const selectedTeamRookieYear = computed(() => {
    if (!teamStore.team?.rookie_year) {
        return 1999;
    }
    return teamStore.team.rookie_year;
});

async function loadTeams() {
    try {
        isLoading.value = true;
        const res = await fetch("/teams.json");
        if (!res.ok) throw new Error("Failed to load teams");
        const jsonData = await res.json();
        if (jsonData?.teams?.length) {
            allTeams.value = jsonData.teams;
            teamsLoaded.value = true;
        } else {
            throw new Error("Invalid team data");
        }
    } catch (error) {
        fetchError.value = error.message;
        allTeams.value = [];
    } finally {
        isLoading.value = false;
    }
}

function filterTeams(term) {
    const cleanTerm = term.trim().toLowerCase();
    if (!cleanTerm) return [];
    return allTeams.value
        .filter((team) => {
            const name = team.nickname?.toLowerCase() || "";
            const teamNumber = team.key?.replace("frc", "") || "";
            if (/^\d+$/.test(cleanTerm)) {
                return teamNumber.startsWith(cleanTerm);
            }
            return (
                name.includes(cleanTerm) ||
                team.key.toLowerCase().includes(cleanTerm) ||
                teamNumber.includes(cleanTerm)
            );
        })
        .slice(0, 25)
        .map((team) => ({
            key: team.key,
            nickname: team.nickname,
            teamNumber: team.key.replace("frc", ""),
        }));
}

function handleSearch() {
    if (!teamsLoaded.value) {
        loadTeams().then(() => {
            if (teamsLoaded.value) {
                searchResults.value = filterTeams(searchedTeam.value);
            }
        });
        return;
    }
    searchResults.value = filterTeams(searchedTeam.value);
}

watch(searchedTeam, (newVal) => {
    console.log(newVal);
    open.value = true;
    if (!newVal.trim()) {
        searchResults.value = [];
        return;
    }
    handleSearch();
});

watch(open, (isOpen) => {
    if (isOpen && searchedTeam.value.trim()) {
        handleSearch();
    } else {
        searchResults.value = [];
    }
});

onMounted(() => {
    if (!teamsLoaded.value) loadTeams();
});

const setTeamToStore = async (teamNumber, year) => {
    open.value = false;
    await teamStore.fetchAndSetTeam(teamNumber, year);
    if (year === 0 || !year) {
        selectedTeamYear.value = teamStore.availableYears[0];
    }
    searchedTeam.value = teamNumber;
};

const handleSearchListSelect = (teamNumber) => {
    selectedTeamYear.value = new Date().getFullYear();
    setTeamToStore(teamNumber, selectedTeamYear.value);
};

const handleYearChange = (year) => {
    setTeamToStore(searchedTeam.value, year);
};

const handleEnter = () => {
    inputRef.value.blur();
};

onMounted(async () => {
    if (route.params.teamNumber) {
        searchedTeam.value = route.params.teamNumber;
    }
});
</script>

<template>
    <Command>
        <div class="flex flex-row items-center justify-between gap-4 pr-3 pl-1">
            <TeamInput
                v-model:open="open"
                v-model="searchedTeam"
                @enter="handleEnter"
                ref="input"
            />
            <YearSelect
                :rookie-year="selectedTeamRookieYear"
                v-model="selectedTeamYear"
                @year-selected="handleYearChange"
            />
        </div>
        <TeamSearchList
            v-if="open"
            :items="searchResults"
            :loading="isLoading"
            :error="fetchError"
            @keydown.enter="console.log('test')"
            @selectedValue="handleSearchListSelect"
        />
    </Command>
</template>
