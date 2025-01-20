const request = require("supertest");
const app = require("../../../app");
const { pool } = require("../../config/database");
const jwt = require("jsonwebtoken");

async function getAuthToken() {
  const response = await request(app).post("/account/signIn").send({
    email: "test@example.com",
    password: "password123",
  });

  return response.body.result.token;
}

async function createTestAccount() {
  const email = `test${Date.now()}@example.com`;
  const response = await request(app)
    .post("/account")
    .set("Accept", "application/json")
    .send({
      email: email,
      password: "password123",
    });

  console.log("Account creation response:", response.body);

  if (!response.body.result || !response.body.result.accountId) {
    throw new Error(
      `Failed to create account: ${JSON.stringify(response.body)}`
    );
  }

  return {
    accountId: response.body.result.accountId,
    email: email,
  };
}

async function createTestProfile() {
  try {
    console.log("Starting test profile creation...");

    // First create a test account
    const account = await createTestAccount();
    console.log("Created test account:", account);

    // Get auth token
    const token = await getAuthToken();
    console.log("Got auth token");

    // Then create a profile for that account
    const profileData = {
      accountId: account.accountId,
      profileName: "Test Profile",
      profileLanguage: "English",
      dateOfBirth: "2000-01-01",
      profilePicture: "https://example.com/pic.jpg",
    };
    console.log("Attempting to create profile with:", profileData);

    const response = await request(app)
      .post("/profile")
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .send(profileData);

    console.log("Profile creation response:", response.body);

    if (!response.body.result || !response.body.result[0]) {
      throw new Error(
        `Failed to create profile: ${JSON.stringify(response.body)}`
      );
    }

    const result = {
      profileId: response.body.result[0].profile_id,
      accountId: account.accountId,
    };

    console.log("Successfully created test profile:", result);
    return result;
  } catch (error) {
    console.error("Error in createTestProfile:", error);
    throw error;
  }
}

async function getValidAgeClassification() {
  return 1;
}

module.exports = {
  getAuthToken,
  createTestAccount,
  createTestProfile,
  getValidAgeClassification,
};
