const express = require("express");
const EpisodeController = require("../controller/episodeController");

class EpisodeRoute {
    constructor() {
        this.router = express.Router();
        this.episodeController = EpisodeController;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/", this.episodeController.getAllEntries.bind(this.episodeController));
        this.router.get("/:id", this.episodeController.getEntryById.bind(this.episodeController));
        this.router.delete("/:id", this.episodeController.deleteEntryById.bind(this.episodeController));
        this.router.post("/", this.episodeController.createEpisode.bind(this.episodeController));
        this.router.put("/:id", this.episodeController.updateEpisode.bind(this.episodeController));
        this.router.get("/season/:id", this.episodeController.getEpisodesBySeason.bind(this.episodeController));
        this.router.get("/series/:id", this.episodeController.getEpisodesBySeries.bind(this.episodeController));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new EpisodeRoute().getRouter();

//EPISODE DOCUMENTATION
/**
 * @swagger
 * /episode:
 *   get:
 *     tags:
 *       - Episode
 *     summary: Get all episodes
 *     description: Fetches all episodes from the database
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all episodes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   episode_id:
 *                     type: integer
 *                   season_id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   number:
 *                     type: integer
 *                   description:
 *                     type: string
 *                   episode_url:
 *                     type: string
 *                   duration:
 *                     type: string
 *                   view_count:
 *                     type: integer
 *           application/xml:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   episode_id:
 *                     type: integer
 *                   season_id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   number:
 *                     type: integer
 *                   description:
 *                     type: string
 *                   episode_url:
 *                     type: string
 *                   duration:
 *                     type: string
 *                   view_count:
 *                     type: integer
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /episode/{id}:
 *   get:
 *     tags:
 *       - Episode
 *     summary: Get a specific episode by ID
 *     description: Fetches a specific episode based on the ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Episode ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested episode
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 episode_id:
 *                   type: integer
 *                 season_id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 number:
 *                   type: integer
 *                 description:
 *                   type: string
 *                 episode_url:
 *                   type: string
 *                 duration:
 *                   type: string
 *                 view_count:
 *                   type: integer
 *           application/xml:
 *             schema:
 *               type: object
 *               properties:
 *                 episode_id:
 *                   type: integer
 *                 season_id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 number:
 *                   type: integer
 *                 description:
 *                   type: string
 *                 episode_url:
 *                   type: string
 *                 duration:
 *                   type: string
 *                 view_count:
 *                   type: integer
 *       404:
 *         description: Episode not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /episode:
 *   post:
 *     tags:
 *       - Episode
 *     summary: Create a new episode
 *     description: Adds a new episode to the database
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               seasonId:
 *                 type: integer
 *               title:
 *                 type: string
 *               number:
 *                 type: integer
 *               description:
 *                 type: string
 *               episodeUrl:
 *                 type: string
 *               duration:
 *                 type: string
 *         application/xml:
 *           schema:
 *             type: object
 *             properties:
 *               seasonId:
 *                 type: integer
 *               title:
 *                 type: string
 *               number:
 *                 type: integer
 *               description:
 *                 type: string
 *               episodeUrl:
 *                 type: string
 *               duration:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully created episode
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 episode_id:
 *                   type: integer
 *                 season_id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 number:
 *                   type: integer
 *                 description:
 *                   type: string
 *                 episode_url:
 *                   type: string
 *                 duration:
 *                   type: string
 *                 view_count:
 *                   type: integer
 *           application/xml:
 *             schema:
 *               type: object
 *               properties:
 *                 episode_id:
 *                   type: integer
 *                 season_id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 number:
 *                   type: integer
 *                 description:
 *                   type: string
 *                 episode_url:
 *                   type: string
 *                 duration:
 *                   type: string
 *                 view_count:
 *                   type: integer
 *       400:
 *         description: Bad request (missing required fields)
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /episode/{id}:
 *   put:
 *     tags:
 *       - Episode
 *     summary: Update an episode by ID
 *     description: Updates the details of a specific episode
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Episode ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               seasonId:
 *                 type: integer
 *               title:
 *                 type: string
 *               number:
 *                 type: integer
 *               description:
 *                 type: string
 *               episodeUrl:
 *                 type: string
 *               duration:
 *                 type: string
 *         application/xml:
 *           schema:
 *             type: object
 *             properties:
 *               seasonId:
 *                 type: integer
 *               title:
 *                 type: string
 *               number:
 *                 type: integer
 *               description:
 *                 type: string
 *               episodeUrl:
 *                 type: string
 *               duration:
 *                 type: string
 *     responses:
 *       200:
 *         description: Episode successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 episode_id:
 *                   type: integer
 *                 season_id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 number:
 *                   type: integer
 *                 description:
 *                   type: string
 *                 episode_url:
 *                   type: string
 *                 duration:
 *                   type: string
 *                 view_count:
 *                   type: integer
 *           application/xml:
 *             schema:
 *               type: object
 *               properties:
 *                 episode_id:
 *                   type: integer
 *                 season_id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 number:
 *                   type: integer
 *                 description:
 *                   type: string
 *                 episode_url:
 *                   type: string
 *                 duration:
 *                   type: string
 *                 view_count:
 *                   type: integer
 *       404:
 *         description: Episode not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /episode/{id}:
 *   delete:
 *     tags:
 *       - Episode
 *     summary: Delete an episode by ID
 *     description: Deletes a specific episode
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Episode ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Episode successfully deleted
 *       404:
 *         description: Episode not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /episodes/season/{id}:
 *   get:
 *     tags:
 *       - Episode
 *       - Season
 *     summary: Get episodes by season ID
 *     description: Fetches all episodes associated with a specific season by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the season to retrieve episodes for.
 *     responses:
 *       200:
 *         description: A list of episodes in the specified season.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   episode_id:
 *                     type: integer
 *                     description: Unique ID for the episode.
 *                   title:
 *                     type: string
 *                     description: The title of the episode.
 *                   duration:
 *                     type: integer
 *                     description: Duration of the episode in minutes.
 *                   release_date:
 *                     type: string
 *                     format: date
 *                     description: Release date of the episode.
 *                   season_id:
 *                     type: integer
 *                     description: ID of the season the episode belongs to.
 *       404:
 *         description: No episodes found or season not found.
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /episodes/series/{id}:
 *   get:
 *     tags:
 *       - Episode
 *       - Series
 *     summary: Get episodes by series ID
 *     description: Fetches all episodes associated with a specific series by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the series to retrieve episodes for.
 *     responses:
 *       200:
 *         description: A list of episodes in the specified series.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   episode_id:
 *                     type: integer
 *                     description: Unique ID for the episode.
 *                   title:
 *                     type: string
 *                     description: The title of the episode.
 *                   duration:
 *                     type: integer
 *                     description: Duration of the episode in minutes.
 *                   release_date:
 *                     type: string
 *                     format: date
 *                     description: Release date of the episode.
 *                   series_id:
 *                     type: integer
 *                     description: ID of the series the episode belongs to.
 *       404:
 *         description: No episodes found or series not found.
 *       500:
 *         description: Server error.
 */
