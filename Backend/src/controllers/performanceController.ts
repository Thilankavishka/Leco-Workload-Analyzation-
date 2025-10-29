import { Request, Response } from 'express';
import pool from '../db';

/**
 * Analyze team performance based on cost efficiency and time management
 * Returns average cost, efficiency, and time metrics per team.
 */
export const analyzeTeamPerformance = async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        t.team_id,
        COUNT(l.log_id) AS total_tasks,
        ROUND(AVG(l.estimated_cost), 2) AS avg_estimated_cost,
        ROUND(AVG(l.final_cost), 2) AS avg_final_cost,
        ROUND(AVG((l.estimated_cost - l.final_cost) / l.estimated_cost * 100), 2) AS cost_efficiency_percentage,
        ROUND(AVG(l.time_taken), 2) AS avg_time_hours,
        ROUND(SUM(l.time_taken), 2) AS total_hours_worked,
        ROUND(
          (AVG((l.estimated_cost - l.final_cost) / l.estimated_cost * 100) * 0.6) +
          ((100 - AVG(l.time_taken)) * 0.4), 
          2
        ) AS performance_score
      FROM Logs l
      JOIN Team t ON l.team_id = t.team_id
      GROUP BY t.team_id
      ORDER BY performance_score DESC;
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Get top performing teams (e.g., Top 3)
 */
export const getTopTeams = async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        t.team_id,
        ROUND(
          (AVG((l.estimated_cost - l.final_cost) / l.estimated_cost * 100) * 0.6) +
          ((100 - AVG(l.time_taken)) * 0.4), 
          2
        ) AS performance_score
      FROM Logs l
      JOIN Team t ON l.team_id = t.team_id
      GROUP BY t.team_id
      ORDER BY performance_score DESC
      LIMIT 3;
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const analyzePerformanceByWorkType = async (req: Request, res: Response) => {
  const workType = req.query.work_type as string;

  if (!workType) {
    return res.status(400).json({ error: 'work_type query parameter is required' });
  }

  try {
    const [rows] = await pool.query(`
      SELECT 
        t.team_id,
        COUNT(l.log_id) AS total_tasks,
        ROUND(AVG(l.estimated_cost), 2) AS avg_estimated_cost,
        ROUND(AVG(l.final_cost), 2) AS avg_final_cost,
        ROUND(AVG((l.estimated_cost - l.final_cost) / l.estimated_cost * 100), 2) AS cost_efficiency_percentage,
        ROUND(AVG(l.time_taken), 2) AS avg_time_hours,
        ROUND(
          (AVG((l.estimated_cost - l.final_cost) / l.estimated_cost * 100) * 0.6) +
          ((100 - AVG(l.time_taken)) * 0.4),
          2
        ) AS performance_score
      FROM Logs l
      JOIN Team t ON l.team_id = t.team_id
      WHERE l.type_of_work = ?
      GROUP BY t.team_id
      ORDER BY performance_score DESC;
    `, [workType]);

    return res.json(rows); 
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message }); 
  }
};
