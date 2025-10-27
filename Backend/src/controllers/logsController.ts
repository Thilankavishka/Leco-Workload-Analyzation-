import { Request, Response } from 'express';
import pool from '../db';
import { RowDataPacket } from 'mysql2';

interface LogRow extends RowDataPacket {
  log_id: number;
  team_id: number;
  type_of_work: string;
  estimated_cost: number;
  final_cost: number;
  date_of_work: string;
  time_taken: number;
}

export const getLogs = async (req: Request, res: Response) => {
  const { team_id, log_id } = req.query;

  try {
    let query = 'SELECT * FROM Logs';
    const params: number[] = [];

    if (team_id) {
      query += ' WHERE team_id = ?';
      params.push(Number(team_id));
    } else if (log_id) {
      query += ' WHERE log_id = ?';
      params.push(Number(log_id));
    }

    const [rows] = await pool.query<LogRow[]>(query, params); // rows is now typed
    res.json(rows);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: String(error) });
    }
  }
};
