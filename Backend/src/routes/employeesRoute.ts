import { Router } from 'express';
import { getEmployees, addEmployee, getWorkforceAnalysis } from '../controllers/employeesController';

const router = Router();

router.get('/', getEmployees);
router.post('/', addEmployee);
router.get('/analysis', getWorkforceAnalysis);

export default router;
