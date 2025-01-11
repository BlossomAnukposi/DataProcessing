const database = require("../../config/database");
const ModelParent = require("./modelParent");

class EpisodeModel extends ModelParent
{
    constructor()
    {
        super("episode");
    }

    async getEpisodesBySeason(seasonId) {
        try {
            const result = await database.query(
                "SELECT * FROM public.get_episodes_by_season($1)",
                [seasonId]
            );

            if (!result?.length) {
                console.log(`No episodes found for season ID: ${seasonId}`);
                return null;
            }

            return result;
        } catch (err) {
            this.handleError("fetching episodes by season", err);
        }
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
                    throw new Error(`Episode with number ${number} already exists in season ${seasonId}`);
                }
                else if (errorDetails && errorDetails.includes('foreign key constraint fails'))
                {
                    throw new Error(`Invalid seasonId: ${seasonId}`);
                }

                throw new Error("Episode creation failed. No rows returned.");
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
}

module.exports = new EpisodeModel();
