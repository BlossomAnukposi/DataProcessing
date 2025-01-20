const SubtitleModel = require("../model/subtitleModel");
const ControllerParent = require("../../api/controller/controllerParent");

class SubtitleController extends ControllerParent {
  constructor() {
    super(SubtitleModel);

    ["addSubtitle", "updateSubtitleById"].forEach(
      (method) => (this[method] = this[method].bind(this))
    );
  }

  // OVERWRITTEN METHODS
  async getAllEntries(req, res) {
    await super.getAllEntries(req, res, "getAllSubtitlesQuery");
  }

  async getEntryById(req, res) {
    await super.getEntryById(req, res, "getSubtitleByIdQuery");
  }

  async deleteEntryById(req, res) {
    await super.deleteEntryById(req, res, "deleteSubtitleByIdQuery");
  }

  // CUSTOM METHODS
  async addSubtitle(req, res) {
    const isXml = this.isXmlRequest(req);

    try {
      const { language, content, movieId, episodeId } = req.body;

      if (!language || !content || (!movieId && !episodeId)) {
        return this.sendResponse(
          res,
          400,
          "Language, content, and either movieId or episodeId are required.",
          null,
          isXml
        );
      }

      const subtitle = await SubtitleModel.addSubtitle(
        language,
        content,
        movieId,
        episodeId
      );
      this.sendResponse(
        res,
        200,
        "Subtitle added successfully.",
        subtitle,
        isXml
      );
    } catch (err) {
      this.handleError(err, res, isXml);
    }
  }

  async updateSubtitleById(req, res) {
    const isXml = this.isXmlRequest(req);

    try {
      const subtitleId = req.params.id;
      // Extract all fields from body, using existing values if not provided
      const {
        language = null, // Changed to allow null/undefined
        content = null, // Changed to allow null/undefined
        movieId = null,
        episodeId = null,
      } = req.body;

      if (!language && !content && !movieId && !episodeId) {
        return this.sendResponse(
          res,
          400,
          "At least one field (language, content, movieId, or episodeId) must be provided.",
          null,
          isXml
        );
      }

      const subtitle = await SubtitleModel.updateSubtitleById(
        subtitleId,
        language,
        content,
        movieId,
        episodeId
      );

      this.sendResponse(
        res,
        200,
        "Subtitle updated successfully.",
        subtitle,
        isXml
      );
    } catch (err) {
      this.handleError(err, res, isXml);
    }
  }
}

const controller = new SubtitleController();
module.exports = controller;
