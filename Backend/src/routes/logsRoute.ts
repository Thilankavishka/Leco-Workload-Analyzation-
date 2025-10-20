// src/routes/logsRoute.ts
import { Router } from 'express';
import { getLogs } from '../controllers/logsController';

const router = Router();

// GET /logs?team_id=1 or /logs?log_id=100
router.get('/', getLogs);

export default router;
