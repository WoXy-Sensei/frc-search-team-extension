import {
    getTeamByTeamNumber,
    getTeamCountryRanksForPreviousYears,
    getTeamDataForPreviousYears,
    getTeamRookieYear,
    getTeamWorldRanksForPreviousYears,
    getTeamYearByTeamNumber,
} from '../../../axios/statbotics';
import connectToDatabase from '../../../mongodb';
import CountryRanksModel from './model/CountryRanksModel';
import WorldRanksModel from './model/WorldRanksModel';
import TeamYearsModel from './model/TeamYearModel';

class statboticsService {
    async getTeam(teamNumber: number) {
        return await getTeamByTeamNumber(teamNumber);
    }
    async getTeamYear(teamNumber: number, year: number) {
        return await getTeamYearByTeamNumber(teamNumber, year);
    }
    async getTeamRookieYear(teamNumber: number) {
        const response = await getTeamRookieYear(teamNumber);
        return response;
    }
    async getTeamYears(teamNumber: number) {
        try {
            await connectToDatabase();
            const teamYearsEntry = await TeamYearsModel.findOne({ teamNumber: teamNumber });
            if (teamYearsEntry) {
                const now = new Date();
                const expiryDate = new Date(teamYearsEntry.expireAt);
                if (now <= expiryDate) {
                    return {
                        years: teamYearsEntry.years.reverse(),
                        createdAt: teamYearsEntry.createdAt,
                    };
                } else {
                    await TeamYearsModel.deleteOne({ teamNumber: teamNumber });
                }
            }
            const response = await getTeamDataForPreviousYears(teamNumber);
            
            // Expire Date Calculate
            const EXPIRE_DAY = 60;
            const currentDate = new Date();
            const expirationDate = new Date(currentDate);
            expirationDate.setDate(currentDate.getDate() + EXPIRE_DAY);
            const expireAt = expirationDate.toISOString();
            const createdAt = currentDate.toISOString();

            TeamYearsModel.create({
                teamNumber: teamNumber,
                years: response.years,
                expireAt: expireAt,
                createdAt: createdAt,
            });

            return {
                years: response.years.reverse(),
                createdAt: createdAt,
            };
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error('Completion failed: ' + error.message);
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    }
    async getTeamYearsCountryRank(teamNumber: number) {
        try {
            await connectToDatabase();
            const countryRanksEntry = await CountryRanksModel.findOne({ teamNumber: teamNumber });
            if (countryRanksEntry) {
                const now = new Date();
                const expiryDate = new Date(countryRanksEntry.expireAt);
                if (now <= expiryDate) {
                    return {
                        years: countryRanksEntry.years,
                        createdAt: countryRanksEntry.createdAt,
                        errors: [],
                    };
                } else {
                    await CountryRanksModel.deleteOne({ teamNumber: teamNumber });
                }
            }
            const response = await getTeamCountryRanksForPreviousYears(teamNumber);

            // Expire Date Calculate
            const EXPIRE_DAY = 2;
            const currentDate = new Date();
            const expirationDate = new Date(currentDate);
            expirationDate.setDate(currentDate.getDate() + EXPIRE_DAY);
            const expireAt = expirationDate.toISOString();
            const createdAt = currentDate.toISOString();

            CountryRanksModel.create({
                teamNumber: teamNumber,
                years: response.years,
                expireAt: expireAt,
                createdAt: createdAt,
            });

            return {
                years: response.years,
                createdAt: createdAt,
            };
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error('Completion failed: ' + error.message);
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    }
    async getTeamYearsWorldRank(teamNumber: number) {
        try {
            await connectToDatabase();
            const worldRanksEntry = await WorldRanksModel.findOne({ teamNumber: teamNumber });
            if (worldRanksEntry) {
                const now = new Date();
                const expiryDate = new Date(worldRanksEntry.expireAt);
                if (now <= expiryDate) {
                    return {
                        years: worldRanksEntry.years,
                        createdAt: worldRanksEntry.createdAt,
                    };
                } else {
                    await worldRanksEntry.deleteOne({ teamNumber: teamNumber });
                }
            }
            const response = await getTeamWorldRanksForPreviousYears(teamNumber);

            // Expire Date Calculate
            const EXPIRE_DAY = 2;
            const currentDate = new Date();
            const expirationDate = new Date(currentDate);
            expirationDate.setDate(currentDate.getDate() + EXPIRE_DAY);
            const expireAt = expirationDate.toISOString();
            const createdAt = currentDate.toISOString();

            WorldRanksModel.create({
                teamNumber: teamNumber,
                years: response.years,
                expireAt: expireAt,
                createdAt: createdAt,
            });

            return {
                years: response.years,
                createdAt: createdAt,
            };
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error('Completion failed: ' + error.message);
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    }
}

export default new statboticsService();
