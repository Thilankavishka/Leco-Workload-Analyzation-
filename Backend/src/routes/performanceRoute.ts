import { Router } from 'express';
import { analyzeTeamPerformance, getTopTeams } from '../controllers/performanceController';

const router = Router();

// GET full team performance analysis
router.get('/analysis', analyzeTeamPerformance);

// GET top 3 performing teams
router.get('/top', getTopTeams);

export default router;
