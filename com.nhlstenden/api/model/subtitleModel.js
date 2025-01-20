const database = require("../../config/database");
const ModelParent = require("./modelParent");

class SubtitleModel extends ModelParent {
  constructor() {
    super("subtitle");
  }

  // Add a new subtitle
  async addSubtitle(language, content, movieId = null, episodeId = null) {
    try {
      const result = await database.query(
        `SELECT * FROM public.add_subtitle($1, $2, $3, $4)`,
        [language, content, movieId, episodeId]
      );

      if (!result || result.length === 0) {
        throw new Error("Failed to add subtitle.");
      }

      return result[0];
    } catch (err) {
      this.handleError("adding subtitle", err);
    }
  }

  // Update a subtitle by ID
  async updateSubtitleById(
    subtitleId,
    language,
    content,
    movieId = null,
    episodeId = null
  ) {
    try {
      const result = await database.query(
        `SELECT * FROM public.update_subtitle_by_id($1, $2, $3, $4, $5)`,
        [subtitleId, language, content, movieId, episodeId]
      );

      if (!result || result.length === 0) {
        throw new Error(
          "Failed to update subtitle. Subtitle not found or invalid data."
        );
      }

      return result[0];
    } catch (err) {
      this.handleError("updating subtitle by ID", err);
    }
  }
}

module.exports = new SubtitleModel();
