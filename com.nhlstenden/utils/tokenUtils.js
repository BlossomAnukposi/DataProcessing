const jwt = require("jsonwebtoken");

// Make sure JWT_SECRET is not undefined
const JWT_SECRET = process.env.JWT_SECRET || "netflix-clone-secret-key-2024";
const TOKEN_EXPIRY = "24h";

class TokenUtils {
  static generateToken(user) {
    try {
      if (!user || !user.id) {
        throw new Error("Invalid user data for token generation");
      }

      console.log("Creating token payload for user:", user.id);
      const payload = {
        id: user.id,
        email: user.email,
        accountStatus: user.account_status,
      };

      if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured");
      }

      console.log("Signing token with payload:", payload);
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });

      if (!token) {
        throw new Error("Token generation failed");
      }

      console.log("Token generated successfully");
      return token;
    } catch (error) {
      console.error("Token generation failed:", error);
      throw error;
    }
  }

  static verifyToken(token) {
    if (!token) {
      throw new Error("No token provided");
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log("Token verified successfully:", decoded);
      return decoded;
    } catch (error) {
      console.error("Token verification failed:", error);
      throw new Error(`Invalid token: ${error.message}`);
    }
  }
}

module.exports = TokenUtils;
