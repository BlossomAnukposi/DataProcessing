const express = require('express');
const router = express.Router(); //subpackage that allows us to handle different routs and endpoints

//get route
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /watchlist'
    });
});

//post route
router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requests to /watchlist'
    });
});

//get for a single watchlist
router.get('/:watchlist_id', (req, res, next) => {
    const id = req.params.watchlist_id;
    if(id == 'special')
    {
        res.status(200).json({
            message: 'You found a special watchlist',
            id: id
        });
    }
    else
    {
        res.status(200).json({
            message: 'You have logged in',
        });
    }
});

//delete a single watchlist
router.delete('/:watchlist_id', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted watchlist!'
    });
});

module.exports = router; //allows other files to use the routes in this file