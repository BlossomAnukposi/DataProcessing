const database = require("../../config/database");
const ModelParent = require("./modelParent");
const bcrypt = require("bcryptjs");

class WatchedMediaListModel extends ModelParent {
    constructor() {
        super("watched media list");
    }

    async createWatchedMediaList(movieId = null, episodeId = null, profileId, subtitleId = null, viewCount = null, timeLeftAt) {
        try {
            if (!movieId && !episodeId) {
                throw new Error("At least one of movieId or episodeId must be provided.");
            } else if (movieId && episodeId) {
                throw new Error("You cannot create a watchlist entry for both movieId and episodeId at the same time.");
            }

            const result = await database.query(
                'SELECT * FROM public.create_watched_media_list($1, $2, $3, $4, $5, $6)',
                [movieId, episodeId, profileId, subtitleId, viewCount, timeLeftAt]
            );

            return result;
        } catch (err) {
            console.error(err);
            throw new Error("Failed to create watchlist entry.");
        }
    }

    async getWatchedMediaListByProfile(profileId) {
        try {
            const result = await database.query(
                'SELECT * FROM public.profile_watched_media WHERE profile_id = $1',
                [profileId]
            );

            return result;
        } catch (err) {
            console.error(err);
            throw new Error("Failed to retrieve watchlist for profile.");
        }
    }
}

module.exports = new WatchedMediaListModel();
