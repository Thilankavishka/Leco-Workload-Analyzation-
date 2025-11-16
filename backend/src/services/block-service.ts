/**
 * block-service.ts
 * 
 * @updated 11/03/2025
 */
import * as BlockRepository from "../repositories/block-repository";

// get all blocks
export const getAllBlocks = async () => {
    return await BlockRepository.getAllBlocks();
};

// get block by ID
export const getBlockById = async (id: string) => {
    const block = await BlockRepository.getBlockById(id);
    if (!block) throw new Error("Block not found");
    return block;
};

// create a new block
export const createBlock = async (data: any) => {
    return await BlockRepository.createBlock(data);
};

// Bulk create blocks
export const createBlocksBulk = async (blocks: any[]) => {
  if (!Array.isArray(blocks)) {
    throw new Error("Bulk data must be an array.");
  }

  return await BlockRepository.createBlocksBulk(blocks);
};

// update a block
export const updateBlock = async (id: string, data: any) => {
    const existing = await BlockRepository.getBlockById(id);
    if (!existing) throw new Error("Block not found");
    return await BlockRepository.updateBlock(id, data);
};

// delete a block
export const deleteBlock = async (id: string) => {
    const existing = await BlockRepository.getBlockById(id);
    if (!existing) throw new Error("Block not found");
    return await BlockRepository.deleteBlock(id);
};

// get all employees in a specific block
export const getEmployeesByBlockId = async (blockId: string) => {
  return await BlockRepository.getEmployeesByBlockId(blockId);
};

// get specific employee within a block
export const getEmployeeInBlock = async (blockId: string, employeeId: string) => {
  const employee = await BlockRepository.getEmployeeInBlock(blockId, employeeId);
  if (!employee) throw new Error("Employee not found in this block");
  return employee;
};

// get all tasks in a specific block
export const getTasksByBlockId = async (blockId: string) => {
  return await BlockRepository.getTasksByBlockId(blockId);
};

// get specific task within a block
export const getTaskInBlock = async (blockId: string, taskId: string) => {
  const task = await BlockRepository.getTaskInBlock(blockId, taskId);
  if (!task) throw new Error("Task not found in this block");
  return task;
};