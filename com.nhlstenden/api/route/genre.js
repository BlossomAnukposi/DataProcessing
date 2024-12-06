const express = require('express');
const router = express.Router(); //subpackage that allows us to handle different routs and endpoints

//get route
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /genre'
    });
});

//post route
router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requests to /genre'
    });
});

//get for a single genre
router.get('/:genre_id', (req, res, next) => {
    const id = req.params.genre_id;
    if(id == 'special')
    {
        res.status(200).json({
            message: 'You found a special genre',
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

//delete a single genre
router.delete('/:genre_id', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted genre!'
    });
});

module.exports = router; //allows other files to use the routes in this file