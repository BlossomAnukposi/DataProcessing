const request = require("supertest");
const app = require("../../../app");
const { getAuthToken, createTestProfile } = require("../helpers/testSetup");

describe("Preference Routes", () => {
  let authToken;
  let testPreferenceId;
  let testProfileId;

  beforeAll(async () => {
    try {
      console.log("Setting up test environment...");

      authToken = await getAuthToken();
      console.log("Got auth token");

      const profile = await createTestProfile();
      console.log("Created test profile:", profile);

      testProfileId = profile.profileId;

      if (!testProfileId) {
        throw new Error("Failed to get profile ID");
      }

      console.log("Test setup complete. Profile ID:", testProfileId);
    } catch (error) {
      console.error("Test setup failed:", error);
      throw error;
    }
  });

  // Clean up after tests
  afterAll(async () => {
    if (testPreferenceId) {
      try {
        await request(app)
          .delete(`/preference/${testPreferenceId}`)
          .set("Authorization", `Bearer ${authToken}`)
          .set("Accept", "application/json");
      } catch (error) {
        console.error("Cleanup failed:", error);
      }
    }
  });

  describe("POST /preference", () => {
    it("should create new preference", async () => {
      try {
        const preferenceData = {
          profileId: testProfileId,
          movie_id: 1,
          series_id: null,
          genre: 1,
          age_classification: 1,
        };

        console.log("Creating preference with:", preferenceData);
        console.log("Using profile ID:", testProfileId);

        const response = await request(app)
          .post("/preference")
          .set("Authorization", `Bearer ${authToken}`)
          .set("Accept", "application/json")
          .send(preferenceData);

        console.log("Preference creation response:", response.body);

        expect(response.status).toBe(201);
        const result = response.body.result[0];
        expect(result).toHaveProperty("preference_id");
        testPreferenceId = result.preference_id;
      } catch (error) {
        console.error("Preference creation failed:", error);
        throw error;
      }
    });
  });

  describe("GET /preference", () => {
    it("should get all preferences", async () => {
      const response = await request(app)
        .get("/preference")
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.result)).toBe(true);
    });
  });

  describe("GET /preference/:id", () => {
    it("should get specific preference", async () => {
      expect(testPreferenceId).toBeDefined();
      console.log("Fetching preference with ID:", testPreferenceId);

      const response = await request(app)
        .get(`/preference/${testPreferenceId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      console.log("Get preference response:", response.body);

      expect(response.status).toBe(200);
      const result = response.body.result; // Result is already a single object
      expect(result).toHaveProperty("preference_id", testPreferenceId);
      expect(result).toHaveProperty("profile_id", testProfileId);
    });
  });

  describe("GET /preference/profile/:id", () => {
    it("should get preferences by profile", async () => {
      const response = await request(app)
        .get(`/preference/profile/${testProfileId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.result)).toBe(true);
    });
  });

  describe("PUT /preference/:id", () => {
    it("should update preference", async () => {
      expect(testPreferenceId).toBeDefined();
      console.log("Updating preference:", testPreferenceId);

      const updateData = {
        genre: 2,
        age_classification: 2,
      };

      const response = await request(app)
        .put(`/preference/${testPreferenceId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json")
        .send(updateData);

      console.log("Update response:", response.body);

      expect(response.status).toBe(200);
      const result = response.body.result[0]; // Access first item in result array
      expect(result).toHaveProperty("genre", 2);
      expect(result).toHaveProperty("age_classification", 2);
    });
  });

  describe("DELETE /preference/:id", () => {
    it("should delete preference", async () => {
      expect(testPreferenceId).toBeDefined();
      console.log("Deleting preference:", testPreferenceId);

      const response = await request(app)
        .delete(`/preference/${testPreferenceId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);

      // Verify deletion
      const getResponse = await request(app)
        .get(`/preference/${testPreferenceId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(getResponse.status).toBe(404);
      console.log("Successfully verified preference deletion");
    });
  });
});
