const request = require("supertest");
const app = require("../../../app");
const {
  getAuthToken,
  getValidAgeClassification,
} = require("../helpers/testSetup");

describe("Movie Routes", () => {
  let authToken;
  let testMovieId;
  let validAgeClassification;

  beforeAll(async () => {
    authToken = await getAuthToken();
    validAgeClassification = await getValidAgeClassification();
  });

  afterAll(async () => {
    // Clean up test movie if it exists
    if (testMovieId) {
      try {
        await request(app)
          .delete(`/movie/${testMovieId}`)
          .set("Authorization", `Bearer ${authToken}`)
          .set("Accept", "application/json");
      } catch (error) {
        console.error("Failed to cleanup test movie:", error);
      }
    }
    // Close any open connections
    await new Promise((resolve) => setTimeout(resolve, 500)); // Give time for connections to complete
  });

  describe("POST /movie", () => {
    it("should create new movie", async () => {
      try {
        const movieData = {
          title: "Test Movie",
          description: "Test Description",
          genre: 5,
          duration: "02:30:00",
          quality_type: "HD",
          age_classification: 1,
          view_count: 0,
          movie_link: "https://example.com/movie.mp4",
        };

        console.log("Attempting to create movie with:", movieData);

        const response = await request(app)
          .post("/movie")
          .set("Authorization", `Bearer ${authToken}`)
          .set("Accept", "application/json")
          .send(movieData);

        console.log("Response:", response.status, response.body);

        expect(response.status).toBe(201);
        const result = response.body.result[0];
        expect(result).toHaveProperty("movie_id");
        testMovieId = result.movie_id;
        console.log("Created movie with ID:", testMovieId);
      } catch (error) {
        console.error("Movie creation failed:", error.response?.body || error);
        throw error;
      }
    });
  });

  describe("GET /movie", () => {
    it("should get all movies", async () => {
      const response = await request(app)
        .get("/movie")
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.result)).toBe(true);
    });
  });

  describe("GET /movie/:id", () => {
    it("should get specific movie", async () => {
      expect(testMovieId).toBeDefined();
      const response = await request(app)
        .get(`/movie/${testMovieId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      const result = response.body.result;
      expect(result).toHaveProperty("movie_id", testMovieId);
      expect(result).toHaveProperty("title", "Test Movie");
    });
  });

  describe("PUT /movie/:id", () => {
    it("should update movie details", async () => {
      expect(testMovieId).toBeDefined();
      const updateData = {
        title: "Updated Movie Title",
        description: "Updated Description",
      };

      const response = await request(app)
        .put(`/movie/${testMovieId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json")
        .send(updateData);

      expect(response.status).toBe(201);
      const result = response.body.result[0];
      expect(result).toHaveProperty("title", "Updated Movie Title");
      expect(result).toHaveProperty("description", "Updated Description");
    });
  });

  describe("DELETE /movie/:id", () => {
    it("should delete movie", async () => {
      expect(testMovieId).toBeDefined();
      const response = await request(app)
        .delete(`/movie/${testMovieId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);

      // Verify deletion
      const getResponse = await request(app)
        .get(`/movie/${testMovieId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(getResponse.status).toBe(404);
    });
  });
});
