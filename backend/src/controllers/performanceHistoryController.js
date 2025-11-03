import PerformanceHistory from "../models/PerformanceHistory.js";
import Block from "../models/Block.js";

export const getPerformanceHistory = async (req, res) => {
  try {
    const history = await PerformanceHistory.findAll({ include: [Block] });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addPerformanceRecord = async (req, res) => {
  try {
    const record = await PerformanceHistory.create(req.body);
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePerformanceRecord = async (req, res) => {
  try {
    const record = await PerformanceHistory.findByPk(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });
    await record.destroy();
    res.json({ message: "Record deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
