const database = require("../../config/database");
const ModelParent = require("./modelParent");
const bcrypt = require("bcryptjs");

class AccountModel extends ModelParent {
    constructor() {
        super("account");
    }

    async deleteEntryById(accountId)
    {
        try {
            await database.query('SET TRANSACTION ISOLATION LEVEL SERIALIZABLE');

            const result = await database.query(
                'CALL public.delete_account_by_id($1, $2, $3, $4, $5, $6)',
                [accountId, null, null, null, null, null]
            );

            const { p_account_id, p_status } = result[0];

            if (p_status.startsWith('error')) {
                throw new Error(p_status);
            }

            return { accountId: p_account_id, status: p_status };
        } catch (err) {
            this.handleError('deleting', err);
        }
    }

    async createAccountWithRetry(email, password, invitedByAccount = null) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            // Set isolation level before calling the procedure
            await database.query('SET TRANSACTION ISOLATION LEVEL SERIALIZABLE');

            // Now call the stored procedure to create the account
            const result = await database.query(
                "CALL public.create_account($1, $2, $3, $4, $5)",
                [hashedPassword, email, invitedByAccount, null, 'pending']
            );

            // Check if the procedure ran successfully
            const { p_account_id, p_status } = result[0];

            if (p_status.startsWith('error')) {
                throw new Error(p_status);
            }

            return { accountId: p_account_id, status: p_status };

        }
        catch (err)
        {
            console.error('Error creating account:', err);
            throw err;
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

    async updateAccount(accountId, email = null, password = null, accountStatus = null) {
        try {
            // Set isolation level before calling the procedure
            await database.query('SET TRANSACTION ISOLATION LEVEL SERIALIZABLE');

            console.log("Updating account:", {
                accountId,
                email: email ? "provided" : "not provided",
                password: password ? "provided" : "not provided",
                accountStatus,
            });

            const result = await database.query(
                "CALL public.update_account($1, $2, $3, $4, $5, $6, $7, $8, $9)",
                [
                    accountId, // IN: Account ID
                    null, null, null, null, null, // OUT placeholders
                    email || null, // IN: Email (or null if not provided)
                    password || null, // IN: Password (or null if not provided)
                    accountStatus || null // IN: Account status (or null if not provided)
                ]
            );

            // Extract the OUT parameters
            const {
                p_updated_account_id,
                p_updated_email,
                p_updated_account_status,
                p_join_date,
                p_status
            } = result[0];

            if (p_status.startsWith('error')) {
                throw new Error(p_status); // If there's an error, throw it
            }

            return {
                accountId: p_updated_account_id,
                email: p_updated_email,
                accountStatus: p_updated_account_status,
                joinDate: p_join_date,
                status: p_status
            };
        } catch (error) {
            console.error("Model Error:", error.message);
            throw error;
        }
    }
}

    module.exports = new AccountModel();
