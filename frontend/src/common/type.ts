export type Priority = "HIGH" | "MEDIUM" | "LOW" | "high" | "medium" | "low"

export interface Task {
  id: string;
  name: string;
  progress: number;
  assignedTo: string[];
  startDate: string;
  endDate?: string | null;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  phone: string;
  performance: number;
}

export interface Block {
  id: string;
  name: string;
  staff: Employee[];
  ongoingTasks: Task[];
}

