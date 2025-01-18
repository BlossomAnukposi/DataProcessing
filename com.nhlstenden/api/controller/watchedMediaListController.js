const WatchedMediaListModel = require("../model/watchedMediaListModel");
const ControllerParent = require("../../api/controller/controllerParent");

class WatchedMediaListController extends ControllerParent {
    constructor() {
        super(WatchedMediaListModel);

        ["createWatchedMediaList", "getWatchedMediaListByProfile"].forEach(
            (method) => (this[method] = this[method].bind(this))
        );
    }

    //OVERWRITTEN
    async getAllEntries(req, res, method) {
        await super.getAllEntries(req, res, "getAllWatchedMediaListsQuery");
    }

    async getEntryById(req, res, method) {
        await super.getEntryById(req, res, "getWatchedMediaListByIdQuery");
    }

    async deleteEntryById(req, res, method) {
        await super.deleteEntryById(req, res, "deleteWatchedMediaListByIdQuery");
    }

    async createWatchedMediaList(req, res) {
        const isXml = this.isXmlRequest(req);

        try {
            const { movieId, episodeId, profileId, subtitleId, viewCount, timeLeftAt } = req.body;

            if (!profileId)
                return this.sendResponse(res, 400, "Profile ID is required.", null, isXml);

            const watchedMediaList = await WatchedMediaListModel.createWatchedMediaList(movieId, episodeId, profileId, subtitleId, viewCount, timeLeftAt);
            this.sendResponse(res, 201, "Watchlist entry created successfully.", watchedMediaList, isXml);
        } catch (err) {
            console.error(err);
            this.handleError(err, res, isXml);
        }
    }

    async getWatchedMediaListByProfile(req, res) {
        const isXml = this.isXmlRequest(req);
        const profileId = req.params.id;

        try {
            const watchlist = await WatchedMediaListModel.getWatchedMediaListByProfile(profileId);

            !watchlist ? this.sendResponse(res, 404, "No watchlist entries found for this profile.", null, isXml) :
                this.sendResponse(res, 200, "Watchlist entries retrieved successfully.", watchlist, isXml);
        } catch (err) {
            console.error(err);
            this.handleError(err, res, isXml);
        }
    }
}

const controller = new WatchedMediaListController();
module.exports = controller;
