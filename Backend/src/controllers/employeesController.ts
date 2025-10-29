import { Request, Response } from 'express';
import pool from '../db';

// ✅ GET all employees
export const getEmployees = async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employees ORDER BY id');
    res.json(rows);
  } catch (error: unknown) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// ✅ POST add new employee
export const addEmployee = async (req: Request, res: Response) => {
  const { name, department, salary, join_date } = req.body;
  try {
    await pool.query(
      'INSERT INTO employees (name, department, salary, join_date) VALUES (?, ?, ?, ?)',
      [name, department, salary, join_date]
    );
    res.json({ message: '✅ Employee added successfully' });
  } catch (error: unknown) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// ✅ GET workforce analysis
export const getWorkforceAnalysis = async (_req: Request, res: Response) => {
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
    res.status(500).json({ error: (error as Error).message });
  }
};
