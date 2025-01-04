const database = require("../../config/database");
const ModelParent = require("./modelParent");

class EpisodeModel extends ModelParent
{
    constructor()
    {
        super("episode");
    }

    getEpisodesBySeason = async(seasonId) =>
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
}

module.exports = new EpisodeModel();
//
//    async get_all_episodes()
//     {
//         try
//         {
//             return await database.query('SELECT * FROM public.get_all_episodes()');
//         }
//         catch (error)
//         {
//             throw new Error("Error fetching accounts. Error message is: " + error.message);
//         }
//     }
// }
//
// module.exports = new episode_model();
//
// // // GET all episodes
// // router.get('/', async (req, res) => {
// //     try {
// //         const query = `
// //             SELECT e.episode_id, e.season_id, e.title, e.number,
// //                    e.description, e.duration
// //             FROM episode e
// //             ORDER BY e.number ASC
// //         `;
// //         const result = await pool.query(query);
// //         res.status(200).json(result.rows);
// //     } catch (error) {
// //         res.status(500).json({
// //             message: 'Error fetching episodes',
// //             error: error.message
// //         });
// //     }
// // });
// //
// // // GET episodes by season
// // router.get('/season/:season_id', async (req, res) => {
// //     try {
// //         const seasonId = req.params.season_id;
// //         const query = `
// //             SELECT episode_id, season_id, title, number,
// //                    description, duration
// //             FROM episode
// //             WHERE season_id = $1
// //             ORDER BY number ASC
// //         `;
// //         const result = await pool.query(query, [seasonId]);
// //         res.status(200).json(result.rows);
// //     } catch (error) {
// //         res.status(500).json({
// //             message: 'Error fetching episodes for season',
// //             error: error.message
// //         });
// //     }
// // });
// //
// // // GET specific episode
// // router.get('/:episode_id', async (req, res) => {
// //     try {
// //         const episodeId = req.params.episode_id;
// //         const query = `
// //             SELECT episode_id, season_id, title, number,
// //                    description, duration
// //             FROM episode
// //             WHERE episode_id = $1
// //         `;
// //         const result = await pool.query(query, [episodeId]);
// //
// //         if (result.rows.length === 0) {
// //             return res.status(404).json({
// //                 message: 'Episode not found'
// //             });
// //         }
// //
// //         res.status(200).json(result.rows[0]);
// //     } catch (error) {
// //         res.status(500).json({
// //             message: 'Error fetching episode',
// //             error: error.message
// //         });
// //     }
// // });
// //
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
