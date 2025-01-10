const database = require("../../config/database");
const ModelParent = require("./modelParent");

class EpisodeModel extends ModelParent
{
    constructor()
    {
        super("episode");
    }

    async getEpisodesBySeason(seasonId)
    {
        try {
            return await database.query(
                "SELECT * FROM public.get_episodes_by_season",
                [seasonId]
            );
        }
        catch (error)
        {
            throw new Error(`Could not get episodes for this season. ${error}`);
        }
    }

    async createEpisode(seasonId, title, number, description = null, episode_url = null, duration)
    {
        try {
            const result = await database.query(
                'SELECT * FROM public.create_episode($1, $2, $3, $4, $5, $6)',
                [seasonId, title, number, description, episode_url, duration]
            );

            if(!result?.length) return console.log(`Could not create episode`);
            return result[0];
        }
        catch (error)
        {
            this.handleError('creating', error);
        }
    }

    async updateEpisode(episodeId, seasonId, title, number, description, episode_url, duration) {
        try {
            let formattedDuration = null;
            if (duration && typeof duration === 'object') {
                const hours = parseInt(duration.hours || 0, 10);
                const minutes = parseInt(duration.minutes || 0, 10);
                const seconds = parseInt(duration.seconds || 0, 10);

                // Format as HH:MM:SS for INTERVAL type
                formattedDuration = `${hours}:${minutes}:${seconds}`;
            }

            const params = [
                episodeId,
                seasonId !== undefined ? seasonId : null,
                title !== undefined ? title : null,
                number !== undefined ? number : null,
                description !== undefined ? description : null,
                episode_url !== undefined ? episode_url : null,
                formattedDuration !== undefined ? formattedDuration : null
            ];

            const result = await database.query(
                'SELECT * FROM public.update_episode($1::INTEGER, $2::INTEGER, $3::VARCHAR, $4::INTEGER, $5::TEXT, $6::VARCHAR, $7::INTERVAL)',
                params
            );

            if (!result?.length) throw new Error('Episode not found');
            return result[0];
        } catch (error) {
            this.handleError('updating', error);
        }
    }

}

module.exports = new EpisodeModel();

// // // CREATE new episode
// // router.post('/', async (req, res) => {
// //     try {
// //         const { season_id, title, number, description, duration } = req.body;
// //
// //         // Validate required fields
// //         if (!season_id || !title || !number || !description || !duration) {
// //             return res.status(400).json({
// //                 message: 'All fields are required'
// //             });
// //         }
// //
// //         // Check if episode number already exists in season
// //         const checkQuery = `
// //             SELECT COUNT(*) FROM episode
// //             WHERE season_id = $1 AND number = $2
// //         `;
// //         const checkResult = await pool.query(checkQuery, [season_id, number]);
// //
// //         if (checkResult.rows[0].count > 0) {
// //             return res.status(400).json({
// //                 message: 'Episode number already exists in this season'
// //             });
// //         }
// //
// //         const query = `
// //             INSERT INTO episode (
// //                 season_id,
// //                 title,
// //                 number,
// //                 description,
// //                 duration
// //             )
// //             VALUES ($1, $2, $3, $4, $5)
// //             RETURNING *
// //         `;
// //
// //         const result = await pool.query(query, [
// //             season_id,
// //             title,
// //             number,
// //             description,
// //             duration
// //         ]);
// //
// //         res.status(201).json({
// //             message: 'Episode created successfully',
// //             episode: result.rows[0]
// //         });
// //     } catch (error) {
// //         res.status(500).json({
// //             message: 'Error creating episode',
// //             error: error.message
// //         });
// //     }
// // });
// //
// // // UPDATE episode
// // router.patch('/:episode_id', async (req, res) => {
// //     try {
// //         const episodeId = req.params.episode_id;
// //         const { title, number, description, duration } = req.body;
// //
// //         // If number is being updated, check for conflicts
// //         if (number) {
// //             const episode = await pool.query(
// //                 'SELECT season_id FROM episode WHERE episode_id = $1',
// //                 [episodeId]
// //             );
// //
// //             if (episode.rows.length > 0) {
// //                 const checkQuery = `
// //                     SELECT COUNT(*) FROM episode
// //                     WHERE season_id = $1 AND number = $2 AND episode_id != $3
// //                 `;
// //                 const checkResult = await pool.query(checkQuery, [
// //                     episode.rows[0].season_id,
// //                     number,
// //                     episodeId
// //                 ]);
// //
// //                 if (checkResult.rows[0].count > 0) {
// //                     return res.status(400).json({
// //                         message: 'Episode number already exists in this season'
// //                     });
// //                 }
// //             }
// //         }
// //
// //         const query = `
// //             UPDATE episode
// //             SET title = COALESCE($1, title),
// //                 number = COALESCE($2, number),
// //                 description = COALESCE($3, description),
// //                 duration = COALESCE($4, duration)
// //             WHERE episode_id = $5
// //             RETURNING *
// //         `;
// //
// //         const result = await pool.query(query, [
// //             title,
// //             number,
// //             description,
// //             duration,
// //             episodeId
// //         ]);
// //
// //         if (result.rows.length === 0) {
// //             return res.status(404).json({
// //                 message: 'Episode not found'
// //             });
// //         }
// //
// //         res.status(200).json({
// //             message: 'Episode updated successfully',
// //             episode: result.rows[0]
// //         });
// //     } catch (error) {
// //         res.status(500).json({
// //             message: 'Error updating episode',
// //             error: error.message
// //         });
// //     }
// // });
// //
// // // DELETE episode
// // router.delete('/:episode_id', async (req, res) => {
// //     try {
// //         const episodeId = req.params.episode_id;
// //
// //         // Check if episode has any subtitles
// //         const checkQuery = `
// //             SELECT COUNT(*) FROM subtitle
// //             WHERE episode_id = $1
// //         `;
// //         const checkResult = await pool.query(checkQuery, [episodeId]);
// //
// //         if (checkResult.rows[0].count > 0) {
// //             return res.status(400).json({
// //                 message: 'Cannot delete episode as it has associated subtitles'
// //             });
// //         }
// //
// //         const deleteQuery = `
// //             DELETE FROM episode
// //             WHERE episode_id = $1
// //             RETURNING *
// //         `;
// //         const result = await pool.query(deleteQuery, [episodeId]);
// //
// //         if (result.rows.length === 0) {
// //             return res.status(404).json({
// //                 message: 'Episode not found'
// //             });
// //         }
// //
// //         res.status(200).json({
// //             message: 'Episode deleted successfully',
// //             deleted_episode: result.rows[0]
// //         });
// //     } catch (error) {
// //         res.status(500).json({
// //             message: 'Error deleting episode',
// //             error: error.message
// //         });
// //     }
// // });
// //
