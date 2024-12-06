const express = require('express');
const router = express.Router(); //subpackage that allows us to handle different routs and endpoints

//get route
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /season'
    });
});

//post route
router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requests to /season'
    });
});

//get for a single season
router.get('/:season_id', (req, res, next) => {
    const id = req.params.season_id;
    if(id == 'special')
    {
        res.status(200).json({
            message: 'You found a special season',
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

//update a single season
router.patch('/:season_id', (req, res, next) => {
    res.status(200).json({
        message: 'Updated season!'
    });
});

//delete a single season
router.delete('/:season_id', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted season!'
    });
});

module.exports = router; //allows other files to use the routes in this file