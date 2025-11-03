/**
 * employee-routes.ts
 * 
 * @updated 11/03/2025
 */
import express from "express";
import * as EmployeeService from "../services/employee-service";

const router = express.Router();

// get all employees
router.get("/", async (req, res) => {
  try {
    const employees = await EmployeeService.getAllEmployees();
    res.json(employees);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// get employee by id
router.get("/:id", async (req, res) => {
  try {
    const employee = await EmployeeService.getEmployeeById(req.params.id);
    res.json(employee);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});

// create employee
router.post("/", async (req, res) => {
  try {
    const employee = await EmployeeService.createEmployee(req.body);
    res.status(201).json(employee);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// update employee
router.put("/:id", async (req, res) => {
  try {
    const updated = await EmployeeService.updateEmployee(req.params.id, req.body);
    res.json(updated);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});

// delete employee
router.delete("/:id", async (req, res) => {
  try {
    await EmployeeService.deleteEmployee(req.params.id);
    res.json({ message: "Employee deleted successfully" });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
