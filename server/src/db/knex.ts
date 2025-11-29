import knex from "knex";
import knexConfig from "../../knexfile";

const environment = process.env.NODE_ENV || "development";

const db = knex(knexConfig[environment]);

async function testConnection() {
  try {
    await db.raw("SELECT 1+1 AS result");
    console.log("📦 Database connected successfully.");
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
  }
}

testConnection();

export default db;
