const request = require("supertest");
const app = require("../../../app"); // Adjust path as needed
const jwt = require("jsonwebtoken");
const { getAuthToken, createTestAccount } = require("../helpers/testSetup");

describe("Account Routes", () => {
  let authToken;
  let testAccount;

  beforeAll(async () => {
    testAccount = await createTestAccount();
    authToken = await getAuthToken();
  });

  describe("POST /account/signIn", () => {
    it("should sign in with valid credentials", async () => {
      const response = await request(app).post("/account/signIn").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(response.status).toBe(200);
      const result = response.body.result || response.body;
      expect(result).toHaveProperty("token");
      expect(result).toHaveProperty("user");
    });

    it("should reject invalid credentials", async () => {
      const response = await request(app).post("/account/signIn").send({
        email: "wrong@example.com",
        password: "wrongpass",
      });

      expect(response.status).toBe(404);
    });
  });

  describe("POST /account", () => {
    it("should create new account", async () => {
      const uniqueEmail = `test${Date.now()}@example.com`;
      const response = await request(app).post("/account").send({
        email: uniqueEmail,
        password: "newpass123",
      });

      expect(response.status).toBe(200);
      const result = response.body.result || response.body;
      expect(result).toHaveProperty("accountId");
    });

    it("should reject duplicate email", async () => {
      const response = await request(app).post("/account").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(response.status).toBe(500);
    });
  });

  describe("GET /account", () => {
    it("should get all accounts with valid token", async () => {
      const response = await request(app)
        .get("/account")
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.result)).toBe(true);
    });

    it("should reject request without token", async () => {
      const response = await request(app).get("/account");

      expect(response.status).toBe(401);
    });
  });

  describe("GET /account/:id", () => {
    it("should get specific account", async () => {
      expect(testAccount.accountId).toBeDefined();

      const response = await request(app)
        .get(`/account/${testAccount.accountId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      const result = response.body.result || response.body;
      expect(result).toHaveProperty("account_id", testAccount.accountId);
    });

    it("should return 404 for non-existent account", async () => {
      const response = await request(app)
        .get("/account/99999")
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(404);
    });
  });

  describe("PUT /account/:id", () => {
    it("should update account details", async () => {
      expect(testAccount.accountId).toBeDefined();

      const response = await request(app)
        .put(`/account/${testAccount.accountId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json")
        .send({
          email: "updated@example.com",
        });

      expect(response.status).toBe(200);
      const result = response.body.result || response.body;
      expect(result.email).toBe("updated@example.com");
    });
  });

  describe("DELETE /account/:id", () => {
    it("should delete account", async () => {
      expect(testAccount.accountId).toBeDefined();

      const response = await request(app)
        .delete(`/account/${testAccount.accountId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
    });
  });
});
