import instance, { AxiosError } from './instance';
import axios from 'axios';
import { TbaTeam, TeamAward } from './types';
import ApiResponseError from '../../errors/ApiResponseError';

export const getTeamByTeamKey = async (teamKey: string): Promise<TbaTeam | ApiResponseError> => {
    if (!teamKey) {
        throw new ApiResponseError({
            code: 400,
            message: 'Team key (teamKey) cannot be empty.',
        });
    }

    try {
        const response = await instance.get<TbaTeam>(`/team/${teamKey}`);
        return response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const error = err as AxiosError<any>;
            const message =
                error.response?.data?.Error ||
                error.response?.data?.message ||
                error.message ||
                'An unknown error occurred while fetching team information.';
            throw new ApiResponseError({
                code: error.response?.status || 500,
                message: message,
            });
        } else {
            throw new ApiResponseError({
                code: 500,
                message: (err instanceof Error ? err.message : String(err)) || 'An unexpected error occurred.',
            });
        }
    }
};

export const getTeamAwards = async (teamKey: string): Promise<TeamAward[] | ApiResponseError> => {
    if (!teamKey) {
        throw new ApiResponseError({
            code: 400,
            message: 'Team key (teamKey) cannot be empty.',
        });
    }

    try {
        const response = await instance.get<TeamAward[]>(`/team/${teamKey}/awards`);
        return response.data;
    } catch (err) {
        let errorMessage = `Failed to fetch awards for team ${teamKey}.`;
        let errorStatus: number | undefined;

        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError<any>;
            errorStatus = axiosError.response?.status;

            errorMessage =
                axiosError.response?.data?.Error ||
                axiosError.response?.data?.message ||
                axiosError.message ||
                errorMessage;

            if (errorStatus === 404) {
                errorMessage = `No awards found (404) for team ${teamKey}.`;
            }
        } else {
            errorMessage = (err instanceof Error ? err.message : String(err)) || errorMessage;
            errorStatus = 500;
        }

        throw new ApiResponseError({
            code: errorStatus || 500,
            message: errorMessage,
        });
    }
};
