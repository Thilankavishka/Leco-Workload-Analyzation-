import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Task from "./Task.js";
import Employee from "./Employee.js";

const TaskAssignment = sequelize.define(
  "TaskAssignment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    task_id: {
      type: DataTypes.STRING(20),
      references: { model: Task, key: "task_id" },
      allowNull: false,
    },
    employee_id: {
      type: DataTypes.STRING(20),
      references: { model: Employee, key: "employee_id" },
      allowNull: false,
    },
  },
  {
    tableName: "task_assignments",
    timestamps: false,
    indexes: [{ unique: true, fields: ["task_id", "employee_id"] }],
  }
);

// Many-to-Many associations
Task.belongsToMany(Employee, {
  through: TaskAssignment,
  foreignKey: "task_id",
  otherKey: "employee_id",
  onDelete: "CASCADE",
});

Employee.belongsToMany(Task, {
  through: TaskAssignment,
  foreignKey: "employee_id",
  otherKey: "task_id",
  onDelete: "CASCADE",
});

export default TaskAssignment;
