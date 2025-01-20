const request = require("supertest");
const app = require("../../../app");
const { getAuthToken, createTestAccount } = require("../helpers/testSetup");

describe("Profile Routes", () => {
  let authToken;
  let testProfileId;
  let testAccount;

  // Setup before all tests
  beforeAll(async () => {
    try {
      authToken = await getAuthToken();
      testAccount = await createTestAccount();
      console.log("Test setup completed. Account ID:", testAccount.accountId);
    } catch (error) {
      console.error("Setup failed:", error);
      throw error;
    }
  });

  // Clean up after all tests
  afterAll(async () => {
    if (testProfileId) {
      try {
        await request(app)
          .delete(`/profile/${testProfileId}`)
          .set("Authorization", `Bearer ${authToken}`)
          .set("Accept", "application/json");
      } catch (error) {
        console.error("Cleanup failed:", error);
      }
    }
  });

  describe("POST /profile", () => {
    it("should create new profile", async () => {
      try {
        const profileData = {
          accountId: testAccount.accountId,
          profileName: "Test Profile",
          dateOfBirth: "2000-01-01",
          profilePicture: "https://example.com/avatar.jpg",
          profileLanguage: "English",
        };

        console.log("Attempting to create profile with data:", profileData);

        const response = await request(app)
          .post("/profile")
          .set("Authorization", `Bearer ${authToken}`)
          .set("Accept", "application/json")
          .send(profileData);

        console.log("Profile creation response:", response.body);

        expect(response.status).toBe(201);
        expect(response.body).toBeDefined();
        expect(response.body.result).toBeDefined();
        expect(Array.isArray(response.body.result)).toBe(true);
        expect(response.body.result[0]).toHaveProperty("return_profile_id");

        testProfileId = response.body.result[0].return_profile_id;
        console.log("Successfully created profile with ID:", testProfileId);
      } catch (error) {
        console.error("Profile creation test failed:", error);
        throw error;
      }
    });
  });

  describe("GET /profile", () => {
    it("should get all profiles", async () => {
      const response = await request(app)
        .get("/profile")
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.body.result).toBeDefined();
      expect(Array.isArray(response.body.result)).toBe(true);
      expect(response.body.result.length).toBeGreaterThan(0);
    });
  });

  describe("GET /profile/:id", () => {
    it("should get specific profile", async () => {
      expect(testProfileId).toBeDefined();
      console.log("Fetching profile with ID:", testProfileId);

      const response = await request(app)
        .get(`/profile/${testProfileId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      console.log("Get profile response:", response.body);

      expect(response.status).toBe(200);
      expect(response.body.result).toBeDefined();
      expect(response.body.result).toHaveProperty("profile_id", testProfileId);
      expect(response.body.result).toHaveProperty(
        "profile_name",
        "Test Profile"
      );
      expect(response.body.result).toHaveProperty(
        "profile_language",
        "English"
      );
    });
  });

  describe("GET /profile/account/:id", () => {
    it("should get profiles by account", async () => {
      expect(testAccount.accountId).toBeDefined();
      console.log("Fetching profiles for account:", testAccount.accountId);

      const response = await request(app)
        .get(`/profile/account/${testAccount.accountId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      console.log("Get profiles by account response:", response.body);

      expect(response.status).toBe(200);
      expect(response.body.result).toBeDefined();
      expect(Array.isArray(response.body.result)).toBe(true);
      expect(response.body.result.length).toBeGreaterThan(0);

      const profile = response.body.result[0];
      expect(profile).toHaveProperty("profile_id");
      expect(profile).toHaveProperty("profile_name");
      expect(profile).toHaveProperty("profile_language");
      expect(profile).toHaveProperty("date_of_birth");
      expect(profile).toHaveProperty("profile_picture");
    });
  });

  describe("PUT /profile/:id", () => {
    it("should update profile details", async () => {
      expect(testProfileId).toBeDefined();
      console.log("Updating profile:", testProfileId);

      const updateData = {
        profileName: "Updated Profile Name",
        profileLanguage: "English",
      };

      const response = await request(app)
        .put(`/profile/${testProfileId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json")
        .send(updateData);

      console.log("Update profile response:", response.body);

      expect(response.status).toBe(200);
      expect(response.body.result).toHaveProperty(
        "profile_name",
        "Updated Profile Name"
      );
    });
  });

  describe("DELETE /profile/:id", () => {
    it("should delete profile and return 404 on subsequent get", async () => {
      expect(testProfileId).toBeDefined();
      console.log("Deleting profile:", testProfileId);

      const deleteResponse = await request(app)
        .delete(`/profile/${testProfileId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(deleteResponse.status).toBe(200);

      const getResponse = await request(app)
        .get(`/profile/${testProfileId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .set("Accept", "application/json");

      expect(getResponse.status).toBe(404);
      console.log("Successfully verified profile deletion");
    });
  });
});
