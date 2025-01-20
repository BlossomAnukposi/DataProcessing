// Set test environment
process.env.NODE_ENV = "test";

const { pool } = require("../config/database");

// Increase timeout for tests
jest.setTimeout(10000);

// Setup test database connection
beforeAll(async () => {
  try {
    // Wait for database to be ready
    await pool.query("SELECT 1");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
});

// Cleanup function to close database connections
afterAll(async () => {
  try {
    await pool.end();
    // Add a small delay to ensure connections are closed
    await new Promise((resolve) => setTimeout(resolve, 500));
  } catch (error) {
    console.error("Failed to close database connection:", error);
  }
});
