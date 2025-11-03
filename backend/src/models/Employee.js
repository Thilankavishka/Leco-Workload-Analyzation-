import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Block from "./Block.js";

const Employee = sequelize.define(
  "Employee",
  {
    employee_id: {
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
    phone: DataTypes.STRING(20),
    role: DataTypes.STRING(50),
    performance: DataTypes.DECIMAL(5, 2),
    tasks_completed: DataTypes.INTEGER,
    tasks_assigned: DataTypes.INTEGER,
  },
  {
    tableName: "employees",
    timestamps: false,
  }
);

// relationship
Block.hasMany(Employee, {
  foreignKey: "block_id",
  onUpdate: "CASCADE",
  onDelete: "SET NULL",
});
Employee.belongsTo(Block, { foreignKey: "block_id" });

export default Employee;
