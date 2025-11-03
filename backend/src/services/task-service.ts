import * as TaskRepository from "../repositories/task-repository";

// Get all tasks
export const getAllTasks = async () => {
    return await TaskRepository.getAllTasks();
};

// Get task by ID
export const getTaskById = async (id: string) => {
    const task = await TaskRepository.getTaskById(id);
    if (!task) throw new Error("Task not found");
    return task;
};

// Create a new task
export const createTask = async (data: any) => {
    return await TaskRepository.createTask(data);
};

// Update a task
export const updateTask = async (id: string, data: any) => {
    const existing = await TaskRepository.getTaskById(id);
    if (!existing) throw new Error("Task not found");
    return await TaskRepository.updateTask(id, data);
};

// Delete a task
export const deleteTask = async (id: string) => {
    const existing = await TaskRepository.getTaskById(id);
    if (!existing) throw new Error("Task not found");
    return await TaskRepository.deleteTask(id);
};
