import Block from "../models/Block.js";
import Employee from "../models/Employee.js";
import Task from "../models/Task.js";
import PerformanceHistory from "../models/PerformanceHistory.js";

export const getBlocks = async (req, res) => {
  try {
    const blocks = await Block.findAll({
      include: [Employee, Task, PerformanceHistory],
    });
    res.json(blocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBlockById = async (req, res) => {
  try {
    const block = await Block.findByPk(req.params.id, {
      include: [Employee, Task, PerformanceHistory],
    });
    if (!block) return res.status(404).json({ message: "Block not found" });
    res.json(block);
  } catch (err) {
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
