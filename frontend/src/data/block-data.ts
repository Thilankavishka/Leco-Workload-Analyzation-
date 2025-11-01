export interface Task {
  id: string;
  name: string;
  progress: number;
  priority: "high" | "medium" | "low";
  assignedTo: string[];
  startDate: string; // ISO date string (e.g., "2025-09-01")
  endDate: string | null; // Null if task is ongoing
}

export interface Employee {
  id: string;
  name: string;
  phone: string;
  role: string;
  performance: number;
  tasksCompleted: number;
  tasksAssigned: number;
}

export interface Block {
  id: string;
  name: string;
  employees: number;
  vehicles: number;
  tasks: { completed: number; total: number };
  ongoingTasks: Task[];
  staff: Employee[];
  performance: { monthly: number };
  performanceHistory: { period: string; value: number }[];
}

const blockData: { [key: string]: Block } = {
  
  
  };

export default blockData;