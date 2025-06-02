import instance, { AxiosError } from "./instance";
import axios from "axios";

export const getTeam = async (teamKey) => {
  const response = await instance.get(`/tba/${teamKey}`);
  return response.data;
};

export const getTeamRookieYear = async (teamKey) => {
  const response = await instance.get(`/statbotics/${teamKey}/awards`);
  return response.data;
};



