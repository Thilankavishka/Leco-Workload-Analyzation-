// config/db.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbHost = process.env.DB_HOST || "localhost";
const dbPort = process.env.DB_PORT || 3306;
const dbName = process.env.DB_NAME || "LECO";
const dbUser = process.env.DB_USER || "root";
const dbPass = process.env.DB_PASS || "";

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  port: dbPort,
  dialect: "mysql",
  logging: false, 
  define: {
    timestamps: true,
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected ✅");
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  } catch (err) {
    console.error("Unable to connect to MySQL:", err);
    process.exit(1);
  }
};

export { sequelize, connectDB };
