const express = require('express');
const GenreController = require('../controller/genreController');

class GenreRoute {
    constructor() {
        this.router = express.Router();
        this.genreController = GenreController;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/movie/:id", this.genreController.getMoviesByGenre.bind(this.genreController));
        this.router.get("/series/:id", this.genreController.getSeriesByGenre.bind(this.genreController));
        this.router.get("/", this.genreController.getAllEntries.bind(this.genreController));
        this.router.get("/:id", this.genreController.getEntryById.bind(this.genreController));
        this.router.delete("/:id", this.genreController.deleteEntryById.bind(this.genreController));
        this.router.post("/", this.genreController.createGenre.bind(this.genreController));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new GenreRoute().getRouter();

//GENRE DOCUMENTATION
/**
 * @swagger
 * /genre/movie/{id}:
 *   get:
 *     tags:
 *       - Genre
 *       - Movie
 *     summary: Get movies by genre
 *     description: Fetches movies for a specific genre.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Genre ID
 *     responses:
 *       200:
 *         description: List of movies in the specified genre.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   movie_id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   release_date:
 *                     type: string
 *                     format: date
 *           application/xml:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   movie_id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   release_date:
 *                     type: string
 *                     format: date
 *       404:
 *         description: No movies found in this genre.
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /genre/series/{id}:
 *   get:
 *     tags:
 *       - Genre
 *       - Movie
 *     summary: Get series by genre
 *     description: Fetches series for a specific genre.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Genre ID
 *     responses:
 *       200:
 *         description: List of series in the specified genre.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   series_id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   release_date:
 *                     type: string
 *                     format: date
 *           application/xml:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   series_id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   release_date:
 *                     type: string
 *                     format: date
 *       404:
 *         description: No series found in this genre.
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /genre:
 *   get:
 *     tags:
 *       - Genre
 *     summary: Get all genres
 *     description: Fetches all genres from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of genres.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   genre_id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *           application/xml:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   genre_id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /genre/{id}:
 *   get:
 *     tags:
 *       - Genre
 *     summary: Get genre by ID
 *     description: Fetches a specific genre based on its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Genre ID
 *     responses:
 *       200:
 *         description: The requested genre.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 genre_id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *           application/xml:
 *             schema:
 *               type: object
 *               properties:
 *                 genre_id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *       404:
 *         description: Genre not found.
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /genre/{id}:
 *   delete:
 *     tags:
 *       - Genre
 *     summary: Delete genre by ID
 *     description: Deletes a genre based on its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Genre ID
 *     responses:
 *       200:
 *         description: Successfully deleted genre.
 *       404:
 *         description: Genre not found.
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /genre:
 *   post:
 *     tags:
 *       - Genre
 *     summary: Create a new genre
 *     description: Adds a new genre to the database.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *         application/xml:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully created genre.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 genre_id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *           application/xml:
 *             schema:
 *               type: object
 *               properties:
 *                 genre_id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *       400:
 *         description: Bad request (missing required fields).
 *       500:
 *         description: Server error.
 */
