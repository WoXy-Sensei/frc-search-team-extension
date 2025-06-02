import { TbaTeam, TeamAward } from '../../../axios/tba/types';
import { OpenAI } from 'openai';
import { formatLocation } from './utils/formatLocation';
import { teamOverviewSystemPrompt } from './prompts';
import OverviewModel from './model/OverviewModel';
import connectToDatabase from '../../../mongodb';
import { getTeamAwards, getTeamByTeamKey } from '../../../axios/tba';
import { getTeamDataForPreviousYears } from '../../../axios/statbotics';

const systemPrompt = teamOverviewSystemPrompt;

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY,
});

class deepseekService {
    generateOverview = async (teamNumber: number) => {
        try {
            await connectToDatabase();
            const overviewEntry = await OverviewModel.findOne({ teamNumber: teamNumber });
            if (overviewEntry) {
                const now = new Date();
                const expiryDate = new Date(overviewEntry.expireAt);
                if (now <= expiryDate) {
                    return {
                        overview: overviewEntry.generatedOverview,
                        createdAt: overviewEntry.createdAt,
                    };
                } else {
                    await OverviewModel.deleteOne({ teamNumber: teamNumber });
                }
            }

            // Generate Overview
            const genereatedPrompt = await this.generateTeamOverviewPrompt(teamNumber);
            const completion = await openai.chat.completions.create({
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: genereatedPrompt },
                ],
                model: 'deepseek-chat',
            });

            const generatedOverview = completion.choices[0].message.content;

            // Expire Date Calculate
            const EXPIRE_DAY = 30;
            const currentDate = new Date();
            const expirationDate = new Date(currentDate);
            expirationDate.setDate(currentDate.getDate() + EXPIRE_DAY);
            const expireAt = expirationDate.toISOString();
            const createdAt = currentDate.toISOString();

            OverviewModel.create({
                AI: 'deepseek',
                teamNumber: teamNumber,
                prompt: genereatedPrompt,
                generatedOverview: generatedOverview,
                createdAt: createdAt,
                expireAt: expireAt,
            });



            return {
                overview: generatedOverview,
                createdAt: createdAt,
            };
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error('Completion failed: ' + error.message);
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    };

    // createStreamingCompletion = async (message: string) => {
    //     try {
    //         const stream = await openai.chat.completions.create({
    //             messages: [
    //                 { role: 'system', content: systemPrompt },
    //                 { role: 'user', content: message },
    //             ],
    //             model: 'deepseek-chat',
    //             stream: true,
    //         });

    //         return stream;
    //     } catch (error: unknown) {
    //         if (error instanceof Error) {
    //             throw new Error('Completion failed: ' + error.message);
    //         } else {
    //             throw new Error('An unknown error occurred');
    //         }
    //     }
    // };
    generateTeamOverviewPrompt = async (teamNumber: number) => {
        const teamKey = `frc${teamNumber}`;

        const tbaTeamResponse = await getTeamByTeamKey(teamKey);
        if ('error' in tbaTeamResponse || !tbaTeamResponse) {

            return 'Error: Could not retrieve essential team data from The Blue Alliance.';
        }
        const tbaTeamData = tbaTeamResponse as TbaTeam;

        if (tbaTeamData.rookie_year === undefined || tbaTeamData.rookie_year === null) {

            return `Error: Rookie year not available for team ${teamKey}.`;
        }

        // Fetch last ALL years of Statbotics data.
        const statboticsResponse = await getTeamDataForPreviousYears(teamNumber);

        const statboticsYearsData = statboticsResponse.years;

        // Assuming tba.getTeamAwards fetches the awards correctly.
        const tbaAwardsResponse = await getTeamAwards(teamKey);
        let tbaTeamAwards: TeamAward[] = [];
        if ('error' in tbaAwardsResponse || !tbaAwardsResponse) {
            console.warn('Failed to fetch TBA awards data:', tbaAwardsResponse);
        } else {
            tbaTeamAwards = tbaAwardsResponse as TeamAward[];
        }

        const currentYear = new Date().getFullYear();
        const lastTenYearsStart = currentYear - 9;

        let dataBlockString = `**Provided Information:**

          * **Team Name:** ${tbaTeamData.nickname || 'N/A'}
          * **Team Number:** ${teamNumber}
          * **Location:** ${formatLocation(tbaTeamData)}
          * **Founding Date (Rookie Year):** ${tbaTeamData.rookie_year}
          `;

        const recentStatboticsData = statboticsYearsData
            .filter((yearData) => yearData.year >= lastTenYearsStart && yearData.year <= currentYear)
            .sort((a, b) => b.year - a.year) // Sort by most recent year first
            .slice(0, 10);

        dataBlockString += '\n* **Last 10 Years Country Rankings (Statbotics):**\n';
        if (recentStatboticsData.length > 0) {
            recentStatboticsData.forEach((yearData) => {
                const countryRank = yearData.epa?.ranks?.country?.rank;
                const rankStr = countryRank !== undefined && countryRank !== null ? countryRank.toString() : 'No Data';
                dataBlockString += `    * ${yearData.year}: ${rankStr}\n`;
            });
        } else {
            dataBlockString += '    * No country ranking data available for the specified period.\n';
        }

        dataBlockString += '\n* **Last 10 Years World Rankings (Statbotics):**\n';
        if (recentStatboticsData.length > 0) {
            recentStatboticsData.forEach((yearData) => {
                const worldRank = yearData.epa?.ranks?.total?.rank;
                const rankStr = worldRank !== undefined && worldRank !== null ? worldRank.toString() : 'No Data';
                dataBlockString += `    * ${yearData.year}: ${rankStr}\n`;
            });
        } else {
            dataBlockString += '    * No world ranking data available for the specified period.\n';
        }

        dataBlockString += '\n* **Last 10 Years EPA Values (Statbotics Unitless EPA):**\n';
        if (recentStatboticsData.length > 0) {
            recentStatboticsData.forEach((yearData) => {
                const epaValue = yearData.epa?.total_points.mean;
                const epaStr = epaValue !== undefined && epaValue !== null ? epaValue.toFixed(2) : 'No Data';
                dataBlockString += `    * ${yearData.year}: ${epaStr}\n`;
            });
        } else {
            dataBlockString += '    * No EPA data available for the specified period.\n';
        }

        const recentAwards = tbaTeamAwards
            .filter((award) => award.year >= lastTenYearsStart && award.year <= currentYear)
            .sort((a, b) => b.year - a.year); // Sort by most recent year first

        dataBlockString += '\n* **All Awards Received in the Last 10 Years:**\n';
        if (recentAwards.length > 0) {
            recentAwards.forEach((award) => {
                dataBlockString += `    * ${award.year} - ${award.name} (Event: ${award.event_key})\n`;
            });
        } else {
            dataBlockString += '    * No award data available for the specified period.\n';
        }

        return dataBlockString;
    };
}

export default new deepseekService();
