const request = require("supertest");
const app = require("../../../app");
const { getAuthToken } = require("../helpers/testSetup");

describe("Subtitle Routes", () => {
  let authToken;
  let testSubtitleId;

  beforeAll(async () => {
    authToken = await getAuthToken();
  });

  describe("POST /subtitle", () => {
    it("should add new subtitle", async () => {
      const subtitleData = {
        language: "English",
        content: "Sample subtitle content",
        movieId: 1,
        episodeId: null,
      };

      const response = await request(app)
        .post("/subtitle")
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json")
        .send(subtitleData);

      expect(response.status).toBe(200);
      const result = response.body.result || response.body;
      expect(result).toHaveProperty("subtitle_id");
      testSubtitleId = result.subtitle_id;
    });
  });

  describe("GET /subtitle", () => {
    it("should get all subtitles", async () => {
      const response = await request(app)
        .get("/subtitle")
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      const result = response.body.result || response.body;
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("GET /subtitle/:id", () => {
    it("should get specific subtitle", async () => {
      expect(testSubtitleId).toBeDefined();
      const response = await request(app)
        .get(`/subtitle/${testSubtitleId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      const result = response.body.result || response.body;
      expect(result).toHaveProperty("subtitle_id", testSubtitleId);
    });
  });

  describe("PUT /subtitle/:id", () => {
    it("should update subtitle details", async () => {
      expect(testSubtitleId).toBeDefined();
      const response = await request(app)
        .put(`/subtitle/${testSubtitleId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json")
        .send({
          language: "English",
          content: "Updated subtitle content",
          movieId: 1,
          episodeId: null,
        });

      expect(response.status).toBe(200);
      const result = response.body.result || response.body;
      expect(result.content).toBe("Updated subtitle content");
    });
  });

  describe("DELETE /subtitle/:id", () => {
    it("should delete subtitle", async () => {
      expect(testSubtitleId).toBeDefined();
      const response = await request(app)
        .delete(`/subtitle/${testSubtitleId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
    });
  });
});
