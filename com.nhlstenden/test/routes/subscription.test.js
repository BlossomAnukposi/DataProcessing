const request = require("supertest");
const app = require("../../../app");
const { getAuthToken, createTestAccount } = require("../helpers/testSetup");

describe("Subscription Routes", () => {
  let authToken;
  let testSubscriptionId;
  let testAccount;

  beforeAll(async () => {
    authToken = await getAuthToken();
    testAccount = await createTestAccount();
  });

  // Clean up after tests
  afterAll(async () => {
    if (testSubscriptionId) {
      try {
        await request(app)
          .delete(`/subscription/${testSubscriptionId}`)
          .set("Authorization", `Bearer ${authToken}`)
          .set("Accept", "application/json");
      } catch (error) {
        console.error("Cleanup failed:", error);
      }
    }
  });

  describe("POST /subscription", () => {
    it("should create new subscription", async () => {
      const subscriptionData = {
        account_id: testAccount.accountId,
        subscription_type: "Premium",
        subscription_price: 14.99,
        start_date: new Date().toISOString().split("T")[0],
        end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
      };

      const response = await request(app)
        .post("/subscription")
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json")
        .send(subscriptionData);

      expect(response.status).toBe(200);
      const result = response.body.result || response.body;
      expect(result).toHaveProperty("subscription_id");
      testSubscriptionId = result.subscription_id;
    });
  });

  describe("GET /subscription", () => {
    it("should get all subscriptions", async () => {
      const response = await request(app)
        .get("/subscription")
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      const result = response.body.result || response.body;
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("GET /subscription/account", () => {
    it("should get account subscriptions", async () => {
      const response = await request(app)
        .get("/subscription/account")
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      const result = response.body.result || response.body;
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("GET /subscription/active", () => {
    it("should get active subscriptions", async () => {
      const response = await request(app)
        .get("/subscription/active")
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      const result = response.body.result || response.body;
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("GET /subscription/:id", () => {
    it("should get specific subscription", async () => {
      expect(testSubscriptionId).toBeDefined();
      const response = await request(app)
        .get(`/subscription/${testSubscriptionId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      const result = response.body.result || response.body;
      expect(result).toHaveProperty("subscription_id", testSubscriptionId);
    });
  });

  describe("PUT /subscription/:id", () => {
    it("should update subscription details", async () => {
      expect(testSubscriptionId).toBeDefined();
      const response = await request(app)
        .put(`/subscription/${testSubscriptionId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json")
        .send({
          subscription_price: 19.99,
        });

      expect(response.status).toBe(200);
      const result = response.body.result || response.body;
      expect(result.subscription_price).toBe(19.99);
    });
  });

  describe("DELETE /subscription/:id", () => {
    it("should delete subscription", async () => {
      expect(testSubscriptionId).toBeDefined();
      const response = await request(app)
        .delete(`/subscription/${testSubscriptionId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);

      // Verify deletion
      const getResponse = await request(app)
        .get(`/subscription/${testSubscriptionId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(getResponse.status).toBe(404);
    });
  });
});
