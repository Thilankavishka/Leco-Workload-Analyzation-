import { Router } from 'express';
import { analyzeTeamPerformance, getTopTeams, analyzePerformanceByWorkType } from '../controllers/performanceController';

const router = Router();

router.get('/analysis', analyzeTeamPerformance);
router.get('/top', getTopTeams);
router.get('/work-type', analyzePerformanceByWorkType);

export default router;
