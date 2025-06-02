import { Response, Request } from 'express';
import deepseekService from './service';
import { ApiResponse } from '../types/ApiResponse';

class deepseekController {
    async generateTeamOverview(req: Request, res: Response<ApiResponse>) {
        const teamNumber = Number(req.params.teamNumber);
        const response = await deepseekService.generateOverview(teamNumber);
        res.status(200).json({
            status: true,
            data: response,
        });
    }
    async generateTeamOverviewPrompt(req: Request, res: Response<ApiResponse>) {
        const teamNumber = Number(req.params.teamNumber);
        const response = await deepseekService.generateTeamOverviewPrompt(teamNumber);
        res.status(200).json({
            status: true,
            data: response,
        });
    }
}
export default new deepseekController();
