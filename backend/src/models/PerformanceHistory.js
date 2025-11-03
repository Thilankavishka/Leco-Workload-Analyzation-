import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Block from "./Block.js";

const PerformanceHistory = sequelize.define(
  "PerformanceHistory",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    block_id: {
      type: DataTypes.STRING(20),
      references: { model: Block, key: "block_id" },
      allowNull: false,
    },
    period: DataTypes.STRING(50),
    value: DataTypes.DECIMAL(5, 2),
  },
  {
    tableName: "performance_history",
    timestamps: false,
  }
);

Block.hasMany(PerformanceHistory, {
  foreignKey: "block_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
PerformanceHistory.belongsTo(Block, { foreignKey: "block_id" });

export default PerformanceHistory;
