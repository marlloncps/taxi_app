import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "mysql",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "root",
  database: process.env.MYSQL_DATABASE || "taxi_app",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
