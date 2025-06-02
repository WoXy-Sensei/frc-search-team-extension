import { generateTeamOverview } from "@/api/deepseek";
import {
  getTeamYears,
  getTeamYearsCountryRanks,
  getTeamYearsWorldRanks,
} from "@/api/statbotics";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTeamStore = defineStore("teamStore", () => {
  const team = ref(null);
  const teamCountryChart = ref(null);
  const teamWorldChart = ref(null);
  const availableYears = ref([]);
  const teamOverview = ref("");
  const teamOverviewIsLoading = ref(false);
  const isLoading = ref(false);
  const error = ref(null);

  const selectedYear = ref(0);
  const selectedTeam = ref(0);

  function $reset() {
    team.value = null;
    availableYears.value = [];
  }

  async function fetchAndSetTeam(teamNumber, year) {
    team.value = null;
    error.value = null;

    if (!teamNumber) {
      error.value = "Team number and year are required.";
      return;
    }

    isLoading.value = true;
    selectedYear.value = year;
    selectedTeam.value = teamNumber;

    try {
      const teamResponse = await getTeamYears(teamNumber);
      if (!year || year == 0) {
        team.value = teamResponse.data[0];
      } else {
        team.value = teamResponse.data.find((team) => team.year == year);
      }

      isLoading.value = false;

      availableYears.value = teamResponse.data.map((d) => {
        return d.year;
      });

      const countryChartResponse = await getTeamYearsCountryRanks(teamNumber);
      teamCountryChart.value = countryChartResponse.data;

      const worldChartResponse = await getTeamYearsWorldRanks(teamNumber);
      teamWorldChart.value = worldChartResponse.data;
    } catch (err) {
      error.value =
        err?.message || "An error occurred while fetching team data.";
    }
  }

  async function fetchTeamOverview() {
    if (!team.value.team) {
      error.value = "Team number are required.";
      return;
    }

    teamOverviewIsLoading.value = true;

    const response = await generateTeamOverview(team.value.team);

    teamOverview.value = response.data.overview;

    teamOverviewIsLoading.value = false;

  }

  return {
    team,
    teamCountryChart,
    teamWorldChart,
    availableYears,
    teamOverview,
    teamOverviewIsLoading,
    isLoading,
    error,
    fetchAndSetTeam,
    fetchTeamOverview,
    selectedYear,
    selectedTeam,
    $reset,
  };
});
