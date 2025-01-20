const request = require("supertest");
const app = require("../../../app");
const { getAuthToken, createTestAccount } = require("../helpers/testSetup");

describe("Watchlist Routes", () => {
  let authToken;
  let testWatchlistId;
  let testAccount;

  beforeAll(async () => {
    authToken = await getAuthToken();
    testAccount = await createTestAccount();
  });

  describe("POST /watchlist", () => {
    it("should create new watchlist entry", async () => {
      const watchlistData = {
        profileId: 1,
        movieId: 1,
        seriesId: null,
        date_added: new Date().toISOString().split("T")[0],
      };

      const response = await request(app)
        .post("/watchlist")
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json")
        .send(watchlistData);

      expect(response.status).toBe(201);
      const result = response.body.result || response.body;
      expect(result).toHaveProperty("watchlist_id");
      testWatchlistId = result.watchlist_id;
    });
  });

  describe("GET /watchlist", () => {
    it("should get all watchlist entries", async () => {
      const response = await request(app)
        .get("/watchlist")
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      const result = response.body.result || response.body;
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("GET /watchlist/:id", () => {
    it("should get specific watchlist entry", async () => {
      expect(testWatchlistId).toBeDefined();
      const response = await request(app)
        .get(`/watchlist/${testWatchlistId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      const result = response.body.result || response.body;
      expect(result).toHaveProperty("watchlist_id", testWatchlistId);
    });
  });

  describe("GET /watchlist/profile/:id", () => {
    it("should get watchlist entries by profile", async () => {
      const response = await request(app)
        .get("/watchlist/profile/1")
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      const result = response.body.result || response.body;
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("DELETE /watchlist/:id", () => {
    it("should delete watchlist entry", async () => {
      expect(testWatchlistId).toBeDefined();
      const response = await request(app)
        .delete(`/watchlist/${testWatchlistId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
    });
  });
});
