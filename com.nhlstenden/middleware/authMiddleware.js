const TokenUtils = require("../utils/tokenUtils");

class AuthMiddleware {
    static authenticateToken(req, res, next) {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({ message: "Authentication token required" });
        }

        try {
            const user = TokenUtils.verifyToken(token);
            req.user = user;
            next();
        } catch (error) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }
    }
}

module.exports = AuthMiddleware;
