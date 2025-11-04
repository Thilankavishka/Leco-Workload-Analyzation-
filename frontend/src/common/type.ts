/**
 * type.ts
 * 
 * @updated 11/04/2025
 */
export type Priority = "HIGH" | "MEDIUM" | "LOW" | "high" | "medium" | "low"

export interface Block {
  id?: string
  name: string

  employeesCount?: number
  vehiclesCount?: number

  tasksCompleted?: number
  tasksTotal?: number

  performanceMonthly?: number

  performanceHistory?: PerformanceHistory[]
  ongoingTasks?: Task[]
  staff?: Employee[]

  createdAt?: string
  updatedAt?: string
}

export interface Employee {
  id: string
  name: string
  phone?: string
  role?: string

  performance?: number
  tasksCompleted?: number
  tasksAssigned?: number

  blockId: string

  createdAt?: string
  updatedAt?: string
}

export interface PerformanceHistory {
  id?: string
  period?: string
  value?: number
  blockId: string
}

export interface Task {
  id?: string
  name: string
  progress?: number
  priority?: Priority
  startDate: string
  endDate?: string | null

  blockId: string
  assignedTo?: string[]

  createdAt?: string
  updatedAt?: string
}