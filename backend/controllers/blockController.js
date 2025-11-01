/**
 * controllers/blockController.js
 */
import Block from "../models/Block.js";
import Employee from "../models/Employee.js";
import Task from "../models/Task.js";
import PerformanceHistory from "../models/PerformanceHistory.js";

export const getBlocks = async (req, res) => {
  try {
    const blocks = await Block.findAll({
      include: [
        {
          model: Employee,
          attributes: [
            "employee_id",
            "name",
            "role",
            "performance",
            "tasks_completed",
            "tasks_assigned",
          ],
        },
        {
          model: Task,
          attributes: [
            "task_id",
            "name",
            "progress",
            "priority",
            "start_date",
            "end_date",
          ],
        },
        {
          model: PerformanceHistory,
          attributes: ["period", "value"],
        },
      ],
    });

    // format data to match frontend
    const formatted = blocks.map((b) => ({
      block_id: b.block_id,
      name: b.name,
      employees_count: b.employees_count,
      vehicles_count: b.vehicles_count,
      tasks_completed: b.tasks_completed,
      tasks_total: b.tasks_total,
      monthly_performance: b.monthly_performance,
      staff: b.Employees,
      performanceHistory: b.PerformanceHistories,
      ongoingTasks: b.Tasks?.filter((t) => t.progress < 100),
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching blocks:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getBlockById = async (req, res) => {
  try {
    const block = await Block.findByPk(req.params.id, {
      include: [
        {
          model: Employee,
          attributes: [
            "employee_id",
            "name",
            "role",
            "performance",
            "tasks_completed",
            "tasks_assigned",
          ],
        },
        {
          model: Task,
          attributes: [
            "task_id",
            "name",
            "progress",
            "priority",
            "start_date",
            "end_date",
          ],
        },
        {
          model: PerformanceHistory,
          attributes: ["period", "value"],
        },
      ],
    });

    if (!block) return res.status(404).json({ message: "Block not found" });

    // structure to match your frontend
    const response = {
      block_id: block.block_id,
      name: block.name,
      employees_count: block.employees_count,
      vehicles_count: block.vehicles_count,
      tasks_completed: block.tasks_completed,
      tasks_total: block.tasks_total,
      monthly_performance: block.monthly_performance,
      staff: block.Employees.map((e) => ({
        id: e.employee_id,
        name: e.name,
        role: e.role,
        performance: parseFloat(e.performance || 0),
        tasksCompleted: e.tasks_completed || 0,
        tasksAssigned: e.tasks_assigned || 1,
      })),
      performanceHistory: block.PerformanceHistories.map((p) => ({
        period: p.period,
        value: parseFloat(p.value),
      })),
      ongoingTasks: block.Tasks.filter((t) => t.progress < 100).map((t) => ({
        id: t.task_id,
        name: t.name,
        progress: t.progress,
        priority: t.priority,
        start_date: t.start_date,
        end_date: t.end_date,
      })),
    };

    res.json(response);
  } catch (err) {
    console.error("Error fetching block details:", err);
    res.status(500).json({ message: err.message });
  }
};

export const createBlock = async (req, res) => {
  try {
    const block = await Block.create(req.body);
    res.status(201).json(block);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateBlock = async (req, res) => {
  try {
    const block = await Block.findByPk(req.params.id);
    if (!block) return res.status(404).json({ message: "Block not found" });
    await block.update(req.body);
    res.json(block);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteBlock = async (req, res) => {
  try {
    const block = await Block.findByPk(req.params.id);
    if (!block) return res.status(404).json({ message: "Block not found" });
    await block.destroy();
    res.json({ message: "Block deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
