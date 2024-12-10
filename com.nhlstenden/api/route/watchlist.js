const express = require('express');
const router = express.Router();
const pool = require('../../config/database');

// GET all watchlist items for a profile
router.get('/:profile_id', async (req, res) => {
    try {
        const profileId = req.params.profile_id;
        const query = `
            SELECT w.*, s.title as series_title, m.title as movie_title 
            FROM watchlist w 
            LEFT JOIN series s ON w.series_id = s.series_id 
            LEFT JOIN movie m ON w.movie_id = m.movie_id 
            WHERE w.profile_id = $1
        `;
        const result = await pool.query(query, [profileId]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching watchlist',
            error: error.message
        });
    }
});

// ADD movie to watchlist
router.post('/movie', async (req, res) => {
    try {
        const { profile_id, movie_id } = req.body;
        const query = `
            INSERT INTO watchlist (profile_id, movie_id) 
            VALUES ($1, $2) 
            RETURNING *
        `;
        const result = await pool.query(query, [profile_id, movie_id]);
        res.status(201).json({
            message: 'Movie added to watchlist',
            watchlist: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error adding movie to watchlist',
            error: error.message
        });
    }
});

// ADD series to watchlist
router.post('/series', async (req, res) => {
    try {
        const { profile_id, series_id } = req.body;
        const query = `
            INSERT INTO watchlist (profile_id, series_id) 
            VALUES ($1, $2) 
            RETURNING *
        `;
        const result = await pool.query(query, [profile_id, series_id]);
        res.status(201).json({
            message: 'Series added to watchlist',
            watchlist: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error adding series to watchlist',
            error: error.message
        });
    }
});

// DELETE movie/series from watchlist
router.delete('/:profile_id/:type/:content_id', async (req, res) => {
    try {
        const { profile_id, type, content_id } = req.params;
        let query;
        
        if (type === 'movie') {
            query = `
                DELETE FROM watchlist 
                WHERE profile_id = $1 AND movie_id = $2 
                RETURNING *
            `;
        } else if (type === 'series') {
            query = `
                DELETE FROM watchlist 
                WHERE profile_id = $1 AND series_id = $2 
                RETURNING *
            `;
        } else {
            return res.status(400).json({
                message: 'Invalid type specified. Use "movie" or "series"'
            });
        }

        const result = await pool.query(query, [profile_id, content_id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Item not found in watchlist'
            });
        }

        res.status(200).json({
            message: `${type} removed from watchlist`,
            removed_item: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error removing item from watchlist',
            error: error.message
        });
    }
});

// Check if movie/series is in watchlist
router.get('/check/:profile_id/:type/:content_id', async (req, res) => {
    try {
        const { profile_id, type, content_id } = req.params;
        let query;
        
        if (type === 'movie') {
            query = `
                SELECT * FROM watchlist 
                WHERE profile_id = $1 AND movie_id = $2
            `;
        } else if (type === 'series') {
            query = `
                SELECT * FROM watchlist 
                WHERE profile_id = $1 AND series_id = $2
            `;
        } else {
            return res.status(400).json({
                message: 'Invalid type specified. Use "movie" or "series"'
            });
        }

        const result = await pool.query(query, [profile_id, content_id]);
        
        res.status(200).json({
            exists: result.rows.length > 0,
            item: result.rows[0] || null
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error checking watchlist',
            error: error.message
        });
    }
});

module.exports = router;