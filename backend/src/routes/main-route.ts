/**
 * main-route.ts
 *
 * @updated 11/03/2025
 */

import { Router } from "express";
import blockRouter from "./block-route";
import employeeRouter from "./employee-route";
import taskRouter from "./task-route";
import performanceHistoryRouter from "./performance-history-routes";
import taskAssignmentRouter from "./task-assignment-routes";

const router = Router();

router.use("/blocks", blockRouter);
router.use("/employees", employeeRouter);
router.use("/tasks", taskRouter);
router.use("/performance-history", performanceHistoryRouter);
router.use("/task-assignments", taskAssignmentRouter);

export default router;