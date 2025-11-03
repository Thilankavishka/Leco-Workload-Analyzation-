/**
 * block-repository.ts
 * 
 * @update 11/03/2025
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
