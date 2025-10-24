import { Router } from 'express';
import { analyzeTeamPerformance, getTopTeams, analyzePerformanceByWorkType } from '../controllers/performanceController';

const router = Router();

// GET full team performance analysis
router.get('/analysis', analyzeTeamPerformance);

// GET top 3 performing teams
router.get('/top', getTopTeams);

// Analyze by work type
router.get('/work-type', analyzePerformanceByWorkType);

export default router;
