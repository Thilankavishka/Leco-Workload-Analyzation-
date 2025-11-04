/**
 * summary-api.ts
 *
 * @updated 11/04/2025
 */

export const apiSummary = {
    blocks: {
        getAll: "/blocks",
        getById: (id: number | string) => `/blocks/${id}`,
        add: "/blocks",
        updateById: (id: number | string) => `/blocks/${id}`,
        deleteById: (id: number | string) => `/blocks/${id}`,

        getEmployees: (blockId: number | string) => `/blocks/${blockId}/employees`,
        getEmployee: (blockId: number | string, employeeId: number | string) =>
            `/blocks/${blockId}/employee/${employeeId}`,

        getTasks: (blockId: number | string) => `/blocks/${blockId}/tasks`,
        getTask: (blockId: number | string, taskId: number | string) =>
            `/blocks/${blockId}/task/${taskId}`,
    },

    employees: {
        getAll: "/employees",
        getById: (id: number | string) => `/employees/${id}`,
        add: "/employees",
        updateById: (id: number | string) => `/employees/${id}`,
        deleteById: (id: number | string) => `/employees/${id}`,
    },

    tasks: {
        getAll: "/tasks",
        getById: (id: number | string) => `/tasks/${id}`,
        add: "/tasks",
        updateById: (id: number | string) => `/tasks/${id}`,
        deleteById: (id: number | string) => `/tasks/${id}`,
    },

    taskAssignments: {
        getAll: "/task-assignments",
        getById: (id: number | string) => `/task-assignments/${id}`,
        getByTask: (taskId: number | string) => `/task-assignments/task/${taskId}`,
        getByEmployee: (employeeId: number | string) =>
            `/task-assignments/employee/${employeeId}`,
        add: "/task-assignments",
        deleteById: (id: number | string) => `/task-assignments/${id}`,
    },

    performanceHistory: {
        getAll: "/performance-history",
        getById: (id: number | string) => `/performance-history/${id}`,
        getByBlock: (blockId: number | string) =>
            `/performance-history/block/${blockId}`,
        add: "/performance-history",
        updateById: (id: number | string) => `/performance-history/${id}`,
        deleteById: (id: number | string) => `/performance-history/${id}`,
    },
}
