const WatchedMediaListModel = require("../model/watchedMediaListModel");
const ControllerParent = require("../../api/controller/controllerParent");

class WatchedMediaListController extends ControllerParent {
    constructor() {
        super(WatchedMediaListModel);

        // Bind additional methods
        ['createWatchedMedia', 'updateWatchedMedia'].forEach(
            method => this[method] = this[method].bind(this)
        );
    }

    // Overwritten methods
    async getAllEntries(req, res) {
        await super.getAllEntries(req, res, 'getAllWatchedMediaQuery');
    }

    async getEntryById(req, res) {
        await super.getEntryById(req, res, 'getWatchedMediaByIdQuery');
    }

    async deleteEntryById(req, res) {
        await super.deleteEntryById(req, res, 'deleteWatchedMediaByIdQuery');
    }

    // Custom methods
    async createWatchedMedia(req, res) {
        const isXml = this.isXmlRequest(req);

        try {
            const { profileId, movieId, episodeId, subtitleId, viewCount, timeLeftAt } = req.body;

            if (!profileId) {
                return this.sendResponse(res, 400, 'Profile ID is required', null, isXml);
            }

            if (!movieId && !episodeId) {
                return this.sendResponse(res, 400, 'Either Movie ID or Episode ID is required', null, isXml);
            }

            const watchedMedia = await WatchedMediaListModel.createWatchedMedia(
                profileId,
                movieId,
                episodeId,
                subtitleId,
                viewCount,
                timeLeftAt
            );

            this.sendResponse(res, 200, 'Watched media created successfully.', watchedMedia, isXml);
        } catch (err) {
            this.handleError(err, res, isXml);
        }
    }

    async updateWatchedMedia(req, res) {
        const isXml = this.isXmlRequest(req);

        try {
            const { profileId, movieId, episodeId, subtitleId, viewCount, timeLeftAt } = req.body;

            if (!profileId) {
                return this.sendResponse(res, 400, 'Profile ID is required for update', null, isXml);
            }

            if (!movieId && !episodeId) {
                return this.sendResponse(res, 400, 'Either Movie ID or Episode ID is required', null, isXml);
            }

            const watchedMedia = await WatchedMediaListModel.updateWatchedMedia(
                req.params.id,
                profileId,
                movieId,
                episodeId,
                subtitleId,
                viewCount,
                timeLeftAt
            );

            this.sendResponse(res, 200, 'Watched media updated successfully.', watchedMedia, isXml);
        } catch (err) {
            this.handleError(err, res, isXml);
        }
    }
}

const controller = new WatchedMediaListController();
module.exports = controller;
