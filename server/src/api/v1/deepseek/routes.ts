import express from 'express';
import deepseekController from './controller';

const router = express.Router();

router.get(
    '/:teamNumber/generateOverviewPrompt',
    deepseekController.generateTeamOverviewPrompt.bind(deepseekController)
);
router.get('/:teamNumber/overview', deepseekController.generateTeamOverview.bind(deepseekController));

export default router;
