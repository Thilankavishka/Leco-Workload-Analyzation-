/**
 * performance-history-repository.ts
 * 
 * @updated 11/16/2025
 */
import { PerformanceHistoryModel } from "../models/performance-model";
import prismaClient from "../utils/prisma-client";

const prisma = prismaClient;

// Get all performance records with relations
export const getAllPerformanceRecords = async () => {
  return await prisma.performanceHistory.findMany({
    include: { block: true },
  });
};

// Get performance record by ID with relations
export const getPerformanceById = async (id: string) => {
  return await prisma.performanceHistory.findUnique({
    where: { id },
    include: { block: true },
  });
};

// Get performance records by Block ID with relations
export const getPerformanceByBlockId = async (blockId: string) => {
  return await prisma.performanceHistory.findMany({
    where: { blockId },
    include: { block: true },
  });
};

// Create a new performance record
export const createPerformanceRecord = async (data: any) => {
  return await prisma.performanceHistory.create({ data });
};

// Bulk create performance records
export const createPerformanceRecordsBulk = async (records: any[]) => {
  const validatedRecords = records.map(r => PerformanceHistoryModel.parse(r));

  return await prisma.performanceHistory.createMany({
    data: validatedRecords,
    skipDuplicates: true,
  });
};

// Update a performance record
export const updatePerformanceRecord = async (id: string, data: any) => {
  return await prisma.performanceHistory.update({
    where: { id },
    data,
  });
};

// Delete a performance record
export const deletePerformanceRecord = async (id: string) => {
  return await prisma.performanceHistory.delete({ where: { id } });
};
