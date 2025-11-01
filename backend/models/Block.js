import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Block = sequelize.define(
  "Block",
  {
    block_id: {
      type: DataTypes.STRING(20),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    employees_count: DataTypes.INTEGER,
    vehicles_count: DataTypes.INTEGER,
    tasks_completed: DataTypes.INTEGER,
    tasks_total: DataTypes.INTEGER,
    monthly_performance: DataTypes.DECIMAL(5, 2),
  },
  {
    tableName: "blocks",
    timestamps: false,
  }
);

export default Block;
