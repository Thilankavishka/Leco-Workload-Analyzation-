import { z } from "zod";
import { PerformanceHistoryModel } from "./performance-model";
import { TaskModel } from "./task-model";
import { EmployeeModel } from "./employee-model";

export const BlockModel = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Block name is required"),

  employeesCount: z.number().int().nonnegative().optional(),
  vehiclesCount: z.number().int().nonnegative().optional(),

  tasksCompleted: z.number().int().nonnegative().optional(),
  tasksTotal: z.number().int().nonnegative().optional(),

  performanceMonthly: z.number().int().min(0).max(100).optional(),

  performanceHistory: z.array(PerformanceHistoryModel).optional(),
  ongoingTasks: z.array(TaskModel).optional(),
  staff: z.array(EmployeeModel).optional(),

  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export type Block = z.infer<typeof BlockModel>;
