const express = require('express');
const router = express.Router();
const pool = require('../../config/database');

// GET all subtitles
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT s.*, 
                   e.title as episode_title, 
                   m.title as movie_title 
            FROM subtitle s
            LEFT JOIN episode e ON s.episode_id = e.episode_id
            LEFT JOIN movie m ON s.movie_id = m.movie_id
        `;
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching subtitles',
            error: error.message
        });
    }
});

// GET subtitles for a specific movie
router.get('/movie/:movie_id', async (req, res) => {
    try {
        const movieId = req.params.movie_id;
        const query = `
            SELECT * FROM subtitle 
            WHERE movie_id = $1
        `;
        const result = await pool.query(query, [movieId]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching movie subtitles',
            error: error.message
        });
    }
});

// GET subtitles for a specific episode
router.get('/episode/:episode_id', async (req, res) => {
    try {
        const episodeId = req.params.episode_id;
        const query = `
            SELECT * FROM subtitle 
            WHERE episode_id = $1
        `;
        const result = await pool.query(query, [episodeId]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching episode subtitles',
            error: error.message
        });
    }
});

// GET subtitle by ID
router.get('/:subtitle_id', async (req, res) => {
    try {
        const subtitleId = req.params.subtitle_id;
        const query = `
            SELECT s.*, 
                   e.title as episode_title, 
                   m.title as movie_title 
            FROM subtitle s
            LEFT JOIN episode e ON s.episode_id = e.episode_id
            LEFT JOIN movie m ON s.movie_id = m.movie_id
            WHERE s.subtitle_id = $1
        `;
        const result = await pool.query(query, [subtitleId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Subtitle not found'
            });
        }
        
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching subtitle',
            error: error.message
        });
    }
});

// ADD subtitle for movie
router.post('/movie', async (req, res) => {
    try {
        const { movie_id, language, content } = req.body;
        const query = `
            INSERT INTO subtitle (movie_id, language, content) 
            VALUES ($1, $2, $3) 
            RETURNING *
        `;
        const result = await pool.query(query, [movie_id, language, content]);
        res.status(201).json({
            message: 'Subtitle added successfully',
            subtitle: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error adding subtitle',
            error: error.message
        });
    }
});

// ADD subtitle for episode
router.post('/episode', async (req, res) => {
    try {
        const { episode_id, language, content } = req.body;
        const query = `
            INSERT INTO subtitle (episode_id, language, content) 
            VALUES ($1, $2, $3) 
            RETURNING *
        `;
        const result = await pool.query(query, [episode_id, language, content]);
        res.status(201).json({
            message: 'Subtitle added successfully',
            subtitle: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error adding subtitle',
            error: error.message
        });
    }
});

// UPDATE subtitle
router.patch('/:subtitle_id', async (req, res) => {
    try {
        const subtitleId = req.params.subtitle_id;
        const { language, content } = req.body;
        
        const query = `
            UPDATE subtitle 
            SET language = COALESCE($1, language),
                content = COALESCE($2, content),
                updated_at = CURRENT_TIMESTAMP
            WHERE subtitle_id = $3 
            RETURNING *
        `;
        
        const result = await pool.query(query, [language, content, subtitleId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Subtitle not found'
            });
        }
        
        res.status(200).json({
            message: 'Subtitle updated successfully',
            subtitle: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating subtitle',
            error: error.message
        });
    }
});

// DELETE subtitle
router.delete('/:subtitle_id', async (req, res) => {
    try {
        const subtitleId = req.params.subtitle_id;
        const query = `
            DELETE FROM subtitle 
            WHERE subtitle_id = $1 
            RETURNING *
        `;
        const result = await pool.query(query, [subtitleId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Subtitle not found'
            });
        }
        
        res.status(200).json({
            message: 'Subtitle deleted successfully',
            deleted_subtitle: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting subtitle',
            error: error.message
        });
    }
});

module.exports = router;