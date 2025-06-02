import { Response, Request } from 'express';
import statboticsService from './service';
import { ApiResponse } from '../types/ApiResponse';

class statboticsController {
    async getTeam(req: Request, res: Response<ApiResponse>) {
        const teamNumber = Number(req.params.teamNumber);
        const response = await statboticsService.getTeam(teamNumber);
        res.status(200).json({
            status: true,
            data: response,
        });
    }
    async getTeamYear(req: Request, res: Response<ApiResponse>) {
        const teamNumber = Number(req.params.teamNumber);
        const year = Number(req.params.year);
        const response = await statboticsService.getTeamYear(teamNumber, year);
        res.status(200).json({
            status: true,
            data: response,
        });
    }
    async getTeamRookieYear(req: Request, res: Response<ApiResponse>) {
        const teamNumber = Number(req.params.teamNumber);
        const response = await statboticsService.getTeamRookieYear(teamNumber);
        res.status(200).json({
            status: true,
            data: response,
        });
    }
    async getTeamYears(req: Request, res: Response<ApiResponse>) {
        const teamNumber = Number(req.params.teamNumber);
        const response = await statboticsService.getTeamYears(teamNumber);
        res.status(200).json({
            status: true,
            data: response.years,
        });
    }
    async getTeamYearsCountryRanks(req: Request, res: Response<ApiResponse>) {
        const teamNumber = Number(req.params.teamNumber);
        const response = await statboticsService.getTeamYearsCountryRank(teamNumber);
        res.status(200).json({
            status: true,
            data: {
                years: response.years,
                createdAt: response.createdAt,
            },
        });
    }
    async getTeamYearsWorldRanks(req: Request, res: Response<ApiResponse>) {
        const teamNumber = Number(req.params.teamNumber);
        const response = await statboticsService.getTeamYearsWorldRank(teamNumber);
        res.status(200).json({
            status: true,
            data: {
                years: response.years,
                createdAt: response.createdAt,
            },
        });
    }
}
export default new statboticsController();
