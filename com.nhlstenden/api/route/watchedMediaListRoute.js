const express = require("express");
const router = express.Router();
const WatchedMediaListController = require("../controller/watchedMediaListController");

/**
 * @swagger
 * /watchedMediaList:
 *   get:
 *     tags:
 *       - Watched Media List
 *     summary: Get all watched media list entries
 *     description: Retrieves all watched media list entries from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all watched media entries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WatchedMediaList'
 *       500:
 *         description: Server error.
 */
router.get("/", WatchedMediaListController.getAllEntries);

/**
 * @swagger
 * /watchedMediaList/{id}:
 *   get:
 *     tags:
 *       - Watched Media List
 *     summary: Get a watched media list entry by ID
 *     description: Retrieves a specific watched media list entry based on its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the watched media list entry.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The watched media list entry details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WatchedMediaList'
 *       404:
 *         description: Watched media list entry not found.
 *       500:
 *         description: Server error.
 */
router.get("/:id", WatchedMediaListController.getEntryById);

/**
 * @swagger
 * /watchedMediaList/{id}:
 *   delete:
 *     tags:
 *       - Watched Media List
 *     summary: Delete a watched media list entry by ID
 *     description: Deletes a specific watched media list entry based on its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the watched media list entry to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Watched media list entry deleted successfully.
 *       404:
 *         description: Watched media list entry not found.
 *       500:
 *         description: Server error.
 */
router.delete("/:id", WatchedMediaListController.deleteEntryById);

/**
 * @swagger
 * /watchedMediaList:
 *   post:
 *     tags:
 *       - Watched Media List
 *     summary: Create a new watched media list entry
 *     description: Creates a new entry in the watched media list with the provided details.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieId:
 *                 type: integer
 *               episodeId:
 *                 type: integer
 *               profileId:
 *                 type: integer
 *               subtitleId:
 *                 type: integer
 *               viewCount:
 *                 type: integer
 *               timeLeftAt:
 *                 type: string
 *                 format: duration
 *             required:
 *               - profileId
 *     responses:
 *       201:
 *         description: Watched media list entry created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WatchedMediaList'
 *       400:
 *         description: Missing required fields.
 *       500:
 *         description: Server error.
 */
router.post("/", WatchedMediaListController.createWatchedMediaList);

/**
 * @swagger
 * /watchedMediaList/profile/{id}:
 *   get:
 *     tags:
 *       - Watched Media List
 *       - Profile
 *     summary: Get watched media list by profile
 *     description: Retrieves the watched media list entries associated with a specific profile.
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
 *         description: Watched media list entries for the profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WatchedMediaList'
 *       404:
 *         description: No entries found for this profile.
 *       500:
 *         description: Server error.
 */
router.get('/profile/:id', WatchedMediaListController.getWatchedMediaListByProfile);

module.exports = router;
