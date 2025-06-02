import { TbaTeam } from '@root/axios/tba/types';

export const formatLocation = (tbaTeamData: TbaTeam): string => {
    const locationParts: string[] = [];
    if (tbaTeamData.city) locationParts.push(tbaTeamData.city);
    if (tbaTeamData.state_prov) locationParts.push(tbaTeamData.state_prov);
    if (tbaTeamData.country) locationParts.push(tbaTeamData.country);
    return locationParts.join(', ');
};
