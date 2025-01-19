const express = require("express");
const router = express.Router();
const SubtitleController = require("../controller/subtitleController");

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
router.get('/', SubtitleController.getAllEntries);

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
router.get('/:id', SubtitleController.getEntryById);

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
router.delete('/:id', SubtitleController.deleteEntryById);

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
router.post('/', SubtitleController.addSubtitle);

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
router.patch('/:id', SubtitleController.updateSubtitleById);

module.exports = router;
