const request = require("supertest");
const app = require("../../../app");
const { getAuthToken } = require("../helpers/testSetup");

describe("ReferralDiscount Routes", () => {
  let authToken;
  let testReferralDiscountId;

  beforeAll(async () => {
    authToken = await getAuthToken();
  });

  // Clean up after tests
  afterAll(async () => {
    if (testReferralDiscountId) {
      try {
        await request(app)
          .delete(`/referralDiscount/${testReferralDiscountId}`)
          .set("Authorization", `Bearer ${authToken}`)
          .set("Accept", "application/json");
      } catch (error) {
        console.error("Cleanup failed:", error);
      }
    }
  });

  describe("POST /referralDiscount", () => {
    it("should create new referral discount", async () => {
      const referralData = {
        accountId: 1, // Use a known account ID
        numberOfReferralUses: 5,
        referralLink: "https://example.com/refer/test123",
      };

      const response = await request(app)
        .post("/referralDiscount")
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json")
        .send(referralData);

      expect(response.status).toBe(201);
      const result = response.body.result[0];
      expect(result).toHaveProperty("referral_discount_id");
      testReferralDiscountId = result.referral_discount_id;
    });
  });

  describe("GET /referralDiscount", () => {
    it("should get all referral discounts", async () => {
      const response = await request(app)
        .get("/referralDiscount")
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.result)).toBe(true);
    });
  });

  describe("GET /referralDiscount/status", () => {
    it("should get all referral statuses", async () => {
      const response = await request(app)
        .get("/referralDiscount/status")
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.result)).toBe(true);
    });
  });

  describe("DELETE /referralDiscount/:id", () => {
    it("should delete referral discount", async () => {
      expect(testReferralDiscountId).toBeDefined();

      const response = await request(app)
        .delete(`/referralDiscount/${testReferralDiscountId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);

      // Verify deletion
      const getResponse = await request(app)
        .get(`/referralDiscount/${testReferralDiscountId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(getResponse.status).toBe(404);
    });
  });
});
