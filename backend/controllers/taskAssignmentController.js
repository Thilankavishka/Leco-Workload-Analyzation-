import TaskAssignment from "../models/TaskAssignment.js";
import Task from "../models/Task.js";
import Employee from "../models/Employee.js";

export const getAssignments = async (req, res) => {
  try {
    const data = await TaskAssignment.findAll({ include: [Task, Employee] });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const assignTask = async (req, res) => {
  try {
    const { task_id, employee_id } = req.body;
    const assignment = await TaskAssignment.create({ task_id, employee_id });
    res.status(201).json(assignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const assign = await TaskAssignment.findByPk(id);
    if (!assign)
      return res.status(404).json({ message: "Assignment not found" });
    await assign.destroy();
    res.json({ message: "Assignment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
