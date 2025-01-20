const request = require("supertest");
const app = require("../../../app");
const { getAuthToken } = require("../helpers/testSetup");

describe("ReferralDiscount Routes", () => {
  let authToken;
  let testReferralDiscountId;

  beforeAll(async () => {
    // Replace getAuthToken logic with actual test account credentials if needed
    authToken = await getAuthToken({
      email: "brad.pitt@netflix.com", // Replace with actual credentials provided
      password: "$2a$10$mVYlVZR6b6BBd89L.h4Ro.4Zz1qsmN4wE7DfWRrEdAXVHiMXrBqv6", // Add the correct password for this account
    });
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
    it("should create a new referral discount", async () => {
      const referralData = {
        accountId: 21, // Account ID from the given entry
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
