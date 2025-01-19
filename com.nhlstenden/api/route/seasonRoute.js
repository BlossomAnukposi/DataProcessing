const express = require("express");
const router = express.Router();
const SeasonController = require("../controller/seasonController");

/**
 * @swagger
 * /seasons:
 *   get:
 *     tags:
 *       - Season
 *     summary: Get all seasons
 *     description: Retrieves all seasons from the database.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all seasons.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   season_id:
 *                     type: integer
 *                   series_id:
 *                     type: integer
 *                   season_number:
 *                     type: integer
 *                   season_url:
 *                     type: string
 *       500:
 *         description: Server error.
 */
router.get('/', SeasonController.getAllEntries);

/**
 * @swagger
 * /seasons/{id}:
 *   get:
 *     tags:
 *       - Season
 *     summary: Get a season by ID
 *     description: Retrieves a specific season based on its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the season.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The season details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 season_id:
 *                   type: integer
 *                 series_id:
 *                   type: integer
 *                 season_number:
 *                   type: integer
 *                 season_url:
 *                   type: string
 *       404:
 *         description: Season not found.
 *       500:
 *         description: Server error.
 */
router.get('/:id', SeasonController.getEntryById);

/**
 * @swagger
 * /seasons/{id}:
 *   delete:
 *     tags:
 *       - Season
 *     summary: Delete a season by ID
 *     description: Deletes a specific season based on its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the season to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Season deleted successfully.
 *       404:
 *         description: Season not found.
 *       500:
 *         description: Server error.
 */
router.delete('/:id', SeasonController.deleteEntryById);

/**
 * @swagger
 * /seasons:
 *   post:
 *     tags:
 *       - Season
 *     summary: Create a new season
 *     description: Creates a new season with the provided details.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               seriesId:
 *                 type: integer
 *               seasonNumber:
 *                 type: integer
 *               seasonUrl:
 *                 type: string
 *             required:
 *               - seriesId
 *               - seasonNumber
 *               - seasonUrl
 *     responses:
 *       200:
 *         description: Season created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 season_id:
 *                   type: integer
 *                 series_id:
 *                   type: integer
 *                 season_number:
 *                   type: integer
 *                 season_url:
 *                   type: string
 *       400:
 *         description: Missing required fields.
 *       500:
 *         description: Server error.
 */
router.post('/', SeasonController.createSeason);

/**
 * @swagger
 * /seasons/{id}:
 *   put:
 *     tags:
 *       - Season
 *     summary: Update an existing season
 *     description: Updates a season with the given details.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the season to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               seriesId:
 *                 type: integer
 *               seasonNumber:
 *                 type: integer
 *               seasonUrl:
 *                 type: string
 *             required:
 *               - seriesId
 *               - seasonNumber
 *               - seasonUrl
 *     responses:
 *       200:
 *         description: Season updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 season_id:
 *                   type: integer
 *                 series_id:
 *                   type: integer
 *                 season_number:
 *                   type: integer
 *                 season_url:
 *                   type: string
 *       400:
 *         description: At least one field is required.
 *       404:
 *         description: Season not found.
 *       500:
 *         description: Server error.
 */
router.put('/:id', SeasonController.updateSeason);

/**
 * @swagger
 * /seasons/series/{id}:
 *   get:
 *     tags:
 *       - Season
 *       - Series
 *     summary: Get seasons by series ID
 *     description: Fetches all seasons associated with a specific series ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the series.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of seasons in the specified series.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   season_id:
 *                     type: integer
 *                   series_id:
 *                     type: integer
 *                   season_number:
 *                     type: integer
 *                   season_url:
 *                     type: string
 *       404:
 *         description: No seasons found for the series.
 *       500:
 *         description: Server error.
 */
router.get("/series/:id", SeasonController.getSeasonsBySeries);

module.exports = router;