// src/types/index.ts
export interface Log {
  log_id: number;
  team_id: number;
  type_of_work: string;
  estimated_cost: number;
  final_cost: number;
  date_of_work: string;
  time_taken: number;
}

export interface PerformanceData {
  team_id: number;
  total_tasks: number;
  avg_estimated_cost: number;
  avg_final_cost: number;
  cost_efficiency_percentage: number;
  avg_time_hours: number;
  total_hours_worked: number;
  performance_score: number;
}

export interface TopTeam {
  team_id: number;
  performance_score: number;
}

export interface Employee {
  id: number;
  name: string;
  department: string;
  salary: number;
  join_date: string;
}

export interface WorkforceAnalysisData {
  department: string;
  total_employees: number;
  avg_salary: number;
}

export interface NewEmployee {
  name: string;
  department: string;
  salary: number;
  join_date: string;
}