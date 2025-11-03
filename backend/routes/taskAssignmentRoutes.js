import express from "express";
import {
  getAssignments,
  assignTask,
  deleteAssignment,
} from "../controllers/taskAssignmentController.js";

const router = express.Router();

router.get("/", getAssignments);
router.post("/", assignTask);
router.delete("/:id", deleteAssignment);

export default router;
