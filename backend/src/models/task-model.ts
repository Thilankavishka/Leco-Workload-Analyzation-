/**
 * task-model.ts
 * 
 * @update 11/03/2025
 */
import { Priority } from "@prisma/client";
import { z } from "zod";

export const TaskModel = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Task name is required"),
  progress: z.number().min(0).max(100).optional(),
  priority: z.nativeEnum(Priority).optional(),
  startDate: z.string().datetime({ message: "Invalid start date format" }),
  endDate: z.string().datetime().nullable().optional(),

  blockId: z.string().min(1, "Block ID is required"),
  assignedTo: z.array(z.string()).optional(),

  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export type Task = z.infer<typeof TaskModel>;
