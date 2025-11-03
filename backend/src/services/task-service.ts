import * as TaskRepository from "../repositories/task-repository";

export const getAllTasks = async () => {
    return await TaskRepository.getAllTasks();
};

export const getTaskById = async (id: string) => {
    const task = await TaskRepository.getTaskById(id);
    if (!task) throw new Error("Task not found");
    return task;
};

export const createTask = async (data: any) => {
    return await TaskRepository.createTask(data);
};

export const updateTask = async (id: string, data: any) => {
    const existing = await TaskRepository.getTaskById(id);
    if (!existing) throw new Error("Task not found");
    return await TaskRepository.updateTask(id, data);
};

export const deleteTask = async (id: string) => {
    const existing = await TaskRepository.getTaskById(id);
    if (!existing) throw new Error("Task not found");
    return await TaskRepository.deleteTask(id);
};
