/**
 * employee-routes.ts
 * 
 * @updated 11/16/2025
 */
import express, { Request, Response } from "express";
import * as EmployeeService from "../services/employee-service";

const router = express.Router();

// get all employees
router.get("/", async (req: Request, res: Response) => {
  try {
    const employees = await EmployeeService.getAllEmployees();
    res.json(employees);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// get employee by id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const employee = await EmployeeService.getEmployeeById(req.params.id);
    res.json(employee);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});

// create employee
router.post("/", async (req: Request, res: Response) => {
  try {
    const employee = await EmployeeService.createEmployee(req.body);
    res.status(201).json(employee);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Bulk create employees
router.post("/bulk", async (req: Request, res: Response) => {
  try {
    const result = await EmployeeService.createEmployeesBulk(req.body);
    res.status(201).json({
      message: "Employees created successfully",
      ...result, // count of created records
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// update employee
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updated = await EmployeeService.updateEmployee(req.params.id, req.body);
    res.json(updated);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});

// delete employee
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await EmployeeService.deleteEmployee(req.params.id);
    res.json({ message: "Employee deleted successfully" });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
