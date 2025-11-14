/**
 * employee-service.ts
 * 
 * @updated 11/03/2025
 */
import * as EmployeeRepository from "../repositories/employee-repository";

// Get all employees
export const getAllEmployees = async () => {
  return await EmployeeRepository.getAllEmployees();
};

// Get employee by ID
export const getEmployeeById = async (id: string) => {
  const employee = await EmployeeRepository.getEmployeeById(id);
  if (!employee) throw new Error("Employee not found");
  return employee;
};

// Create new employee
export const createEmployee = async (data: any) => {
  return await EmployeeRepository.createEmployee(data);
};

// Update employee by ID
export const updateEmployee = async (id: string, data: any) => {
  const existing = await EmployeeRepository.getEmployeeById(id);
  if (!existing) throw new Error("Employee not found");
  return await EmployeeRepository.updateEmployee(id, data);
};

// Delete employee by ID
export const deleteEmployee = async (id: string) => {
  const existing = await EmployeeRepository.getEmployeeById(id);
  if (!existing) throw new Error("Employee not found");
  return await EmployeeRepository.deleteEmployee(id);
};
