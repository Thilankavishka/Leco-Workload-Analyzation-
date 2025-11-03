import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB, sequelize } from "./config/db.js";

import blockRoutes from "./routes/blockRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import taskAssignmentRoutes from "./routes/taskAssignmentRoutes.js";
import performanceHistoryRoutes from "./routes/performanceHistoryRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

await connectDB();
await sequelize.sync({ alter: true });

app.use("/api/blocks", blockRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/task-assignments", taskAssignmentRoutes);
app.use("/api/performance-history", performanceHistoryRoutes);

app.get("/", (req, res) => res.send("Backend running with MySQL 🚀"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
