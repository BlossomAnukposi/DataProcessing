const express = require('express');
const router = express.Router(); //subpackage that allows us to handle different routs and endpoints

//get route
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /movie'
    });
});

//post route
router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requests to /movie'
    });
});

//get for a single movie
router.get('/:movie_id', (req, res, next) => {
    const id = req.params.movie_id;
    if(id == 'special')
    {
        res.status(200).json({
            message: 'You found a special movie',
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

//delete a single movie
router.delete('/:movie_id', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted movie!'
    });
});

module.exports = router; //allows other files to use the routes in this file