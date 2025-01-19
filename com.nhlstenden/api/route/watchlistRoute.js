const express = require("express");
const router = express.Router();
const WatchlistController = require("../controller/watchlistController");

/**
 * @swagger
 * /watchlist:
 *   get:
 *     tags:
 *       - Watchlist
 *     summary: Get all watchlist entries
 *     description: Retrieves all watchlist entries from the database.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all watchlist entries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Watchlist'
 *       500:
 *         description: Server error.
 */
router.get("/", WatchlistController.getAllEntries);

/**
 * @swagger
 * /watchlist/{id}:
 *   get:
 *     tags:
 *       - Watchlist
 *     summary: Get a watchlist entry by ID
 *     description: Retrieves a specific watchlist entry by its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the watchlist entry.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The watchlist entry details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Watchlist'
 *       404:
 *         description: Watchlist entry not found.
 *       500:
 *         description: Server error.
 */
router.get("/:id", WatchlistController.getEntryById);

/**
 * @swagger
 * /watchlist/{id}:
 *   delete:
 *     tags:
 *       - Watchlist
 *     summary: Delete a watchlist entry by ID
 *     description: Deletes a specific watchlist entry by its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the watchlist entry to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Watchlist entry deleted successfully.
 *       404:
 *         description: Watchlist entry not found.
 *       500:
 *         description: Server error.
 */
router.delete("/:id", WatchlistController.deleteEntryById);

/**
 * @swagger
 * /watchlist:
 *   post:
 *     tags:
 *       - Watchlist
 *     summary: Create a new watchlist entry
 *     description: Creates a new entry in the watchlist with the provided details.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profileId:
 *                 type: integer
 *               movieId:
 *                 type: integer
 *               seriesId:
 *                 type: integer
 *             required:
 *               - profileId
 *     responses:
 *       201:
 *         description: Watchlist entry created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Watchlist'
 *       400:
 *         description: Missing required fields.
 *       500:
 *         description: Server error.
 */
router.post("/", WatchlistController.createWatchlist);

/**
 * @swagger
 * /watchlist/profile/{id}:
 *   get:
 *     tags:
 *       - Watchlist
 *     summary: Get watchlist by profile
 *     description: Retrieves the watchlist entries associated with a specific profile.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the profile.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Watchlist entries for the profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Watchlist'
 *       404:
 *         description: No entries found for this profile.
 *       500:
 *         description: Server error.
 */
router.get('/profile/:id', WatchlistController.getWatchlistByProfile);

module.exports = router;
