/**
 * performance-history-service.ts
 * 
 * @updated 11/16/2025
 */

import * as performanceHistoryRepository from "../repositories/performance-history-repository";

// Get all performance records
export const getAll = async () => performanceHistoryRepository.getAllPerformanceRecords();

// Get performance record by ID
export const getById = async (id: string) => {
  const record = await performanceHistoryRepository.getPerformanceById(id);
  if (!record) throw new Error("Performance record not found");
  return record;
};

// Get performance records by Block ID
export const getByBlock = async (blockId: string) => performanceHistoryRepository.getPerformanceByBlockId(blockId);

// Create a new performance record
export const create = async (data: any) => {
  if (!data.blockId) throw new Error("blockId is required");
  return await performanceHistoryRepository.createPerformanceRecord(data);
};

// Bulk create performance records
export const createRecordsBulk = async (records: any[]) => {
  if (!Array.isArray(records) || records.length === 0)
    throw new Error("Input must be a non-empty array");

  return await performanceHistoryRepository.createPerformanceRecordsBulk(records);
};

// Update a performance record
export const update = async (id: string, data: any) => {
  return await performanceHistoryRepository.updatePerformanceRecord(id, data);
};

// Delete a performance record
export const remove = async (id: string) => {
  return await performanceHistoryRepository.deletePerformanceRecord(id);
};
