import { z } from "zod";

export const PerformanceHistoryModel = z.object({
  id: z.string().optional(),
  period: z.string().optional(),
  value: z.number().int().min(0).max(100).optional(),

  blockId: z.string().min(1, "Block ID is required"),
});

export type PerformanceHistory = z.infer<typeof PerformanceHistoryModel>;
