const js2xmlparser = require("js2xmlparser");
const account_model = require("../../api/model/account_model");

class account_controller
{
    async get_all_accounts(req, res)
    {
        try
        {
            const result = await account_model.get_all_accounts();
            const acceptHeader = req.headers['accept'];

            if (acceptHeader && acceptHeader.includes('application/json'))
            {
                res.status(200).json(result);
            }
            else
            {
                const xml = js2xmlparser.parse("result", result);
                res.set('Content-Type', 'application/xml');
                res.status(200).send(xml);
            }
        }
        catch (error)
        {
            console.error("Controller Error:", error.message);
            res.status(500).json({ error: error.message });
        }
    }

    async get_account_by_id(req, res)
    {
        try
        {
            const result = await account_model.get_account_by_id(req.params.id);
            const acceptHeader = req.headers['accept'];

            if (acceptHeader && acceptHeader.includes('application/xml'))
            {
                const xml = js2xmlparser.parse("result", result);
                res.set('Content-Type', 'application/xml');
                res.status(200).send(xml);
            }
            else
            {
                res.status(200).json(result);
            }
        }
        catch (error)
        {
            console.error("Controller Error:", error.message);
            res.status(500).json({ error: error.message });
        }
    }

    async create_account(req, res) {
        try {
            const { email, password, invited_by_account_id } = req.body;

            // Validate required fields
            if (!email || !password) {
                return res.status(400).json({
                    message: "Email and password are required"
                });
            }

            const account = await account_model.create_account(email, password, invited_by_account_id);

            res.status(201).json({
                message: "Account created successfully",
                account: account
            });
        } catch (error) {
            console.error("Controller Error:", error.message);

            if (error.message.includes('Email is required') ||
                error.message.includes('Password is required')) {
                return res.status(400).json({
                    message: error.message
                });
            }

            res.status(500).json({
                message: "Error creating account",
                error: error.message
            });
        }
    }

    async delete_account(req, res) {
        try {
            const account = await account_model.delete_account(req.params.account_id);
            res.status(200).json({
                message: "Account deleted successfully",
                account_id: account.account_id
            });
        } catch (error) {
            if (error.message === "Account not found") {
                res.status(404).json({
                    message: "Account not found"
                });
            } else {
                console.error("Controller Error:", error.message);
                res.status(500).json({
                    message: "Error deleting account",
                    error: error.message
                });
            }
        }
    }
}

module.exports = new account_controller();

//
// // Create new account
// router.post("/", async (req, res) => {
//     const { email, password, invited_by_account_id } = req.body;
//
//     try {
//         const result = await database.query(
//             "INSERT INTO account (email, password, login_attempts, account_status, join_date, invited_by_account_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING account_id, email, account_status, join_date",
//             [email, password, 0, "active", new Date(), invited_by_account_id]
//         );
//
//         res.status(201).json({
//             message: "Account created successfully",
//             account: result.rows[0],
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: "Error creating account",
//             error: error.message,
//         });
//     }
// });
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
// // Delete account
// router.delete("/:account_id", async (req, res) => {
//     const account_id = req.params.account_id;
//
//     try {
//         const result = await database.query(
//             "DELETE FROM account WHERE account_id = $1 RETURNING account_id",
//             [account_id]
//         );
//
//         if (result.rows.length === 0) {
//             return res.status(404).json({
//                 message: "Account not found",
//             });
//         }
//
//         res.status(200).json({
//             message: "Account deleted successfully",
//             account_id: result.rows[0].account_id,
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: "Error deleting account",
//             error: error.message,
//         });
//     }
// });
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
