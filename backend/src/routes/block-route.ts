/**
 * block-route.ts
 * 
 * @update 11/03/2025
 */
import { Router, Request, Response } from "express";
import * as BlockService from "../services/block-service";

const router = Router();

// Get all blocks
router.get("/", async (req: Request, res: Response) => {
    try {
        const blocks = await BlockService.getAllBlocks();
        res.status(200).json(blocks);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Get block by ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const block = await BlockService.getBlockById(req.params.id);
        res.status(200).json(block);
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
});

// Create new block
router.post("/", async (req: Request, res: Response) => {
    try {
        const block = await BlockService.createBlock(req.body);
        res.status(201).json(block);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

// Update block
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const updated = await BlockService.updateBlock(req.params.id, req.body);
        res.status(200).json(updated);
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
});

// Delete block
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        await BlockService.deleteBlock(req.params.id);
        res.status(200).json({ message: "Block deleted successfully" });
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
});

// Get all employees in a block
router.get("/:blockId/employees", async (req: Request, res: Response) => {
  try {
    const { blockId } = req.params;
    const employees = await BlockService.getEmployeesByBlockId(blockId);
    res.json(employees);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

//Get a specific employee in a block
router.get("/:blockId/employee/:employeeId", async (req: Request, res: Response) => {
  try {
    const { blockId, employeeId } = req.params;
    const employee = await BlockService.getEmployeeInBlock(blockId, employeeId);
    res.json(employee);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});

// Get all tasks in a block
router.get("/:blockId/tasks", async (req: Request, res: Response) => {
  try {
    const { blockId } = req.params;
    const tasks = await BlockService.getTasksByBlockId(blockId);
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

//Get a specific task in a block
router.get("/:blockId/task/:taskId", async (req: Request, res: Response) => {
  try {
    const { blockId, taskId } = req.params;
    const task = await BlockService.getTaskInBlock(blockId, taskId);
    res.json(task);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
