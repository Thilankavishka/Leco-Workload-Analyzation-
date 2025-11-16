/**
 * employee-repository.ts
 * 
 * @updated 11/16/2025
 */
import prismaClient from "../utils/prisma-client";

const prisma = prismaClient;

// Get all employees with relations
export const getAllEmployees = async () => {
  return await prisma.employee.findMany({
    include: {
      block: true,
    },
  });
};

// Get employee by ID with relations
export const getEmployeeById = async (id: string) => {
  return await prisma.employee.findUnique({
    where: { id },
    include: {
      block: true,
      taskAssignments: {
        include: {
          task: true,
        },
      },
    },
  });
};

// Create a new employee
export const createEmployee = async (data: any) => {
  return await prisma.employee.create({
    data,
  });
};

// Bulk create employees
export const createEmployeesBulk = async (employees: any[]) => {
  // Map employees to ensure createdAt/updatedAt are proper Date objects
  const formattedEmployees = employees.map(emp => ({
    ...emp,
    createdAt: new Date(emp.createdAt),
    updatedAt: new Date(emp.updatedAt),
  }));

  return await prisma.employee.createMany({
    data: formattedEmployees,
    skipDuplicates: true, // optional: avoid duplicate IDs
  });
};

// Update an employee
export const updateEmployee = async (id: string, data: any) => {
  return await prisma.employee.update({
    where: { id },
    data,
  });
};

// Delete an employee
export const deleteEmployee = async (id: string) => {
  return await prisma.employee.delete({
    where: { id },
  });
};
