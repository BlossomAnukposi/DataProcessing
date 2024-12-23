const express = require('express');
const router = express.Router();
const pool = require('../../config/database');

// GET all movies
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT m.*, g.name as genre_name
            FROM movie m
            LEFT JOIN genre g ON m.genre = g.genre_id
            ORDER BY m.title ASC
        `;
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching movies',
            error: error.message
        });
    }
});

// GET movie by ID
router.get('/:movie_id', async (req, res) => {
    try {
        const movieId = req.params.movie_id;
        const query = `
            SELECT m.*, g.name as genre_name
            FROM movie m
            LEFT JOIN genre g ON m.genre = g.genre_id
            WHERE m.movie_id = $1
        `;
        const result = await pool.query(query, [movieId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Movie not found'
            });
        }
        
        // Increment view count
        await pool.query(`
            UPDATE movie 
            SET view_count = view_count + 1 
            WHERE movie_id = $1
        `, [movieId]);
        
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching movie',
            error: error.message
        });
    }
});

// GET movies by genre
router.get('/genre/:genre_id', async (req, res) => {
    try {
        const genreId = req.params.genre_id;
        const query = `
            SELECT m.*, g.name as genre_name
            FROM movie m
            LEFT JOIN genre g ON m.genre = g.genre_id
            WHERE m.genre = $1
            ORDER BY m.title ASC
        `;
        const result = await pool.query(query, [genreId]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching movies by genre',
            error: error.message
        });
    }
});

// CREATE new movie
router.post('/', async (req, res) => {
    try {
        const {
            title,
            description,
            duration,
            age_classification,
            genre,
            quality_type
        } = req.body;
        
        // Validate required fields
        if (!title || !description || !duration || !age_classification || !genre || !quality_type) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        const query = `
            INSERT INTO movie (
                title, 
                description, 
                duration, 
                age_classification, 
                genre, 
                quality_type,
                view_count
            ) 
            VALUES ($1, $2, $3, $4, $5, $6, 0) 
            RETURNING *
        `;
        
        const result = await pool.query(query, [
            title,
            description,
            duration,
            age_classification,
            genre,
            quality_type
        ]);
        
        res.status(201).json({
            message: 'Movie created successfully',
            movie: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating movie',
            error: error.message
        });
    }
});

// UPDATE movie
router.patch('/:movie_id', async (req, res) => {
    try {
        const movieId = req.params.movie_id;
        const {
            title,
            description,
            duration,
            age_classification,
            genre,
            quality_type
        } = req.body;
        
        const query = `
            UPDATE movie 
            SET title = COALESCE($1, title),
                description = COALESCE($2, description),
                duration = COALESCE($3, duration),
                age_classification = COALESCE($4, age_classification),
                genre = COALESCE($5, genre),
                quality_type = COALESCE($6, quality_type),
                updated_at = CURRENT_TIMESTAMP
            WHERE movie_id = $7 
            RETURNING *
        `;
        
        const result = await pool.query(query, [
            title,
            description,
            duration,
            age_classification,
            genre,
            quality_type,
            movieId
        ]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Movie not found'
            });
        }
        
        res.status(200).json({
            message: 'Movie updated successfully',
            movie: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating movie',
            error: error.message
        });
    }
});

// DELETE movie
router.delete('/:movie_id', async (req, res) => {
    try {
        const movieId = req.params.movie_id;
        
        // Check if movie is in any watchlists
        const checkQuery = `
            SELECT COUNT(*) FROM watchlist 
            WHERE movie_id = $1
        `;
        const checkResult = await pool.query(checkQuery, [movieId]);
        
        if (checkResult.rows[0].count > 0) {
            return res.status(400).json({
                message: 'Cannot delete movie as it exists in user watchlists'
            });
        }
        
        const deleteQuery = `
            DELETE FROM movie 
            WHERE movie_id = $1 
            RETURNING *
        `;
        const result = await pool.query(deleteQuery, [movieId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Movie not found'
            });
        }
        
        res.status(200).json({
            message: 'Movie deleted successfully',
            deleted_movie: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting movie',
            error: error.message
        });
    }
});

// GET most viewed movies
router.get('/stats/most-viewed', async (req, res) => {
    try {
        const query = `
            SELECT m.*, g.name as genre_name
            FROM movie m
            LEFT JOIN genre g ON m.genre = g.genre_id
            ORDER BY m.view_count DESC
            LIMIT 10
        `;
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching most viewed movies',
            error: error.message
        });
    }
});

module.exports = router;