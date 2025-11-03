/**
 * task-repository.ts
 * 
 * @updated 11/03/2025
 */

import prismaClient from "../utils/prisma-client";

const prisma = prismaClient;

// Get all tasks with relations
export const getAllTasks = async () => {
    return await prisma.task.findMany({
        include: {
            block: true,
            assignedTo: {
                include: {
                    employee: true,
                },
            },
        },
    });
};

// Get task by ID
export const getTaskById = async (id: string) => {
    return await prisma.task.findUnique({
        where: { id },
        include: {
            block: true,
            assignedTo: {
                include: {
                    employee: true,
                },
            },
        },
    });
};

// Create a new task
export const createTask = async (data: any) => {
    return await prisma.task.create({ data });
};

// Update a task
export const updateTask = async (id: string, data: any) => {
    return await prisma.task.update({
        where: { id },
        data,
    });
};

// Delete a task
export const deleteTask = async (id: string) => {
    return await prisma.task.delete({
        where: { id },
    });
};
