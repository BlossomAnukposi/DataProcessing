const SeasonModel = require("../model/seasonModel");
const ControllerParent = require("../../api/controller/controllerParent");

class SeasonController extends ControllerParent {
    constructor() {
        super(SeasonModel);

        ['createSeason', 'updateSeason'].forEach(
            method => this[method] = this[method].bind(this)
        );
    }

    // Overwritten
    async getAllEntries(req, res, method) {
        await super.getAllEntries(req, res, 'getAllSeasonsQuery');
    }

    async getEntryById(req, res, method) {
        await super.getEntryById(req, res, 'getSeasonByIdQuery');
    }

    async deleteEntryById(req, res, method) {
        await super.deleteEntryById(req, res, 'deleteSeasonByIdQuery');
    }

    // Create a new season
    async createSeason(req, res) {
        const isXml = this.isXmlRequest(req);

        try {
            const { seriesId, seasonNumber, seasonUrl } = req.body;

            if (!seriesId || !seasonNumber || !seasonUrl) {
                return this.sendResponse(res, 400, 'Series ID, Season Number, and Season URL are required', null, isXml);
            }

            const newSeason = await SeasonModel.createSeason(seriesId, seasonNumber, seasonUrl);
            this.sendResponse(res, 200, 'Season created successfully.', newSeason, isXml);
        } catch (err) {
            this.handleError(err, res, isXml);
        }
    }

    // Update an existing season by ID
    async updateSeason(req, res) {
        const isXml = this.isXmlRequest(req);

        try {
            const { seriesId, seasonNumber, seasonUrl } = req.body;

            if (!seriesId && !seasonNumber && !seasonUrl) {
                return this.sendResponse(res, 400, 'At least one field (Series ID, Season Number, or Season URL) must be provided', null, isXml);
            }

            const updatedSeason = await SeasonModel.updateSeasonById(req.params.id, seriesId, seasonNumber, seasonUrl);
            this.sendResponse(res, 200, 'Season updated successfully.', updatedSeason, isXml);
        } catch (err) {
            this.handleError(err, res, isXml);
        }
    }
}

const controller = new SeasonController();
module.exports = controller;
