/**
 * task-assignment-routes.ts
 * 
 * @updated 11/03/2025
 */

import express, { Request, Response } from "express";
import * as taskAssignmentService from "../services/task-assignment-service";

const router = express.Router();

// GET all assignments
router.get("/", async (req: Request, res: Response) => {
  const data = await taskAssignmentService.getAll();
  res.json(data);
});

// GET by ID
router.get("/:id", async (req: Request, res: Response) => {
  const data = await taskAssignmentService.getById(req.params.id);
  res.json(data);
});

// GET by Task ID
router.get("/task/:taskId", async (req: Request, res: Response) => {
  const data = await taskAssignmentService.getByTask(req.params.taskId);
  res.json(data);
});

// GET by Employee ID
router.get("/employee/:employeeId", async (req: Request, res: Response) => {
  const data = await taskAssignmentService.getByEmployee(req.params.employeeId);
  res.json(data);
});

// CREATE assignment
router.post("/", async (req: Request, res: Response) => {
  const data = await taskAssignmentService.create(req.body);
  res.status(201).json(data);
});

// Bulk create assignments
router.post("/bulk", async (req: Request, res: Response) => {
  try {
    const result = await taskAssignmentService.createAssignmentsBulk(req.body);
    res.status(201).json({
      message: "Task assignments created successfully",
      ...result,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE assignment
router.delete("/:id", async (req: Request, res: Response) => {
  await taskAssignmentService.remove(req.params.id);
  res.json({ message: "Assignment deleted successfully" });
});

export default router;
