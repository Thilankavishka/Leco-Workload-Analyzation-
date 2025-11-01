import express from "express";
import {
  getBlocks,
  getBlockById,
  createBlock,
  updateBlock,
  deleteBlock,
} from "../controllers/blockController.js";

const router = express.Router();

router.get("/", getBlocks);
router.get("/:id", getBlockById);
router.post("/", createBlock);
router.put("/:id", updateBlock);
router.delete("/:id", deleteBlock);

export default router;
