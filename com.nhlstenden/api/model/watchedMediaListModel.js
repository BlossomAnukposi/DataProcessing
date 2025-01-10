const database = require("../../config/database");
const ModelParent = require("./modelParent");

class WatchedMediaListModel extends ModelParent {
    constructor() {
        super("watchedMediaList");
    }

    // Custom methods
    async createWatchedMedia(profileId, movieId = null, episodeId = null, subtitleId = null, viewCount = 0, timeLeftAt = 0) {
        try {
            const result = await database.query(
                `SELECT * FROM public.add_watched_media($1, $2, $3, $4, $5, $6)`,
                [profileId, movieId, episodeId, subtitleId, viewCount, timeLeftAt]
            );

            if (!result?.length) {
                console.log("Could not create watched media entry.");
                return null;
            }
            return result[0];
        } catch (err) {
            this.handleError('creating', err);
        }
    }

    async updateWatchedMedia(watchedMediaId, profileId, movieId = null, episodeId = null, subtitleId = null, viewCount = 0, timeLeftAt = 0) {
        try {
            console.log("Updating watched media entry:", {
                watchedMediaId,
                profileId,
                movieId: movieId ? 'provided' : 'not provided',
                episodeId: episodeId ? 'provided' : 'not provided',
                subtitleId,
                viewCount,
                timeLeftAt
            });

            const result = await database.query(
                `SELECT * FROM public.update_watched_media($1, $2, $3, $4, $5, $6, $7)`,
                [watchedMediaId, profileId, movieId, episodeId, subtitleId, viewCount, timeLeftAt]
            );

            if (!result || result.length === 0) {
                throw new Error('Watched media entry not found');
            }

            return result[0];
        } catch (err) {
            this.handleError('updating', err);
        }
    }
}

module.exports = new WatchedMediaListModel();
