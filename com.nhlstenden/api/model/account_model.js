const database = require("../../config/database");

class account_model {
    async get_all_accounts()
    {
        try
        {
            return await database.query('SELECT * FROM public.get_all_accounts()');
        }
        catch(err)
        {
            throw new Error("Error fetching accounts. Error message is: " + err.message);
        }
    }

    async get_account_by_id(account_id) {
        try
        {
            const result = await database.query('SELECT * FROM public.get_account_by_id($1)', [account_id]);

            if (!result || result.length === 0)
            {
                console.log("No account found for ID:", account_id);
                throw new Error("No account found with the specified ID.");
            }

            return result[0];
        }
        catch (err)
        {
            console.error("Model Error:", err.message);
            throw new Error("Error fetching accounts. Error message is: " + err.message);
        }
    }

    async delete_account(account_id) {
        try {
            const result = await database.query('SELECT * FROM public.delete_account_by_id($1)', [account_id]);

            if (!result || result.length === 0)
            {
                throw new Error("Account not found");
            }

            return result[0];
        }
        catch (err)
        {
            console.error("Model Error:", err.message);

            if (err.message.includes('Account with ID'))
            {
                throw new Error("Account not found");
            }

            throw new Error("Error deleting account: " + err.message);
        }
    }

    async create_account(email, password, invited_by_account_id = null) {
        try {
            const result = await database.query(
                'SELECT * FROM public.create_account($1, $2, $3)',
                [email, password, invited_by_account_id]
            );

            if (!result || result.length === 0) {
                throw new Error("Account creation failed");
            }

            return result[0];
        } catch (error) {
            console.error("Model Error:", error.message);
            throw error;
        }
    }
}

module.exports = new account_model();

//
//
// // Update account
// router.patch("/:account_id", async (req, res) => {
//     const account_id = req.params.account_id;
//     const { email, password, account_status } = req.body;
//
//     try {
//         let updateQuery = "UPDATE account SET ";
//         const updateValues = [];
//         const queryParams = [];
//         let paramCount = 1;
//
//         if (email) {
//             updateValues.push(`email = $${paramCount}`);
//             queryParams.push(email);
//             paramCount++;
//         }
//
//         if (password) {
//             updateValues.push(`password = $${paramCount}`);
//             queryParams.push(password);
//             paramCount++;
//         }
//
//         if (account_status) {
//             updateValues.push(`account_status = $${paramCount}`);
//             queryParams.push(account_status);
//             paramCount++;
//         }
//
//         queryParams.push(account_id);
//         updateQuery +=
//             updateValues.join(", ") +
//             ` WHERE account_id = $${paramCount} RETURNING account_id, email, account_status, join_date`;
//
//         const result = await database.query(updateQuery, queryParams);
//
//         if (result.rows.length === 0) {
//             return res.status(404).json({
//                 message: "Account not found",
//             });
//         }
//
//         res.status(200).json({
//             message: "Account updated successfully",
//             account: result.rows[0],
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: "Error updating account",
//             error: error.message,
//         });
//     }
// });
//
//
// // Login attempt endpoint
// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//
//     try {
//         // First, get the account and check login attempts
//         const account = await database.query(
//             "SELECT account_id, password, login_attempts, account_status FROM account WHERE email = $1",
//             [email]
//         );
//
//         if (account.rows.length === 0) {
//             return res.status(401).json({
//                 message: "Invalid credentials",
//             });
//         }
//
//         const accountData = account.rows[0];
//
//         // Check if account is locked
//         if (accountData.account_status === "locked") {
//             return res.status(403).json({
//                 message: "Account is locked. Please contact support.",
//             });
//         }
//
//         // Verify password (in a real application, use proper password hashing)
//         if (accountData.password === password) {
//             // Reset login attempts on successful login
//             await database.query(
//                 "UPDATE account SET login_attempts = 0 WHERE account_id = $1",
//                 [accountData.account_id]
//             );
//
//             return res.status(200).json({
//                 message: "Login successful",
//                 account_id: accountData.account_id,
//             });
//         } else {
//             // Increment login attempts
//             const newAttempts = accountData.login_attempts + 1;
//             const newStatus = newAttempts >= 3 ? "locked" : "active";
//
//             await database.query(
//                 "UPDATE account SET login_attempts = $1, account_status = $2 WHERE account_id = $3",
//                 [newAttempts, newStatus, accountData.account_id]
//             );
//
//             return res.status(401).json({
//                 message: "Invalid credentials",
//                 attempts_remaining: 3 - newAttempts,
//             });
//         }
//     } catch (error) {
//         res.status(500).json({
//             message: "Error processing login",
//             error: error.message,
//         });
//     }
// });
//
// module.exports = router;
