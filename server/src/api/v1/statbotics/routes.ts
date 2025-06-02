import express from 'express';
import statboticsController from './controller';

const router = express.Router();

router.get('/:teamNumber', statboticsController.getTeam.bind(statboticsController));
router.get('/:teamNumber/rookieYear', statboticsController.getTeamRookieYear.bind(statboticsController));
router.get('/:teamNumber/years', statboticsController.getTeamYears.bind(statboticsController));
router.get('/:teamNumber/years/:year', statboticsController.getTeamYear.bind(statboticsController));
router.get('/:teamNumber/countryRanks', statboticsController.getTeamYearsCountryRanks.bind(statboticsController));
router.get('/:teamNumber/worldRanks', statboticsController.getTeamYearsWorldRanks.bind(statboticsController));

export default router;
