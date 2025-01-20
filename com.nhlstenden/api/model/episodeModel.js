const database = require("../../config/database");
const ModelParent = require("./modelParent");

class EpisodeModel extends ModelParent
{
    constructor()
    {
        super("episode");
    }

    async createEpisode(seasonId, title, number, description, episodeUrl, duration) {
        try {
            const result = await database.query(
                `SELECT * FROM public.create_episode($1, $2, $3, $4, $5, $6)`,
                [seasonId, title, number, description, episodeUrl, duration]
        );

            if (!result?.length) {
                const errorDetails = result?.rows[0]?.detail;

                if (errorDetails && errorDetails.includes('duplicate key value violates unique constraint'))
                {
                    this.handleErrorWithCode(`Episode with number ${number} already exists in season ${seasonId}`, 400);
                }
                else if (errorDetails && errorDetails.includes('foreign key constraint fails'))
                {
                    this.handleErrorWithCode(`Invalid seasonId: ${seasonId}`, 500);
                }
                    this.handleErrorWithCode('No episodes found for this season.');
            }

            return result;
        } catch (err) {
            this.handleError("Episode creation failed", err);
        }
    }


    async updateEpisode(episodeId, seasonId = null, title = null, number = null, description = null, episodeUrl = null, duration = null)
    {
        try {
            const result = await database.query(
                `SELECT * FROM public.update_episode($1, $2, $3, $4, $5, $6, $7)`,
                [episodeId, seasonId, title, number, description, episodeUrl, duration]
            );

            if (!result?.length) {
                throw new Error("Episode not found");
            }

            return result[0];
        } catch (error) {
            console.error("Model Error:", error.message);
            throw error;
        }
    }

    //THIS IS A VIEW
    async getEpisodesBySeries(seriesId) {
        try {
            const result = await database.query(
                'SELECT * FROM public.episodes_by_season_or_series WHERE series_id = $1',
                [seriesId]
            );

            if (!result || result.length === 0) {
                throw new Error('No episodes found for this season.');
            }

            return result;
        } catch (error) {
            console.error('Model Error:', error.message);
            throw error;
        }
    }

    //THIS IS A VIEW
    async getEpisodesBySeason(seasonId) {
        try {
            const result = await database.query(
                'SELECT * FROM public.episodes_by_season_or_series WHERE season_id = $1',
                [seasonId]
            );

            if (!result || result.length === 0) {
                const error = new Error('No episodes found for this season.');
                error.statusCode = 404;
                throw error;
            }

            return result;
        } catch (error) {
            console.error('Model Error:', error.message);
            throw error;
        }
    }
}

module.exports = new EpisodeModel();
