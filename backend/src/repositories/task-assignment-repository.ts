/**
 * task-assignment-repository.ts
 * 
 * @updated 11/03/2025
 */
import prismaClient from "../utils/prisma-client";

const prisma = prismaClient;

// Get all task assignments with relations
export const getAllAssignments = async () => {
  return await prisma.taskAssignment.findMany({
    include: { task: true, employee: true },
  });
};

// Get task assignment by ID with relations
export const getById = async (id: string) => {
  return await prisma.taskAssignment.findUnique({
    where: { id },
    include: { task: true, employee: true },
  });
};

// Get task assignments by Task ID with relations
export const getByTaskId = async (taskId: string) => {
  return await prisma.taskAssignment.findMany({
    where: { taskId },
    include: { employee: true },
  });
};

// Get task assignments by Employee ID with relations
export const getByEmployeeId = async (employeeId: string) => {
  return await prisma.taskAssignment.findMany({
    where: { employeeId },
    include: { task: true },
  });
};

// Create a new task assignment
export const createAssignment = async (data: any) => {
  return await prisma.taskAssignment.create({ data });
};

// Bulk create task assignments
export const createAssignmentsBulk = async (records: any[]) => {
    const formattedRecords = records.map((rec) => ({
      period: rec.period,
      value: rec.value,
      blockId: rec.blockId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return await prisma.performanceHistory.createMany({
      data: formattedRecords,
      skipDuplicates: true, // skip duplicates automatically
    });
};

// Update a task assignment
export const deleteAssignment = async (id: string) => {
  return await prisma.taskAssignment.delete({ where: { id } });
};
