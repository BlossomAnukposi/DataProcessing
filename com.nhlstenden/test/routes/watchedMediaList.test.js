const request = require("supertest");
const app = require("../../../app");
const { getAuthToken, createTestAccount } = require("../helpers/testSetup");

describe("WatchedMediaList Routes", () => {
  let authToken;
  let testWatchedId;
  let testAccount;

  beforeAll(async () => {
    authToken = await getAuthToken();
    testAccount = await createTestAccount();
  });

  describe("POST /watched-media", () => {
    it("should create new watched media entry", async () => {
      const watchedData = {
        profile_id: 1,
        movie_id: 1,
        series_id: null,
        watch_date: new Date().toISOString().split("T")[0],
        watch_duration: "01:30:00",
        completed: true,
      };

      const response = await request(app)
        .post("/watched-media")
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json")
        .send(watchedData);

      expect(response.status).toBe(200);
      const result = response.body.result || response.body;
      expect(result).toHaveProperty("watched_id");
      testWatchedId = result.watched_id;
    });
  });

  describe("GET /watched-media", () => {
    it("should get all watched media entries", async () => {
      const response = await request(app)
        .get("/watched-media")
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      const result = response.body.result || response.body;
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("GET /watched-media/:id", () => {
    it("should get specific watched media entry", async () => {
      expect(testWatchedId).toBeDefined();
      const response = await request(app)
        .get(`/watched-media/${testWatchedId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      const result = response.body.result || response.body;
      expect(result).toHaveProperty("watched_id", testWatchedId);
    });
  });

  describe("GET /watched-media/profile/:id", () => {
    it("should get watched media by profile", async () => {
      const response = await request(app)
        .get("/watched-media/profile/1")
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      const result = response.body.result || response.body;
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("PUT /watched-media/:id", () => {
    it("should update watched media entry", async () => {
      expect(testWatchedId).toBeDefined();
      const response = await request(app)
        .put(`/watched-media/${testWatchedId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json")
        .send({
          completed: false,
          watch_duration: "00:45:00",
        });

      expect(response.status).toBe(200);
      const result = response.body.result || response.body;
      expect(result.completed).toBe(false);
      expect(result.watch_duration).toBe("00:45:00");
    });
  });

  describe("DELETE /watched-media/:id", () => {
    it("should delete watched media entry", async () => {
      expect(testWatchedId).toBeDefined();
      const response = await request(app)
        .delete(`/watched-media/${testWatchedId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
    });
  });
});
