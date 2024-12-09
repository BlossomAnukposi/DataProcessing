const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false, // Required for Azure PostgreSQL
  },
});

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client:", err.stack);
  }
  console.log("Successfully connected to PostgreSQL database");
  release();
});

module.exports = pool;
