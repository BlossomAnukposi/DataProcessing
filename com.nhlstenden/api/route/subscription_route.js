const express = require('express');
const router = express.Router();
const pool = require('../../config/database');

// GET all subscriptions
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT * FROM subscription 
            ORDER BY subscription_price ASC
        `;
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching subscriptions',
            error: error.message
        });
    }
});

// GET subscription by ID
router.get('/:subscription_id', async (req, res) => {
    try {
        const subscriptionId = req.params.subscription_id;
        const query = `
            SELECT * FROM subscription 
            WHERE subscription_id = $1
        `;
        const result = await pool.query(query, [subscriptionId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Subscription not found'
            });
        }
        
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching subscription',
            error: error.message
        });
    }
});

// GET subscription by type
router.get('/type/:subscription_type', async (req, res) => {
    try {
        const subscriptionType = req.params.subscription_type;
        const query = `
            SELECT * FROM subscription 
            WHERE subscription_type = $1
        `;
        const result = await pool.query(query, [subscriptionType]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Subscription type not found'
            });
        }
        
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching subscription by type',
            error: error.message
        });
    }
});

// CREATE new subscription
router.post('/', async (req, res) => {
    try {
        const { subscription_type, subscription_price } = req.body;
        
        // Validate input
        if (!subscription_type || !subscription_price) {
            return res.status(400).json({
                message: 'Subscription type and price are required'
            });
        }

        const query = `
            INSERT INTO subscription (subscription_type, subscription_price) 
            VALUES ($1, $2) 
            RETURNING *
        `;
        const result = await pool.query(query, [subscription_type, subscription_price]);
        
        res.status(201).json({
            message: 'Subscription created successfully',
            subscription: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating subscription',
            error: error.message
        });
    }
});

// UPDATE subscription
router.patch('/:subscription_id', async (req, res) => {
    try {
        const subscriptionId = req.params.subscription_id;
        const { subscription_type, subscription_price } = req.body;
        
        const query = `
            UPDATE subscription 
            SET subscription_type = COALESCE($1, subscription_type),
                subscription_price = COALESCE($2, subscription_price),
                updated_at = CURRENT_TIMESTAMP
            WHERE subscription_id = $3 
            RETURNING *
        `;
        
        const result = await pool.query(query, [
            subscription_type, 
            subscription_price, 
            subscriptionId
        ]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Subscription not found'
            });
        }
        
        res.status(200).json({
            message: 'Subscription updated successfully',
            subscription: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating subscription',
            error: error.message
        });
    }
});

// DELETE subscription
router.delete('/:subscription_id', async (req, res) => {
    try {
        const subscriptionId = req.params.subscription_id;
        
        // Check if subscription is being used by any accounts before deleting
        const checkQuery = `
            SELECT COUNT(*) FROM account 
            WHERE subscription_id = $1
        `;
        const checkResult = await pool.query(checkQuery, [subscriptionId]);
        
        if (checkResult.rows[0].count > 0) {
            return res.status(400).json({
                message: 'Cannot delete subscription as it is currently in use by accounts'
            });
        }
        
        const deleteQuery = `
            DELETE FROM subscription 
            WHERE subscription_id = $1 
            RETURNING *
        `;
        const result = await pool.query(deleteQuery, [subscriptionId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Subscription not found'
            });
        }
        
        res.status(200).json({
            message: 'Subscription deleted successfully',
            deleted_subscription: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting subscription',
            error: error.message
        });
    }
});

module.exports = router;