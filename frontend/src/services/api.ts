// src/services/api.ts
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const blockAPI = {
  getAll: () => api.get("/blocks"),
  getById: (id: string) => api.get(`/blocks/${id}`),
};

export const employeeAPI = {
  getAll: () => api.get("/employees"),
  getById: (id: string) => api.get(`/employees/${id}`),
  getByBlock: (blockId: string) => api.get(`/blocks/${blockId}/employees`),
  getByBlockAndId: (blockId: string, employeeId: string) =>
    api.get(`/blocks/${blockId}/employee/${employeeId}`),
};

export const taskAPI = {
  getAll: () => api.get("/tasks"),
  getById: (id: string) => api.get(`/tasks/${id}`),
  getByBlock: (blockId: string) => api.get(`/blocks/${blockId}/tasks`),
  getByBlockAndId: (blockId: string, taskId: string) =>
    api.get(`/blocks/${blockId}/task/${taskId}`),
};

export const performanceAPI = {
  getAll: () => api.get("/performance-history"),
  getByBlock: (blockId: string) =>
    api.get(`/performance-history/block/${blockId}`),
};

export const assignmentAPI = {
  getByEmployee: (employeeId: string) =>
    api.get(`/task-assignments/employee/${employeeId}`),
};

export default api;
