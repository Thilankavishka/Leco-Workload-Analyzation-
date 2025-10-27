import { Router, Request, Response } from 'express';
import pool from '../db';

const router = Router();

// ✅ GET all employees
router.get('/', async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employees ORDER BY id');
    res.json(rows);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: String(error) });
    }
  }
});

// ✅ POST add new employee
router.post('/', async (req: Request, res: Response) => {
  const { name, department, salary, join_date } = req.body;
  try {
    await pool.query(
      'INSERT INTO employees (name, department, salary, join_date) VALUES (?, ?, ?, ?)',
      [name, department, salary, join_date]
    );
    res.json({ message: '✅ Employee added' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: String(error) });
    }
  }
});

// ✅ GET workforce analysis
router.get('/analysis', async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(`
      SELECT department,
             COUNT(*) AS total_employees,
             ROUND(AVG(salary), 2) AS avg_salary
      FROM employees
      GROUP BY department
      ORDER BY avg_salary DESC
    `);
    res.json(rows);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: String(error) });
    }
  }
});

export default router;
