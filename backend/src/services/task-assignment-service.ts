/**
 * task-assignment-service.ts
 * 
 * @updated 11/03/2025
 */

import * as taskAssignmentRepository from "../repositories/task-assignment-repository";

// Get all task assignments
export const getAll = async () => taskAssignmentRepository.getAllAssignments();

// Get task assignment by ID
export const getById = async (id: string) => {
  const assignment = await taskAssignmentRepository.getById(id);
  if (!assignment) throw new Error("Assignment not found");
  return assignment;
};

// Get task assignments by Task ID
export const getByTask = async (taskId: string) => taskAssignmentRepository.getByTaskId(taskId);

// Get task assignments by Employee ID
export const getByEmployee = async (employeeId: string) => taskAssignmentRepository.getByEmployeeId(employeeId);

// Create a new task assignment
export const create = async (data: any) => {
  if (!data.taskId || !data.employeeId)
    throw new Error("taskId and employeeId are required");
  return await taskAssignmentRepository.createAssignment(data);
};

// Delete a task assignment
export const remove = async (id: string) => taskAssignmentRepository.deleteAssignment(id);
