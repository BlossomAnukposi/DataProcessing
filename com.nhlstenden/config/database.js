const { Pool } = require("pg");
require("dotenv").config();

class Database
{
    constructor()
    {
        this.pool = new Pool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
            password: process.env.DB_PASSWORD,
            ssl: {
                rejectUnauthorized: false, // Required for Azure PostgreSQL
            },
        });

        // Connect to the database
        this.pool.connect((err, client, release) => {
            if (err)
            {
                console.error("Error acquiring client:", err.stack);
            }
            else
            {
                console.log("Successfully connected to PostgreSQL database");
            }
            release();
        });
    }

    // Query method to execute SQL queries
    async query(queryText, params)
    {
        try
        {
            const result = await this.pool.query(queryText, params);
            return result.rows;
        }
        catch (error)
        {
            console.error("Database query error:", error);
            throw new Error("Error executing query");
        }
    }

    // To retrieve a client for transactions
    async getClient() {
        try {
            const client = await this.pool.connect();
            return client;
        } catch (error) {
            console.error("Error acquiring client from pool:", error);
            throw new Error("Could not get a database client");
        }
    }

    // Close the pool (useful for graceful shutdown)
    async close()
    {
        await this.pool.end();
    }
}

module.exports = new Database();
