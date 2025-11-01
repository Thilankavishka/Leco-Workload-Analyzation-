import express from "express";
import {
  getPerformanceHistory,
  addPerformanceRecord,
  deletePerformanceRecord,
} from "../controllers/performanceHistoryController.js";

const router = express.Router();

router.get("/", getPerformanceHistory);
router.post("/", addPerformanceRecord);
router.delete("/:id", deletePerformanceRecord);

export default router;
