const database = require("../../config/database");
const ModelParent = require("./modelParent");

class PreferenceModel extends ModelParent {
  constructor() {
    super("preference");
  }

  async createPreference(
    profileId,
    movieId = null,
    seriesId = null,
    ageClassification = null,
    genre = null
  ) {
    try {
      const result = await database.query(
        `SELECT * FROM public.create_preference($1, $2, $3, $4, $5)`,
        [movieId, seriesId, ageClassification, genre, profileId]
      );

      if (!result) {
        throw new Error("Preference creation failed");
      }
      return result[0];
    } catch (err) {
      this.handleError("creating preference", err);
    }
  }

  async getPreferencesByProfile(profileId) {
    try {
      const result = await database.query(
        `SELECT * FROM public.get_preferences_by_profile($1)`,
        [profileId]
      );

      if (!result) {
        throw new Error("Preference fetching failed");
      }
      return result;
    } catch (err) {
      this.handleError("fetching profile preferences", err);
    }
  }

  async validateProfile(profileId) {
    try {
      const result = await database.query(
        "SELECT profile_id FROM profile WHERE profile_id = $1",
        [profileId]
      );
      return result && result.length > 0;
    } catch (err) {
      this.handleError("validating profile", err);
      return false;
    }
  }
}

module.exports = new PreferenceModel();
