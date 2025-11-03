import { z } from "zod";

export const EmployeeModel = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Employee name is required"),
  phone: z.string().optional(),
  role: z.string().optional(),

  performance: z.number().int().min(0).max(100).optional(),
  tasksCompleted: z.number().int().nonnegative().optional(),
  tasksAssigned: z.number().int().nonnegative().optional(),

  blockId: z.string().min(1, "Block ID is required"),

  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export type Employee = z.infer<typeof EmployeeModel>;
