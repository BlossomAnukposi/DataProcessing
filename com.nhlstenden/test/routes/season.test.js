const request = require("supertest");
const app = require("../../../app");
const { getAuthToken } = require("../helpers/testSetup");

describe("Season Routes", () => {
  let authToken;
  let testSeasonId;
  let testSeriesId = 1; // Using a known series ID, adjust if needed

  beforeAll(async () => {
    authToken = await getAuthToken();
  });

  // Clean up after tests
  afterAll(async () => {
    if (testSeasonId) {
      try {
        await request(app)
          .delete(`/season/${testSeasonId}`)
          .set("Authorization", `Bearer ${authToken}`)
          .set("Accept", "application/json");
      } catch (error) {
        console.error("Cleanup failed:", error);
      }
    }
  });

  describe("POST /season", () => {
    it("should create new season", async () => {
      try {
        const seasonData = {
          seriesId: testSeriesId,
          seasonNumber: 1,
          seasonUrl: "https://example.com/season1",
        };

        console.log("Creating season with:", seasonData);

        const response = await request(app)
          .post("/season")
          .set("Authorization", `Bearer ${authToken}`)
          .set("Accept", "application/json")
          .send(seasonData);

        console.log("Season creation response:", response.body);

        expect(response.status).toBe(201); // Changed to 201 for creation
        const result = response.body.result[0]; // Access first item in result array
        expect(result).toHaveProperty("season_id");
        testSeasonId = result.season_id;
        console.log("Created season with ID:", testSeasonId);
      } catch (error) {
        console.error("Season creation failed:", error);
        throw error;
      }
    });
  });

  describe("GET /season", () => {
    it("should get all seasons", async () => {
      const response = await request(app)
        .get("/season")
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.result)).toBe(true);
    });
  });

  describe("GET /season/:id", () => {
    it("should get specific season", async () => {
      expect(testSeasonId).toBeDefined();
      console.log("Fetching season with ID:", testSeasonId);

      const response = await request(app)
        .get(`/season/${testSeasonId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      console.log("Get season response:", response.body);

      expect(response.status).toBe(200);
      const result = response.body.result; // Result is already a single object
      expect(result).toHaveProperty("season_id", testSeasonId);
      expect(result).toHaveProperty("season_number", 1);
    });
  });

  describe("PUT /season/:id", () => {
    it("should update season details", async () => {
      expect(testSeasonId).toBeDefined();
      console.log("Updating season:", testSeasonId);

      const updateData = {
        seasonNumber: 2,
        seasonUrl: "https://example.com/season2",
      };

      const response = await request(app)
        .put(`/season/${testSeasonId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json")
        .send(updateData);

      console.log("Update response:", response.body);

      expect(response.status).toBe(200);
      const result = response.body.result[0]; // Access first item in result array
      expect(result).toHaveProperty("season_number");
      expect(result.season_number).toBe(2);
      expect(result).toHaveProperty("season_url");
      expect(result.season_url).toBe("https://example.com/season2");
    });
  });

  describe("DELETE /season/:id", () => {
    it("should delete season", async () => {
      expect(testSeasonId).toBeDefined();
      console.log("Deleting season:", testSeasonId);

      const response = await request(app)
        .delete(`/season/${testSeasonId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);

      // Verify deletion
      const getResponse = await request(app)
        .get(`/season/${testSeasonId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(getResponse.status).toBe(404);
      console.log("Successfully verified season deletion");
    });
  });
});
