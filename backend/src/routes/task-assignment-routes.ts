/**
 * task-assignment-routes.ts
 * 
 * @updated 11/03/2025
 */

import express from "express";
import * as taskAssignmentService from "../services/task-assignment-service";

const router = express.Router();

// GET all assignments
router.get("/", async (req, res) => {
  const data = await taskAssignmentService.getAll();
  res.json(data);
});

// GET by ID
router.get("/:id", async (req, res) => {
  const data = await taskAssignmentService.getById(req.params.id);
  res.json(data);
});

// GET by Task ID
router.get("/task/:taskId", async (req, res) => {
  const data = await taskAssignmentService.getByTask(req.params.taskId);
  res.json(data);
});

// GET by Employee ID
router.get("/employee/:employeeId", async (req, res) => {
  const data = await taskAssignmentService.getByEmployee(req.params.employeeId);
  res.json(data);
});

// CREATE assignment
router.post("/", async (req, res) => {
  const data = await taskAssignmentService.create(req.body);
  res.status(201).json(data);
});

// DELETE assignment
router.delete("/:id", async (req, res) => {
  await taskAssignmentService.remove(req.params.id);
  res.json({ message: "Assignment deleted successfully" });
});

export default router;
