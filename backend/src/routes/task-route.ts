/**
 * task-route.ts
 * 
 * @updated 11/16/2025
 */
import { Router, Request, Response } from "express";
import * as TaskService from "../services/task-service";

const router = Router();

// Get all tasks
router.get("/", async (req: Request, res: Response) => {
    try {
        const tasks = await TaskService.getAllTasks();
        res.json(tasks);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Get a task by ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const task = await TaskService.getTaskById(id);
        res.json(task);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
});

// Create a new task
router.post("/", async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const task = await TaskService.createTask(data);
        res.status(201).json(task);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Bulk create tasks
router.post("/bulk", async (req: Request, res: Response) => {
    try {
        const result = await TaskService.createTasksBulk(req.body);
        res.status(201).json({
            message: "Tasks created successfully",
            ...result, // count of created records
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

// Update a task
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedTask = await TaskService.updateTask(id, data);
        res.json(updatedTask);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a task
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await TaskService.deleteTask(id);
        res.json({ message: "Task deleted successfully", deleted });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
});

export default router;
