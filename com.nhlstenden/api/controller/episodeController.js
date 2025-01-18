const SeasonModel = require("../model/seasonModel");
const ControllerParent = require("../../api/controller/controllerParent");
const EpisodeModel = require("../model/episodeModel");

class EpisodeController extends ControllerParent
{
    constructor()
    {
        super(EpisodeModel);

        ['getEpisodesBySeason', 'updateEpisode', 'createEpisode'].forEach(
            method => this[method] = this[method].bind(this)
        );
    }

    async getAllEntries(req, res, method)
    {
        await super.getAllEntries(req, res, 'getAllEpisodesQuery');
    }

    async getEntryById(req, res, method)
    {
        await super.getEntryById(req, res, 'getEpisodeByIdQuery');
    }

    async deleteEntryById(req, res, method)
    {
        await super.deleteEntryById(req, res, 'deleteEpisodeByIdQuery');
    }

    async getEpisodesBySeason(req, res) {
        const isXml = this.isXmlRequest(req);

        try {
            const { id } = req.params;

            if (!id) {
                return this.sendResponse(res, 400, "Season ID is required", null, isXml);
            }

            // if (!await SeasonModel.getEntryById(id)) return this.sendResponse(res, 404, "Season not found", null, isXml);

            const episodes = await EpisodeModel.getEpisodesBySeason(id);

            if (!episodes) {
                return this.sendResponse(res, 404, "No episodes found for the specified season ID", null, isXml);
            }

            this.sendResponse(res, 200, "Episodes retrieved successfully", episodes, isXml);
        } catch (err) {
            this.handleError(err, res, isXml);
        }
    }

    async createEpisode(req, res) {
        const isXml = this.isXmlRequest(req);

        try {
            const { seasonId, title, number, description, episodeUrl, duration } = req.body;

            if (!seasonId || !title || !number || !description || !episodeUrl || !duration) {
                return this.sendResponse(res, 400, "All fields are required", null, isXml);
            }

            const episode = await EpisodeModel.createEpisode(seasonId, title, number, description, episodeUrl, duration);

            this.sendResponse(res, 201, "Episode created successfully", episode, isXml);
        } catch (err) {
            this.handleError(err, res, isXml);
        }
    }

    async updateEpisode(req, res) {
        const isXml = this.isXmlRequest(req);

        try {
            const { seasonId, title, number, description, episodeUrl, duration } = req.body;

            if (!seasonId && !title && !number && !description && !episodeUrl && !duration) {
                return this.sendResponse(res, 400, 'At least one field must be provided');
            }

            const episode = await EpisodeModel.updateEpisode(req.params.id, seasonId, title, number, description, episodeUrl, duration);
            this.sendResponse(res, 200, 'Episode updated successfully.', episode, isXml);
        } catch (err) {
            this.handleError(err, res, isXml);
        }
    }
}

const controller = new EpisodeController();
module.exports = controller;
