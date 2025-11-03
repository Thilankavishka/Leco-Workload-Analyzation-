/**
 * employee-repository.ts
 * 
 * @update 11/03/2025
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

// Get employees by block ID
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
