const request = require("supertest");
const app = require("../../../app");
const { getAuthToken } = require("../helpers/testSetup");

describe("Episode Routes", () => {
  let authToken;
  let testEpisodeId;

  async function createTestSeason() {
    const seasonData = {
      series_id: 1,
      seasonNumber: 1,
      season_url: "https://example.com/season1",
    };

    const response = await request(app)
      .post("/season")
      .set("Authorization", `Bearer ${authToken}`)
      .set("Accept", "application/json")
      .send(seasonData);

    if (response.status !== 201) {
      console.log("Season creation failed:", response.body);
    }

    return response.body.result || response.body;
  }

  beforeAll(async () => {
    authToken = await getAuthToken();
    try {
      const season = await createTestSeason();
      console.log("Test season created:", season);
    } catch (error) {
      console.log("Using existing season");
    }
  });

  describe("POST /episode", () => {
    it("should create new episode", async () => {
      const episodeData = {
        seasonId: 1,
        title: "Test Episode",
        number: 1,
        description: "Test episode description",
        episodeUrl: "https://example.com/episode1",
        duration: "00:45:00",
      };

      console.log("Attempting to create episode with:", episodeData);

      const response = await request(app)
        .post("/episode")
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json")
        .send(episodeData);

      if (response.status !== 201) {
        console.log("Episode creation failed:", response.body);
      }

      expect(response.status).toBe(201);
      const result = response.body.result || response.body;
      expect(result).toHaveProperty("episode_id");
      testEpisodeId = result.episode_id;
    });
  });

  describe("GET /episode", () => {
    it("should get all episodes", async () => {
      const response = await request(app)
        .get("/episode")
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      const result = response.body.result || response.body;
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("GET /episode/:id", () => {
    it("should get specific episode", async () => {
      expect(testEpisodeId).toBeDefined();
      const response = await request(app)
        .get(`/episode/${testEpisodeId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      const result = response.body.result || response.body;
      expect(result).toHaveProperty("episode_id", testEpisodeId);
    });
  });

  describe("GET /episode/series/:id", () => {
    it("should get episodes by series", async () => {
      const response = await request(app)
        .get("/episode/series/1")
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      const result = response.body.result || response.body;
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("PUT /episode/:id", () => {
    it("should update episode details", async () => {
      expect(testEpisodeId).toBeDefined();
      const response = await request(app)
        .put(`/episode/${testEpisodeId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json")
        .send({
          seasonId: 1,
          title: "Updated Episode Title",
          number: 2,
          description: "Updated description",
          episodeUrl: "https://example.com/updated",
          duration: "01:00:00",
        });

      expect(response.status).toBe(200);
      const result = response.body.result || response.body;
      expect(result.title).toBe("Updated Episode Title");
    });
  });

  describe("DELETE /episode/:id", () => {
    it("should delete episode", async () => {
      expect(testEpisodeId).toBeDefined();
      const response = await request(app)
        .delete(`/episode/${testEpisodeId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
    });
  });
});
