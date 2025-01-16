const database = require("../../config/database");
const ModelParent = require("./modelParent");
const bcrypt = require("bcryptjs");

class AccountModel extends ModelParent {
  constructor() {
    super("account");
  }

  async createAccount(email, password, invitedByAccount = null) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

      const result = await database.query(
        "SELECT * FROM public.create_account($1, $2, $3)",
        [hashedPassword, email, invitedByAccount]
      );

      if (!result?.length) {
        console.log("Could not create account.");
        return null;
      }

      return result[0];
    } catch (err) {
      this.handleError("creating", err);
    }
  }

  async getAccountByEmail(email) {
    try {
      console.log("Getting account by email:", email);

      // Log the full database connection state (without sensitive info)
      console.log("Database connection status:", {
        connected: database?.pool?.totalCount > 0,
        totalConnections: database?.pool?.totalCount,
        idleConnections: database?.pool?.idleCount,
      });

      const result = await database
        .query("SELECT * FROM public.get_account_by_email($1)", [email])
        .catch((err) => {
          console.error("Query error details:", {
            code: err.code,
            detail: err.detail,
            schema: err.schema,
            table: err.table,
            constraint: err.constraint,
            file: err.file,
            line: err.line,
            routine: err.routine,
          });
          throw err;
        });

      console.log("Raw query result:", result);

      if (!result?.length) {
        console.log("Account not found.");
        return null;
      }

      return result[0];
    } catch (err) {
      console.error("Full database error:", err);
      console.error("Database error details:", {
        message: err.message,
        stack: err.stack,
        query: err.query,
        parameters: err.parameters,
        name: err.name,
        where: err.where,
      });
      throw new Error(`Error fetching account by email: ${err.message}`);
    }
  }

  async updateAccount(
    accountId,
    email = null,
    password = null,
    accountStatus = null
  ) {
    try {
      console.log("Updating account:", {
        accountId,
        email: email ? "provided" : "not provided",
        password: password ? "provided" : "not provided",
        accountStatus,
      });

      const result = await database.query(
        "SELECT * FROM public.update_account($1, $2, $3, $4)",
        [accountId, email, password, accountStatus]
      );

      if (!result || result.length === 0) {
        throw new Error("Account not found");
      }

      return result[0];
    } catch (error) {
      console.error("Model Error:", error.message);
      throw error;
    }
  }
}

module.exports = new AccountModel();
