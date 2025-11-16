/**
 * block-repository.ts
 * 
 * @updated 11/03/2025
 */
import prismaClient from "../utils/prisma-client";

const prisma = prismaClient;

// Get all blocks with relations
export const getAllBlocks = async () => {
    return await prisma.block.findMany({
        include: {
            staff: true,
            ongoingTasks: true,
            performanceHistory: true,
        },
    });
};

// Get block by ID
export const getBlockById = async (id: string) => {
    return await prisma.block.findUnique({
        where: { id },
        include: {
            staff: true,
            ongoingTasks: true,
            performanceHistory: true,
        },
    });
};

// Create a new block
export const createBlock = async (data: any) => {
    return await prisma.block.create({ data });
};

// Create multiple blocks in bulk
export const createBlocksBulk = async (blocks: any[]) => {
  return await prisma.block.createMany({
    data: blocks,
    skipDuplicates: true, // Optional: avoid errors if IDs already exist
  });
};


// Update a block
export const updateBlock = async (id: string, data: any) => {
    return await prisma.block.update({
        where: { id },
        data,
    });
};

// Delete a block
export const deleteBlock = async (id: string) => {
    return await prisma.block.delete({
        where: { id },
    });
};

// Get all employees in a specific block
export const getEmployeesByBlockId = async (blockId: string) => {
  return await prisma.employee.findMany({
    where: { blockId },
    include: {
      block: true,
      taskAssignments: { include: { task: true } },
    },
  });
};

// Get specific employee within a block
export const getEmployeeInBlock = async (blockId: string, employeeId: string) => {
  return await prisma.employee.findFirst({
    where: { id: employeeId, blockId },
    include: {
      block: true,
      taskAssignments: { include: { task: true } },
    },
  });
};

// Get all tasks in a specific block
export const getTasksByBlockId = async (blockId: string) => {
  return await prisma.task.findMany({
    where: { blockId },
    include: {
      block: true,
      assignedTo: { include: { employee: true } },
    },
  });
};

// Get specific task within a block
export const getTaskInBlock = async (blockId: string, taskId: string) => {
  return await prisma.task.findFirst({
    where: { id: taskId, blockId },
    include: {
      block: true,
      assignedTo: { include: { employee: true } },
    },
  });
};