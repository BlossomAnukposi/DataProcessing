const WatchlistModel = require("../model/watchlistModel");
const ControllerParent = require("../../api/controller/controllerParent");

class WatchlistController extends ControllerParent {
    constructor() {
        super(WatchlistModel);

        ["createWatchlist", "getWatchlistByProfile"].forEach(
            (method) => (this[method] = this[method].bind(this))
        );
    }

    //OVERWRITTEN
    async getAllEntries(req, res, method) {
        await super.getAllEntries(req, res, "getAllWatchlistsQuery");
    }

    async getEntryById(req, res, method) {
        await super.getEntryById(req, res, "getWatchlistByIdQuery");
    }

    async deleteEntryById(req, res, method) {
        await super.deleteEntryById(req, res, "deleteWatchlistByIdQuery");
    }

    async createWatchlist(req, res) {
        const isXml = this.isXmlRequest(req);

        try {
            const { profileId, movieId, seriesId } = req.body;

            if (!profileId)
            return this.sendResponse(res, 400, "Profile ID is required.", null, isXml);

            const watchlist = await controller.model.createWatchlist(profileId, movieId, seriesId);
            this.sendResponse(res, 201, "Watchlist entry created successfully.", watchlist, isXml);
        } catch (err) {
            console.error(err);
            this.handleError(err, res, isXml);
        }
    }

    async getWatchlistByProfile(req, res) {
        const isXml = this.isXmlRequest(req);
        const profileId = req.params.id;

        try {
            const watchlist = await WatchlistModel.getWatchlistByProfile(profileId);

            !watchlist ? this.sendResponse(res, 404, "No watchlist entries found for this profile.", null, isXml) :
            this.sendResponse(res, 200, "Watchlist entries retrieved successfully.", watchlist, isXml);
        } catch (err) {
            console.error(err);
            this.handleError(err, res, isXml);
        }
    }
}

const controller = new WatchlistController();
module.exports = controller;
