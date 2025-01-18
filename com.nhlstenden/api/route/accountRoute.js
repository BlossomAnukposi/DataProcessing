const express = require("express");
const router = express.Router();
const AccountController = require("../controller/accountController");
const { authenticateToken } = require("../../middleware/authMiddleware");
const TokenUtils = require("../../utils/tokenUtils");

// Public routes
router.post("/signIn", AccountController.signIn);
router.post("/", AccountController.createAccount);

// Protected routes - require authentication
router.get("/", authenticateToken, AccountController.getAllEntries);
router.get("/:id", authenticateToken, AccountController.getEntryById);
router.delete("/:id", authenticateToken, AccountController.deleteEntryById);
router.patch("/:id", authenticateToken, AccountController.updateAccount);

// Add this route for testing
router.get("/test-token", async (req, res) => {
    try {
        const testUser = {
            id: 1,
            email: "test@test.com",
            account_status: "active",
        };

        const token = TokenUtils.generateToken(testUser);
        res.json({
            success: true,
            token,
            decoded: TokenUtils.verifyToken(token),
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

module.exports = router;
