const SeasonModel = require("../model/seasonModel");
const ControllerParent = require("../../api/controller/controllerParent");
const EpisodeModel = require("../model/episodeModel");
const sea = require("node:sea");

class EpisodeController extends ControllerParent
{
    constructor()
    {
        super(EpisodeModel);

        ['getEpisodesBySeason', 'updateEpisode'].forEach(
            method => this[method] = this[method].bind(this)
        );
    }

    async getAllEntries(req, res, method)
    {
        await super.getAllEntries(req, res, 'getAllEpisodesQuery');
    }

    async getEntryById(req, res, method)
    {
        await super.getEntryById(req, res, 'getEpisodeByIdQuery');
    }

    async deleteEntryById(req, res, method)
    {
        await super.deleteEntryById(req, res, 'deleteEpisodeByIdQuery');
    }

    async getEpisodesBySeason(req, res)
    {
        const isXml = this.isXmlRequest(req);
        const seasonId = req.params.id;

        try {
            if (!seasonId) return this.sendResponse(res, 400, 'Season id required', null, isXml);

            const season = await SeasonModel.getEntryById(seasonId);
            if (!season?.length) return this.sendResponse(res, 404, 'Season does not exist', null, isXml);

            const result = await EpisodeModel.getEpisodesBySeason(seasonId);
            this.sendResponse(res, 200, 'episodes gathered successfully', result, isXml);
        }
        catch (err)
        {
            this.handleError(err, res, isXml);
        }
    }

    async createEpisode(req, res)
    {
        const isXml = this.isXmlRequest(req);

        try {
            const { seasonId, title, number, description, episode_url, duration } = req.body;
            if (!seasonId || !title || !number || !duration) return this.sendResponse(res, 400, 'You must provide the season, title, number, and duration of this episode', null, isXml);

            const season = await SeasonModel.getEntryById(req.params.id);
            if (!season?.length) return this.sendResponse(res, 404, 'Season does not exist', null, isXml);

            const result = await EpisodeModel.createEpisode(seasonId, title, number, description, episode_url, duration);
            this.sendResponse(res, 200, 'episode created', result, isXml);
        }
        catch (err)
        {
            this.handleError(err, res, isXml);
        }
    }

    async updateEpisode(req, res) {
        try {
            const isXml = this.isXmlRequest(req);
            const episodeId = req.params.id;
            const { seasonId, title, number, description, episode_url, duration } = req.body;
            const result = await EpisodeModel.updateEpisode(episodeId, seasonId, title, number, description, episode_url, duration);

            if (!result?.length) return this.sendResponse(res, 404, 'Episode not found', null, isXml);

            return result[0];
        }
        catch (error) {
            this.handleError('updating', error);
        }
    }
}

const controller = new EpisodeController();
module.exports = controller;

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
