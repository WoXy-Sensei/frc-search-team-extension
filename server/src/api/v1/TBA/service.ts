import { getTeamAwards, getTeamByTeamKey } from '../../../axios/tba';
import axios from 'axios';

class TBAService {
    async getTeam(teamKey: string) {
        return await getTeamByTeamKey(teamKey);
    }
    async getTeamAwards(teamKey: string) {
        return await getTeamAwards(teamKey);
    }
    async getTeamImage(teamKey: string) {
        const url = `https://www.thebluealliance.com/avatar/2025/${teamKey}.png`;

        const response = await axios.get(url, {
            responseType: 'arraybuffer',
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36',
                Accept: 'image/webp,image/apng,image/*,*/*;q=0.8',
                Referer: 'https://www.thebluealliance.com/',
            },
        });

        return Buffer.from(response.data, 'binary');
    }
}

export default new TBAService();
