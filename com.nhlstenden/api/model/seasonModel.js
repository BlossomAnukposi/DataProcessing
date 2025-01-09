const database = require("../../config/database");
const ModelParent = require("./modelParent");

class SeasonModel extends ModelParent {
    constructor() {
        super("season");
    }

    async createSeason(seriesId, seasonNumber, seasonUrl) {
        try {
            const result = await database.query(
                'SELECT * FROM public.create_season($1, $2, $3)',
                [seriesId, seasonNumber, seasonUrl]
            );

            if (!result?.length) {
                console.log(`Could not create season.`);
                return null;
            }
            return result[0];
        } catch (err) {
            this.handleError('creating season', err);
        }
    }

    async updateSeasonById(seasonId, seriesId = null, seasonNumber = null, seasonUrl = null) {
        try {
            console.log('Updating season:', {
                seasonId,
                seriesId: seriesId ? 'provided' : 'not provided',
                seasonNumber: seasonNumber ? 'provided' : 'not provided',
                seasonUrl: seasonUrl ? 'provided' : 'not provided',
            });

            const result = await database.query(
                'SELECT * FROM public.update_season_by_id($1, $2, $3, $4)',
                [seasonId, seriesId, seasonNumber, seasonUrl]
            );

            if (!result || result.length === 0) {
                throw new Error('Season not found');
            }

            return result[0];
        } catch (error) {
            console.error('Model Error:', error.message);
            throw error;
        }
    }
}

module.exports = new SeasonModel();
