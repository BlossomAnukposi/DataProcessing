const express = require("express");
const SubtitleController = require("../controller/subtitleController");

class SubtitleRoute {
    constructor() {
        this.router = express.Router();
        this.subtitleController = SubtitleController;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/", this.subtitleController.getAllEntries.bind(this.subtitleController));
        this.router.get("/:id", this.subtitleController.getEntryById.bind(this.subtitleController));
        this.router.delete("/:id", this.subtitleController.deleteEntryById.bind(this.subtitleController));
        this.router.post("/", this.subtitleController.addSubtitle.bind(this.subtitleController));
        this.router.put("/:id", this.subtitleController.updateSubtitleById.bind(this.subtitleController));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new SubtitleRoute().getRouter();

/**
 * @swagger
 * /subtitle:
 *   get:
 *     tags:
 *       - Subtitle
 *     summary: Get all subtitles
 *     description: Retrieves all subtitles from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all subtitles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subtitle'
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /subtitle/{id}:
 *   get:
 *     tags:
 *       - Subtitle
 *     summary: Get a subtitle by ID
 *     description: Retrieves a specific subtitle based on its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the subtitle.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The subtitle details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subtitle'
 *       404:
 *         description: Subtitle not found.
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /subtitle/{id}:
 *   delete:
 *     tags:
 *       - Subtitle
 *     summary: Delete a subtitle by ID
 *     description: Deletes a specific subtitle based on its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the subtitle to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Subtitle deleted successfully.
 *       404:
 *         description: Subtitle not found.
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /subtitle:
 *   post:
 *     tags:
 *       - Subtitle
 *     summary: Add a new subtitle
 *     description: Adds a new subtitle with the provided details.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               language:
 *                 type: string
 *               content:
 *                 type: string
 *               movieId:
 *                 type: integer
 *               episodeId:
 *                 type: integer
 *             required:
 *               - language
 *               - content
 *               - movieId
 *               - episodeId
 *     responses:
 *       200:
 *         description: Subtitle added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subtitle'
 *       400:
 *         description: Missing required fields.
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /subtitle/{id}:
 *   patch:
 *     tags:
 *       - Subtitle
 *     summary: Update a subtitle by ID
 *     description: Updates an existing subtitle with the provided details.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the subtitle to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               language:
 *                 type: string
 *               content:
 *                 type: string
 *               movieId:
 *                 type: integer
 *               episodeId:
 *                 type: integer
 *             required:
 *               - language
 *               - content
 *     responses:
 *       200:
 *         description: Subtitle updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subtitle'
 *       400:
 *         description: At least one field must be provided to update.
 *       404:
 *         description: Subtitle not found.
 *       500:
 *         description: Server error.
 */
