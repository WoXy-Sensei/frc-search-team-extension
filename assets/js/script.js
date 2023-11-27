const getTeamByNumber = async (teamNumber) => {
  const team = await fetch(`https://api.statbotics.io/v2/team/${teamNumber}`);
  const json = await team.json();
  return json;
};

const isShow = false;
const searchInput = document.getElementById("search-input");
const statsSection = document.getElementById("stats-section");
const teamCountry = document.getElementById("team-country");
const teamName = document.getElementById("team-name");
const teamRookieYear = document.getElementById("team-rookie-year");
const teamWins = document.getElementById("team-wins");
const teamLosses = document.getElementById("team-losses");
const teamTies = document.getElementById("team-ties");
const teamCountMatches = document.getElementById("team-count-matches");
const statboticLink = document.getElementById("statbotic");
const theBlueAllianceLink = document.getElementById("theBlueAlliance");

const setTeamData = async (_teamNumber) => {
  const team = await getTeamByNumber(_teamNumber);
  if(team.name === undefined) return;
  teamName.innerText = team.name;
  teamCountry.innerText = team.country;
  teamRookieYear.innerText = team.rookie_year;
  teamWins.innerText = team.wins;
  teamLosses.innerText = team.losses;
  teamTies.innerText = team.ties;
  teamCountMatches.innerText = team.count;
  statboticLink.href = `https://statbotics.io/${team.team}`;
  theBlueAllianceLink.href = `https://www.thebluealliance.com/team/${team.team}`;
  statsSection.style.display = "flex";
};

searchInput.addEventListener("keyup", async (e) => {
  if (e.target.value.length >= 3) {
    setTeamData(e.target.value);
  }
  if(e.target.value.length === 0){
    statsSection.style.display = "none";
  }
});

statsSection.style.display = "none";
