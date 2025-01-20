const express = require("express");
const SeriesController = require("../controller/seriesController");

class SeriesRoute {
    constructor() {
        this.router = express.Router();
        this.seriesController = SeriesController;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/", this.seriesController.getAllEntries.bind(this.seriesController));
        this.router.get("/:id", this.seriesController.getEntryById.bind(this.seriesController));
        this.router.delete("/:id", this.seriesController.deleteEntryById.bind(this.seriesController));
        this.router.post("/", this.seriesController.createSeries.bind(this.seriesController));
        this.router.put("/:id", this.seriesController.updateSeries.bind(this.seriesController));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new SeriesRoute().getRouter();

//SERIES DOCUMENTATION
/**
 * @swagger
 * /series:
 *   get:
 *     tags:
 *       - Series
 *     summary: Get all series entries
 *     description: Retrieves all series from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all series entries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Series'
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /series/{id}:
 *   get:
 *     tags:
 *       - Series
 *     summary: Get series by ID
 *     description: Retrieves a specific series entry by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the series.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The series details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Series'
 *       404:
 *         description: Series not found.
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /series/{id}:
 *   delete:
 *     tags:
 *       - Series
 *     summary: Delete a series by ID
 *     description: Deletes a specific series entry by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the series to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Series entry deleted successfully.
 *       404:
 *         description: Series not found.
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /series:
 *   post:
 *     tags:
 *       - Series
 *     summary: Create a new series
 *     description: Creates a new series entry in the database.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               age_classification:
 *                 type: integer
 *               genre:
 *                 type: integer
 *               description:
 *                 type: string
 *               quality:
 *                 type: string
 *               series_url:
 *                 type: string
 *               view_count:
 *                 type: integer
 *             required:
 *               - title
 *               - genre
 *               - series_url
 *     responses:
 *       201:
 *         description: Series entry created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Series'
 *       400:
 *         description: Missing required fields.
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /series/{id}:
 *   put:
 *     tags:
 *       - Series
 *     summary: Update series by ID
 *     description: Updates the details of an existing series by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the series to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               age_classification:
 *                 type: integer
 *               genre:
 *                 type: integer
 *               description:
 *                 type: string
 *               quality:
 *                 type: string
 *               series_url:
 *                 type: string
 *               view_count:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Series entry updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Series'
 *       404:
 *         description: Series not found.
 *       500:
 *         description: Server error.
 */
