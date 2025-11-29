/**
 * Knex configuration.
 * Uses DATABASE_URL if present, otherwise individual env vars.
 */
import dotenv from "dotenv";
dotenv.config();

export default {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'tnppt274',
      database: process.env.DB_NAME || 'invoice_db',
      port: Number(process.env.DB_PORT) || 5432,
    },
    migrations: {
      directory: "./src/migrations",
      extension: "ts",
    },
    seeds: {
      directory: "./src/seeds",
    },
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./dist/migrations",
      extension: "js",
    },
    seeds: {
      directory: "./dist/seeds",
    },
  },
};
