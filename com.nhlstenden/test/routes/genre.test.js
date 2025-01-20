const request = require("supertest");
const app = require("../../../app");
const { getAuthToken } = require("../helpers/testSetup");

describe("Genre Routes", () => {
  let authToken;
  let testGenreId;

  beforeAll(async () => {
    authToken = await getAuthToken();
  });

  // Clean up after tests
  afterAll(async () => {
    if (testGenreId) {
      try {
        await request(app)
          .delete(`/genre/${testGenreId}`)
          .set("Authorization", `Bearer ${authToken}`)
          .set("Accept", "application/json");
      } catch (error) {
        console.error("Cleanup failed:", error);
      }
    }
  });

  describe("POST /genre", () => {
    it("should create new genre", async () => {
      try {
        const genreData = {
          name: "Test Genre",
          description: "Test Genre Description",
        };

        console.log("Creating genre with:", genreData);

        const response = await request(app)
          .post("/genre")
          .set("Authorization", `Bearer ${authToken}`)
          .set("Accept", "application/json")
          .send(genreData);

        console.log("Genre creation response:", response.body);

        expect(response.status).toBe(201); // Changed from 200 to 201 for creation
        const result = response.body.result[0]; // Access first item in result array
        expect(result).toHaveProperty("genre_id");
        testGenreId = result.genre_id;
        console.log("Created genre with ID:", testGenreId);
      } catch (error) {
        console.error("Genre creation failed:", error);
        throw error;
      }
    });
  });

  describe("GET /genre", () => {
    it("should get all genres", async () => {
      const response = await request(app)
        .get("/genre")
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.result)).toBe(true);
    });
  });

  describe("GET /genre/:id", () => {
    it("should get specific genre", async () => {
      expect(testGenreId).toBeDefined();
      console.log("Fetching genre with ID:", testGenreId);

      const response = await request(app)
        .get(`/genre/${testGenreId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      console.log("Get genre response:", response.body);

      expect(response.status).toBe(200);
      const result = response.body.result; // Result is already a single object
      expect(result).toHaveProperty("genre_id", testGenreId);
      expect(result).toHaveProperty("name", "Test Genre");
    });
  });

  describe("GET /genre/movie/:id", () => {
    it("should get movies by genre", async () => {
      expect(testGenreId).toBeDefined();
      console.log("Fetching movies for genre:", testGenreId);

      const response = await request(app)
        .get(`/genre/movie/${testGenreId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      console.log("Movies by genre response:", response.body);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.result)).toBe(true);
    });
  });

  describe("DELETE /genre/:id", () => {
    it("should delete genre", async () => {
      expect(testGenreId).toBeDefined();
      console.log("Deleting genre:", testGenreId);

      const response = await request(app)
        .delete(`/genre/${testGenreId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);

      // Verify deletion
      const getResponse = await request(app)
        .get(`/genre/${testGenreId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(getResponse.status).toBe(404);
      console.log("Successfully verified genre deletion");
    });
  });
});
