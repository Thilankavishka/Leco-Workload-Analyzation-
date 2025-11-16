/**
 * performance-history-routes.ts
 * 
 * @updated 11/16/2025
 */

import express, { Request, Response } from "express";
import * as performanceHistoryService from "../services/performance-history-service";

const router = express.Router();

// GET all
router.get("/", async (req: Request, res: Response) => {
  const data = await performanceHistoryService.getAll();
  res.json(data);
});

// GET by ID
router.get("/:id", async (req: Request, res: Response) => {
  const data = await performanceHistoryService.getById(req.params.id);
  res.json(data);
});

// GET by Block ID
router.get("/block/:blockId", async (req: Request, res: Response) => {
  const data = await performanceHistoryService.getByBlock(req.params.blockId);
  res.json(data);
});

-// Single create
router.post("/", async (req: Request, res: Response) => {
  try {
    const data = await performanceHistoryService.create(req.body);
    res.status(201).json(data);
  } catch (error: any) {
    console.error("Single create error:", error);
    res.status(400).json({ message: error.message });
  }
});

// Bulk create
router.post("/bulk", async (req: Request, res: Response) => {
  try {
    const records = req.body;
    const result = await performanceHistoryService.createRecordsBulk(records);
    res.status(201).json({ message: "Records created", createdCount: result.count });
  } catch (error: any) {
    console.error("Bulk create error:", error);
    res.status(400).json({ message: error.message });
  }
});

// UPDATE
router.put("/:id", async (req: Request, res: Response) => {
  const data = await performanceHistoryService.update(req.params.id, req.body);
  res.json(data);
});

// DELETE
router.delete("/:id", async (req: Request, res: Response) => {
  await performanceHistoryService.remove(req.params.id);
  res.json({ message: "Record deleted successfully" });
});

export default router;
