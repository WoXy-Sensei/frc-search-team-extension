import instance from "./axios";

export const getTeamByNumber = async (teamNumber) => {
  try {
    const response = await instance.get(`/team/${teamNumber}`);
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response.data.message,
    };
  }
};
