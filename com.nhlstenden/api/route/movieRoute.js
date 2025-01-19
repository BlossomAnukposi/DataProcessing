const express = require('express');
const router = express.Router();
const MovieController = require('../controller/movieController');

/**
 * @swagger
 * /movies/media:
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
router.get('/media/', MovieController.getAllMedia);

/**
 * @swagger
 * /movies:
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
router.get('/', MovieController.getAllEntries);

/**
 * @swagger
 * /movies/{id}:
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
router.get('/:id', MovieController.getEntryById);

/**
 * @swagger
 * /movies/{id}:
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
router.delete('/:id', MovieController.deleteEntryById);

/**
 * @swagger
 * /movies:
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
router.post('/', MovieController.createMovie);

/**
 * @swagger
 * /movies/{id}:
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
router.put('/:id', MovieController.updateMovie);

module.exports = router;