/**
 * performance-history-routes.ts
 * 
 * @updated 11/03/2025
 */

import express from "express";
import * as performanceHistoryService from "../services/performance-history-service";

const router = express.Router();

// GET all
router.get("/", async (req, res) => {
  const data = await performanceHistoryService.getAll();
  res.json(data);
});

// GET by ID
router.get("/:id", async (req, res) => {
  const data = await performanceHistoryService.getById(req.params.id);
  res.json(data);
});

// GET by Block ID
router.get("/block/:blockId", async (req, res) => {
  const data = await performanceHistoryService.getByBlock(req.params.blockId);
  res.json(data);
});

// CREATE
router.post("/", async (req, res) => {
  const data = await performanceHistoryService.create(req.body);
  res.status(201).json(data);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const data = await performanceHistoryService.update(req.params.id, req.body);
  res.json(data);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await performanceHistoryService.remove(req.params.id);
  res.json({ message: "Record deleted successfully" });
});

export default router;
