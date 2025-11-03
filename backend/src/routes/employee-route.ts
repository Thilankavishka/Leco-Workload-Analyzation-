/**
 * employee-route.ts
 * 
 * @update 11/03/2025
 */
import { Router, Request, Response } from "express";
import * as EmployeeService from "../services/employee-service";

const router = Router();

// Get all employees
router.get("/", async (req: Request, res: Response) => {
    try {
        const employees = await EmployeeService.getAllEmployees();
        res.status(200).json(employees);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Get employee by ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const employee = await EmployeeService.getEmployeeById(req.params.id);
        res.status(200).json(employee);
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
});

export default router;
