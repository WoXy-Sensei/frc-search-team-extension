import instance, { AxiosError } from './instance';
import axios from 'axios';
import {
    StatboticsTeam,
    FetchTeamYearsResult,
    TeamYearStatbotics,
    FetchCountryRanksResult,
    CountryRankInfo,
    FetchWorldRanksResult,
    WorldRankInfo,
} from './types';
import ApiResponseError from '../../errors/ApiResponseError';

export const getTeamByTeamNumber = async (teamNumber: number): Promise<StatboticsTeam | ApiResponseError> => {
    if (!teamNumber) {
        throw new ApiResponseError({
            code: 400,
            message: 'Team key (teamKey) cannot be empty.',
        });
    }

    try {
        const response = await instance.get<StatboticsTeam>(`/team/${teamNumber}`);
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
                details: error.response?.data,
            });
        } else {
            throw new ApiResponseError({
                code: 500,
                message:
                    (err instanceof Error ? err.message : String(err)) || 'An unexpected client-side error occurred.',
            });
        }
    }
};

export const getTeamYearByTeamNumber = async (
    teamNumber: number,
    year: number
): Promise<TeamYearStatbotics | ApiResponseError> => {
    if (!teamNumber) {
        throw new ApiResponseError({
            code: 400,
            message: 'Team Number (teamNumber) cannot be empty.',
        });
    }
    if (!year) {
        throw new ApiResponseError({
            code: 400,
            message: 'Year (year) cannot be empty.',
        });
    }

    try {
        const response = await instance.get<TeamYearStatbotics>(`/team_year/${teamNumber}/${year}`);
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
                details: error.response?.data,
            });
        } else {
            throw new ApiResponseError({
                code: 500,
                message:
                    (err instanceof Error ? err.message : String(err)) || 'An unexpected client-side error occurred.',
            });
        }
    }
};

export const getTeamRookieYear = async (teamNumber: number): Promise<number | ApiResponseError> => {
    const response = await getTeamByTeamNumber(teamNumber);

    if ('rookie_year' in response && typeof response.rookie_year === 'number') {
        return response.rookie_year;
    } else {
        return new ApiResponseError({
            code: 404,
            message: `Rookie year data is invalid or missing for team ${teamNumber}.`,
            details: response instanceof ApiResponseError ? response.details : undefined,
        });
    }
};
export const getTeamDataForPreviousYears = async (teamNumber: number): Promise<FetchTeamYearsResult> => {
    let successfulData: TeamYearStatbotics[] = [];
    const errors: ApiResponseError[] = [];

    if (!teamNumber) {
        throw new ApiResponseError({
            code: 400,
            message: 'Team Number (teamNumber) cannot be empty.',
        });
    }

    const response = await instance.get<TeamYearStatbotics[] | null>(`/team_years?team=${teamNumber}`);
    if (response.status === 200 && response.data) {
        successfulData = response.data;
    }

    successfulData.sort((a, b) => a.year - b.year);
    return { years: successfulData, errors: errors };
};

export const getTeamCountryRanksForPreviousYears = async (teamNumber: number): Promise<FetchCountryRanksResult> => {
    const previousTeamData = await getTeamDataForPreviousYears(teamNumber);
    const countryRanks: CountryRankInfo[] = previousTeamData.years.map((teamYearData) => ({
        year: teamYearData.year,
        countryRank: teamYearData.epa.ranks.country.rank ?? null,
    }));

    return {
        years: countryRanks,
        errors: previousTeamData.errors,
    };
};

export const getTeamWorldRanksForPreviousYears = async (teamNumber: number): Promise<FetchWorldRanksResult> => {
    const previousTeamData = await getTeamDataForPreviousYears(teamNumber);
    const worldRanks: WorldRankInfo[] = previousTeamData.years.map((teamYearData) => ({
        year: teamYearData.year,
        worldRank: teamYearData.epa.ranks.total.rank ?? null,
    }));

    return {
        years: worldRanks,
        errors: previousTeamData.errors,
    };
};
