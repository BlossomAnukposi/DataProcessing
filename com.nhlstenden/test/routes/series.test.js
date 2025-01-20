const request = require("supertest");
const app = require("../../../app");
const { getAuthToken } = require("../helpers/testSetup");

describe("Series Routes", () => {
  let authToken;
  let testSeriesId;

  beforeAll(async () => {
    authToken = await getAuthToken();
  });

  // Clean up after tests
  afterAll(async () => {
    if (testSeriesId) {
      try {
        await request(app)
          .delete(`/series/${testSeriesId}`)
          .set("Authorization", `Bearer ${authToken}`)
          .set("Accept", "application/json");
      } catch (error) {
        console.error("Cleanup failed:", error);
      }
    }
  });

  describe("POST /series", () => {
    it("should create new series", async () => {
      try {
        const seriesData = {
          title: "Test Series",
          age_classification: 1,
          genre: 5,
          description: "Test Series Description",
          quality: "HD",
          series_url: "https://example.com/series",
        };

        console.log("Creating series with:", seriesData);

        const response = await request(app)
          .post("/series")
          .set("Authorization", `Bearer ${authToken}`)
          .set("Accept", "application/json")
          .send(seriesData);

        console.log("Series creation response:", response.body);

        expect(response.status).toBe(201); // Changed from 200 to 201
        const result = response.body.result[0]; // Access first item in result array
        expect(result).toHaveProperty("series_id");
        testSeriesId = result.series_id;
        console.log("Created series with ID:", testSeriesId);
      } catch (error) {
        console.error("Series creation failed:", error);
        throw error;
      }
    });
  });

  describe("GET /series", () => {
    it("should get all series", async () => {
      const response = await request(app)
        .get("/series")
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.result)).toBe(true);
    });
  });

  describe("GET /series/:id", () => {
    it("should get specific series", async () => {
      expect(testSeriesId).toBeDefined();
      console.log("Fetching series with ID:", testSeriesId);

      const response = await request(app)
        .get(`/series/${testSeriesId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      console.log("Get series response:", response.body);

      expect(response.status).toBe(200);
      const result = response.body.result[0]; // Access first item in result array
      expect(result).toHaveProperty("series_id", testSeriesId);
      expect(result).toHaveProperty("title", "Test Series");
    });
  });

  describe("PUT /series/:id", () => {
    it("should update series details", async () => {
      expect(testSeriesId).toBeDefined();
      console.log("Updating series:", testSeriesId);

      const updateData = {
        title: "Updated Series Title",
        description: "Updated Description",
      };

      const response = await request(app)
        .put(`/series/${testSeriesId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json")
        .send(updateData);

      console.log("Update response:", response.body);

      expect(response.status).toBe(200);
      const result = response.body.result; // Access the result property
      expect(result).toHaveProperty("title", "Updated Series Title");
      expect(result).toHaveProperty("description", "Updated Description");
    });
  });

  describe("DELETE /series/:id", () => {
    it("should delete series", async () => {
      expect(testSeriesId).toBeDefined();
      console.log("Deleting series:", testSeriesId);

      const response = await request(app)
        .delete(`/series/${testSeriesId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);

      // Verify deletion
      const getResponse = await request(app)
        .get(`/series/${testSeriesId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(getResponse.status).toBe(404);
      console.log("Successfully verified series deletion");
    });
  });
});
