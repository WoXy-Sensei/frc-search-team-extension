<template>
  <div class="main_app">
    <div class="popup">
      <p class="author">Github : @WoXy-Sensei</p>
      <h1 class="title">Search Team</h1>
      <input
        type="text"
        placeholder="Enter Team Number"
        class="input input-bordered"
        maxlength="5"
        id="search-input"
        v-model="teamNumber"
        @input="debouncedSearch"
      />

      <div class="stats-section" id="stats-section" v-show="show">
        <div class="stat">
          <div class="stat-title">Team Name</div>
          <div class="stat-value" id="team-name">
            {{ team.name }}
          </div>
        </div>

        <div class="stats-row">
          <div class="stats stats-vertical shadow">
            <div class="stat">
              <div class="stat-title">Rookie Year</div>
              <div class="stat-value" id="team-rookie-year">
                {{ team.rookieYear }}
              </div>
            </div>

            <div class="stat">
              <div class="stat-title">Country</div>
              <div class="stat-value" id="team-country">
                {{ team.country }}
              </div>
            </div>

            <div class="stat">
              <div class="stat-title">Total Matches</div>
              <div class="stat-value" id="team-count-matches">
                {{ team.countMatches }}
              </div>
            </div>
          </div>
          <div class="stats stats-vertical shadow">
            <div class="stat">
              <div class="stat-title">Wins</div>
              <div class="stat-value" id="team-wins">
                {{ team.wins }}
              </div>
            </div>

            <div class="stat">
              <div class="stat-title">Losses</div>
              <div class="stat-value" id="team-losses">
                {{ team.losses }}
              </div>
            </div>

            <div class="stat">
              <div class="stat-title">Ties</div>
              <div class="stat-value" id="team-ties">
                {{ team.ties }}
              </div>
            </div>
          </div>
        </div>
        <div class="buttons gap-2 flex">
          <a
            target="_blank"
            id="statbotic"
            class="btn btn-error text-primary-content"
            :href="'https://www.statbotics.io/team/' + teamNumber"
            >Statbotics</a
          >
          <a
            target="_blank"
            id="theBlueAlliance"
            class="btn btn-info text-primary-content"
            :href="'https://www.thebluealliance.com/team/' + teamNumber"
            >The Blue Alliance</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTeamByNumber } from "@/api/statbotics";

export default {
  name: "PopupView",
  data() {
    return {
      teamNumber: "",
      show: false,
      team: {
        name: "",
        rookieYear: "",
        country: "",
        countMatches: "",
        wins: "",
        losses: "",
        ties: "",
      },
    };
  },
  methods: {
    debouncedSearch() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(async () => {
        this.show = false;
        const data = await getTeamByNumber(this.teamNumber);
        if (data.error) {
          this.show = false;
        } else {
          this.team.countMatches = data.count;
          this.team.country = data.country;
          this.team.losses = data.losses;
          this.team.name = data.name;
          this.team.rookieYear = data.rookie_year;
          this.team.ties = data.ties;
          this.team.wins = data.wins;
          this.show = true;
        }
      }, 400);
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scrollbar-width: none;
  font-family: "Poppins", sans-serif;
}

.main_app {
  border: 2px solid rgb(77, 77, 77);
  padding: 1rem;
}

.popup {
  width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.popup .title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}
.popup .author {
  opacity: 0.3;
  font-size: 0.8rem;
  color: #eee;
}
.popup .stats-section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;
  text-align: center;
}
.popup .stats-section .stat-value {
  font-size: 1.5rem;
}
.popup .stats-section .stats-row {
  display: flex;
  flex-direction: row;
}
.popup .stats-section #team-name .stat-value {
  font-size: 1.6rem;
}
</style>
