import * as EmployeeRepository from "../repositories/employee-repository";

export const getAllEmployees = async () => {
    return await EmployeeRepository.getAllEmployees();
};

export const getEmployeeById = async (id: string) => {
    const employee = await EmployeeRepository.getEmployeeById(id);
    if (!employee) throw new Error("Employee not found");
    return employee;
};
