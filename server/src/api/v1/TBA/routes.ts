import express from 'express';
import TBAController from './controller';

const router = express.Router();

router.get('/:teamKey', TBAController.getTeam.bind(TBAController));
router.get('/:teamKey/awards', TBAController.getTeamAwards.bind(TBAController));
router.get('/:teamKey/image', TBAController.getTeamImage.bind(TBAController));

export default router;
