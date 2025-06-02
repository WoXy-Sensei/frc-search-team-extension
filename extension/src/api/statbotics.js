import instance from "./instance";

export const getTeam = async (teamNumber) => {
  const response = await instance.get(`/statbotics/${teamNumber}`);
  return response.data;
};

export const getTeamYear = async (teamNumber, year) => {
  const response = await instance.get(
    `/statbotics/${teamNumber}/years/${year}`,
  );
  return response.data;
};

export const getTeamRookieYear = async (teamNumber) => {
  const response = await instance.get(`/statbotics/${teamNumber}/rookieYear`);
  return response.data;
};

export const getTeamYears = async (teamNumber) => {
  const response = await instance.get(`/statbotics/${teamNumber}/years`);
  return response.data;
};

export const getTeamYearsCountryRanks = async (teamNumber) => {
  const response = await instance.get(`/statbotics/${teamNumber}/countryRanks`);
  return response.data;
};

export const getTeamYearsWorldRanks = async (teamNumber) => {
  const response = await instance.get(`/statbotics/${teamNumber}/worldRanks`);
  return response.data;
};
