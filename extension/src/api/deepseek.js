import instance, { AxiosError } from "./instance";
import axios from "axios";

export const generateTeamOverview = async (teamNumber) => {
  const response = await instance.get(`/deepseek/${teamNumber}/overview`);
  return response.data;
};

export const generateTeamOverviewPrompt = async (teamNumber) => {
  const response = await instance.get(`/deepseek/${teamNumber}/generateOverviewPrompt`);
  return response.data;
};


