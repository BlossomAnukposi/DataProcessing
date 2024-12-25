const express = require("express");
const router = express.Router();
const account_controller = require("../../api/controller/account_controller");

router.get('/', account_controller.get_all_accounts);
router.get('/:id', account_controller.get_account_by_id);
router.post('/', account_controller.create_account);
router.patch('/:account_id', account_controller.update_account);
router.delete('/:account_id', account_controller.delete_account);

module.exports = router;

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
// // Get single account
// router.get("/:account_id", async (req, res) => {
//     const account_id = req.params.account_id;
//
//     try {
//         const result = await database.query(
//             "SELECT account_id, email, account_status, join_date, invited_by_account_id FROM account WHERE account_id = $1",
//             [account_id]
//         );
//
//         if (result.rows.length === 0) {
//             return res.status(404).json({
//                 message: "Account not found",
//             });
//         }
//
//         res.status(200).json(result.rows[0]);
//     } catch (error) {
//         res.status(500).json({
//             message: "Error fetching account",
//             error: error.message,
//         });
//     }
// });
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
