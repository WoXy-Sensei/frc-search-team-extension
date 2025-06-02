import express from 'express';
import tbaRoutes from './TBA/routes';
import statboticsRoutes from './statbotics/routes';
import deepseekRoutes from './deepseek/routes';

const version = 'v1';
const router = express.Router();

router.use('/tba', tbaRoutes);
router.use('/statbotics', statboticsRoutes);
router.use('/deepseek', deepseekRoutes);

router.get('/', (req, res) => {
    res.json({
        message: `API ${version} root route`,
    });
});

export default router;
