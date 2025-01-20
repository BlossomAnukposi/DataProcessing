const express = require("express");
const WatchlistController = require("../controller/watchlistController");

class WatchlistRoute {
    constructor() {
        this.router = express.Router();
        this.watchlistController = WatchlistController;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/", this.watchlistController.getAllEntries.bind(this.watchlistController));
        this.router.get("/:id", this.watchlistController.getEntryById.bind(this.watchlistController));
        this.router.delete("/:id", this.watchlistController.deleteEntryById.bind(this.watchlistController));
        this.router.post("/", this.watchlistController.createWatchlist.bind(this.watchlistController));
        this.router.get("/profile/:id", this.watchlistController.getWatchlistByProfile.bind(this.watchlistController));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new WatchlistRoute().getRouter();

/**
 * @swagger
 * /watchlist:
 *   get:
 *     tags:
 *       - Watchlist
 *     summary: Get all watchlist entries
 *     description: Retrieves all watchlist entries from the database.
 *     security:
 *       - bearerAuth: []
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
/**
 * @swagger
 * /watchlist/{id}:
 *   get:
 *     tags:
 *       - Watchlist
 *     summary: Get a watchlist entry by ID
 *     description: Retrieves a specific watchlist entry by its ID.
 *     security:
 *       - bearerAuth: []
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
/**
 * @swagger
 * /watchlist/{id}:
 *   delete:
 *     tags:
 *       - Watchlist
 *     summary: Delete a watchlist entry by ID
 *     description: Deletes a specific watchlist entry by its ID.
 *     security:
 *       - bearerAuth: []
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
/**
 * @swagger
 * /watchlist:
 *   post:
 *     tags:
 *       - Watchlist
 *     summary: Create a new watchlist entry
 *     description: Creates a new entry in the watchlist with the provided details.
 *     security:
 *       - bearerAuth: []
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
/**
 * @swagger
 * /watchlist/profile/{id}:
 *   get:
 *     tags:
 *       - Watchlist
 *     summary: Get watchlist by profile
 *     description: Retrieves the watchlist entries associated with a specific profile.
 *     security:
 *       - bearerAuth: []
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
