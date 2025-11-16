/**
 * performance-history-repository.ts
 * 
 * @updated 11/16/2025
 */
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

export const createPerformanceRecord = async (data: any) => {
  if (!data.blockId) throw new Error("blockId is required");

  const record = {
    period: data.period || null,
    value: typeof data.value === "number" ? data.value : null,
    blockId: data.blockId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return await prisma.performanceHistory.create({ data: record });
};

// Bulk create
export const createPerformanceRecordsBulk = async (records: any[]) => {
  const formattedRecords = records
    .filter(r => r.blockId)
    .map(r => ({
      period: r.period || null,
      value: typeof r.value === "number" ? r.value : null,
      blockId: r.blockId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

  if (formattedRecords.length === 0) throw new Error("No valid records to insert");

  return await prisma.performanceHistory.createMany({
    data: formattedRecords,
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
