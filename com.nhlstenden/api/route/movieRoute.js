const express = require('express');
const MovieController = require('../controller/movieController');

class MovieRoute {
    constructor() {
        this.router = express.Router();
        this.movieController = MovieController;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/", this.movieController.getAllEntries.bind(this.movieController));
        this.router.get("/:id", this.movieController.getEntryById.bind(this.movieController));
        this.router.delete("/:id", this.movieController.deleteEntryById.bind(this.movieController));
        this.router.post("/", this.movieController.createMovie.bind(this.movieController));
        this.router.put("/:id", this.movieController.updateMovie.bind(this.movieController));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new MovieRoute().getRouter();

// MOVIE DOCUMENTATION
/**
 * @swagger
 * /movie/media:
 *   get:
 *     tags:
 *       - Movie
 *       - Series
 *     summary: Get all media
 *     description: Fetches all media entries (both movies and series) from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all media.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   media_id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *           application/xml:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   media_id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *       404:
 *         description: No media found.
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /movie:
 *   get:
 *     tags:
 *       - Movie
 *     summary: Get all movies
 *     description: Fetches all movies from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of movies.
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
 *                   genre:
 *                     type: integer
 *                   duration:
 *                     type: string
 *                     format: time
 *                   quality_type:
 *                     type: string
 *                   age_classification:
 *                     type: integer
 *                   view_count:
 *                     type: integer
 *                   movie_link:
 *                     type: string
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
 *                   genre:
 *                     type: integer
 *                   duration:
 *                     type: string
 *                     format: time
 *                   quality_type:
 *                     type: string
 *                   age_classification:
 *                     type: integer
 *                   view_count:
 *                     type: integer
 *                   movie_link:
 *                     type: string
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /movie/{id}:
 *   get:
 *     tags:
 *       - Movie
 *     summary: Get movie by ID
 *     description: Fetches a specific movie by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: The requested movie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 movie_id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 genre:
 *                   type: integer
 *                 duration:
 *                   type: string
 *                   format: time
 *                 quality_type:
 *                   type: string
 *                 age_classification:
 *                   type: integer
 *                 view_count:
 *                   type: integer
 *                 movie_link:
 *                   type: string
 *           application/xml:
 *             schema:
 *               type: object
 *               properties:
 *                 movie_id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 genre:
 *                   type: integer
 *                 duration:
 *                   type: string
 *                   format: time
 *                 quality_type:
 *                   type: string
 *                 age_classification:
 *                   type: integer
 *                 view_count:
 *                   type: integer
 *                 movie_link:
 *                   type: string
 *       404:
 *         description: Movie not found.
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /movie/{id}:
 *   delete:
 *     tags:
 *       - Movie
 *     summary: Delete a movie
 *     description: Deletes a movie by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Movie deleted successfully.
 *       404:
 *         description: Movie not found.
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /movie:
 *   post:
 *     tags:
 *       - Movie
 *     summary: Create a new movie
 *     description: Adds a new movie to the database.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               age_classification:
 *                 type: integer
 *               genre:
 *                 type: integer
 *               quality_type:
 *                 type: string
 *                 enum: [HD, UHD, SD]
 *               title:
 *                 type: string
 *               duration:
 *                 type: string
 *                 format: time
 *               description:
 *                 type: string
 *               view_count:
 *                 type: integer
 *               movie_link:
 *                 type: string
 *         application/xml:
 *           schema:
 *             type: object
 *             properties:
 *               age_classification:
 *                 type: integer
 *               genre:
 *                 type: integer
 *               quality_type:
 *                 type: string
 *                 enum: [HD, UHD, SD]
 *               title:
 *                 type: string
 *               duration:
 *                 type: string
 *                 format: time
 *               description:
 *                 type: string
 *               view_count:
 *                 type: integer
 *               movie_link:
 *                 type: string
 *     responses:
 *       201:
 *         description: Movie created successfully.
 *       400:
 *         description: Invalid request (e.g., invalid quality type).
 *       500:
 *         description: Server error.
 */
/**
 * @swagger
 * /movie/{id}:
 *   put:
 *     tags:
 *       - Movie
 *     summary: Update a movie
 *     description: Updates the details of an existing movie.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Movie ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               age_classification:
 *                 type: integer
 *               genre:
 *                 type: integer
 *               quality_type:
 *                 type: string
 *                 enum: [HD, UHD, SD]
 *               title:
 *                 type: string
 *               duration:
 *                 type: string
 *                 format: time
 *               description:
 *                 type: string
 *               view_count:
 *                 type: integer
 *               movie_link:
 *                 type: string
 *     responses:
 *       201:
 *         description: Movie updated successfully.
 *       400:
 *         description: Invalid request (e.g., invalid quality type).
 *       404:
 *         description: Movie not found.
 *       500:
 *         description: Server error.
 */
