import { defineStore } from "pinia";

export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    groups: JSON.parse(localStorage.getItem("favorites:groups")) || {},
  }),

  getters: {
    allGroups: (state) => state.groups,
    allTeams: (state) => {
      return Object.values(state.groups).flat();
    },
  },

  actions: {
    saveToStorage() {
      localStorage.setItem("favorites:groups", JSON.stringify(this.groups));
    },

    addGroup(groupName) {
      if (!this.groups[groupName]) {
        this.groups[groupName] = [];
        this.saveToStorage();
      }
    },

    addTeamToGroup(groupName, team) {
      const teamNumber = team.team;

      if (!this.groups[groupName]) {
        this.groups[groupName] = [];
      }

      const exists = this.groups[groupName].some((t) => t.team === teamNumber);
      if (!exists) {
        this.groups[groupName].push(team);
        this.saveToStorage();
      }
    },

    removeTeamFromGroup(groupName, teamNumber) {
      if (this.groups[groupName]) {
        this.groups[groupName] = this.groups[groupName].filter(
          (t) => t.team !== teamNumber,
        );
        this.saveToStorage();
      }
    },

    removeGroup(groupName) {
      delete this.groups[groupName];
      this.saveToStorage();
    },
  },
});
