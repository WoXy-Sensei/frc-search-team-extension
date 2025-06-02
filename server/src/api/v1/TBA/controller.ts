import { Response, Request } from 'express';
import TBAService from './service';
import { ApiResponse } from '../types/ApiResponse';

class TBAController {
    async getTeam(req: Request, res: Response<ApiResponse>) {
        const teamKey = req.params.teamKey;
        const response = await TBAService.getTeam(teamKey);
        res.status(200).json({
            status: true,
            data: response,
        });
    }
    async getTeamAwards(req: Request, res: Response<ApiResponse>) {
        const teamKey = req.params.teamKey;
        const response = await TBAService.getTeamAwards(teamKey);
        res.status(200).json({
            status: true,
            data: response,
        });
    }

    async getTeamImage(req: Request, res: Response) {
        const teamKey = req.params.teamKey;

        try {
            const imageBuffer = await TBAService.getTeamImage(teamKey);
            res.set('Content-Type', 'image/png');
            res.set('Cross-Origin-Resource-Policy', 'cross-origin');
            res.send(imageBuffer);
        } catch  {
            res.status(500).send('Could not fetch image');
        }
    }
}
export default new TBAController();
