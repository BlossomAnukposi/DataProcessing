const AccountModel = require("../model/accountModel");
const ControllerParent = require("../../api/controller/controllerParent");
const bcrypt = require("bcryptjs");
const TokenUtils = require("../../utils/tokenUtils");

class AccountController extends ControllerParent {
  constructor() {
    super(AccountModel);

    ["createAccount", "updateAccount", "signIn"].forEach(
      (method) => (this[method] = this[method].bind(this))
    );
  }

  //OVERWRITTEN
  async getAllEntries(req, res, method) {
    await super.getAllEntries(req, res, "getAllAccountsQuery");
  }

  async getEntryById(req, res, method) {
    await super.getEntryById(req, res, "getAccountByIdQuery");
  }

  async deleteEntryById(req, res, method) {
    await super.deleteEntryById(req, res, "deleteAccountByIdQuery");
  }

  async createAccount(req, res) {
    const isXml = this.isXmlRequest(req);
    try {
      const { email, password, invitedByAccountId } = req.body;

      // Input validation
      if (!email || !password) {
        return this.sendResponse(
          res,
          400,
          "Email address or password required",
          null,
          isXml
        );
      }

      if (
        !email.includes("@") ||
        !email.includes(".") ||
        !email.includes("com")
      ) {
        return this.sendResponse(
          res,
          400,
          "Invalid email address",
          null,
          isXml
        );
      }

      const account = await AccountModel.createAccountWithRetry(
        email,
        password,
        invitedByAccountId
      );

      if (!account) {
        return this.sendResponse(
          res,
          500,
          "Failed to create account",
          null,
          isXml
        );
      }
      this.sendResponse(
        res,
        200,
        "account created successfully.",
        account,
        isXml
      );
    } catch (err) {
      this.handleError(err, res, isXml);
    }
  }

  async signIn(req, res) {
    const isXml = this.isXmlRequest(req);

    try {
      const { email, password } = req.body;
      console.log("Login attempt with:", { email, password: "***" });

      if (!email || !password) {
        return this.sendResponse(
          res,
          400,
          "Email address or password required",
          null,
          isXml
        );
      }

      // Fetch the account by email
      const account = await AccountModel.getAccountByEmail(email);
      console.log("Account data:", account);

      if (!account) {
        return this.sendResponse(res, 404, "Account not found", null, isXml);
      }

      // Compare passwords
      const isPasswordCorrect = await bcrypt.compare(
        password,
        account.password
      );
      console.log("Password verification:", isPasswordCorrect);

      if (!isPasswordCorrect) {
        return this.sendResponse(res, 401, "Invalid credentials", null, isXml);
      }

      try {
        // Generate token
        console.log("About to generate token for account:", account);
        const token = TokenUtils.generateToken(account);
        console.log("Generated token:", token);

        // Remove password from response
        const { password: _, ...accountWithoutPassword } = account;

        const responseData = {
          user: accountWithoutPassword,
          token: token,
        };
        console.log("Sending response data:", responseData);

        return this.sendResponse(
          res,
          200,
          "Sign in successful",
          responseData,
          isXml
        );
      } catch (tokenError) {
        console.error("Token generation error:", tokenError);
        return this.sendResponse(
          res,
          500,
          "Error generating authentication token",
          null,
          isXml
        );
      }
    } catch (err) {
      console.error("SignIn error:", err);
      this.handleError(err, res, isXml);
    }
  }

  async updateAccount(req, res) {
    const isXml = this.isXmlRequest(req);
    const validStatuses = ["active", "inactive", "blocked"];

    try {
      const { email, password, accountStatus } = req.body;

      if (!email && !password && !accountStatus)
        return this.sendResponse(
          res,
          400,
          "At least one field must be provided",
          null,
          isXml
        );

      // Validate status if provided
      if (accountStatus && !validStatuses.includes(accountStatus)) {
        return this.sendResponse(
          res,
          400,
          "Invalid account status",
          null,
          isXml
        );
      }

      const account = await AccountModel.updateAccount(
        req.params.id,
        email,
        password,
        accountStatus
      );
      this.sendResponse(
        res,
        200,
        "account updated successfully.",
        account,
        isXml
      );
    } catch (err) {
      this.handleError(err, res, isXml);
    }
  }
}

const controller = new AccountController();
module.exports = controller;
