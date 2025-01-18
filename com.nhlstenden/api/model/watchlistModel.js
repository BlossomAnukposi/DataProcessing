const database = require("../../config/database");
const ModelParent = require("./modelParent");
const bcrypt = require("bcryptjs");

class WatchlistModel extends ModelParent {
    constructor() {
        super("watchlist");
    }

    async createWatchlist(profileId, movieId = null, seriesId = null) {
        try {
            if (!movieId && !seriesId)
                throw new Error("At least one of movieId or seriesId must be provided.");

            const result = await database.query(
                'SELECT * FROM public.create_watchlist($1, $2, $3)',
                [profileId, movieId, seriesId]
            );

            return result;
        } catch (err) {
            console.error(err);
            throw new Error("Failed to create watchlist entry.");
        }
    }

    async getWatchlistByProfile(profileId) {
        try {
            const result = await database.query(
                'SELECT * FROM public.get_profile_watchlist($1)',
                [profileId]
            );

            return result;
        } catch (err) {
            console.error(err);
            throw new Error("Failed to retrieve watchlist for profile.");
        }
    }
}

module.exports = new WatchlistModel();
