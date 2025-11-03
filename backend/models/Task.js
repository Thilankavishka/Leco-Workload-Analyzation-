import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Block from "./Block.js";

const Task = sequelize.define(
  "Task",
  {
    task_id: {
      type: DataTypes.STRING(20),
      primaryKey: true,
    },
    block_id: {
      type: DataTypes.STRING(20),
      references: { model: Block, key: "block_id" },
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    progress: {
      type: DataTypes.INTEGER,
      validate: { min: 0, max: 100 },
    },
    priority: {
      type: DataTypes.ENUM("high", "medium", "low"),
    },
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY,
  },
  {
    tableName: "tasks",
    timestamps: false,
  }
);

Block.hasMany(Task, {
  foreignKey: "block_id",
  onUpdate: "CASCADE",
  onDelete: "SET NULL",
});
Task.belongsTo(Block, { foreignKey: "block_id" });

export default Task;
