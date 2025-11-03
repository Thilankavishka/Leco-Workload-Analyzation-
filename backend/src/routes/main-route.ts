/**
 * main-route.ts
 *
 * @update 11/03/2025
 */

import { Router } from "express";
import blockRouter from "./block-route";
import employeeRouter from "./employee-route";
import taskRouter from "./task-route";

const router = Router();

router.use("/blocks", blockRouter);
router.use("/employees", employeeRouter);
router.use("/tasks", taskRouter);

export default router;